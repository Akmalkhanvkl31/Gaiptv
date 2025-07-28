// AuthContext.js - React Context for Authentication State
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authHelpers, dbHelpers, subscriptions } from './Supabase'; 

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { user: currentUser } = await authHelpers.getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
          
          // Get user profile
          const { data: userProfile } = await dbHelpers.getUserProfile(currentUser.id);
          if (userProfile) {
            setProfile(userProfile);
          } else {
            // Create profile if it doesn't exist
            await dbHelpers.createUserProfile(currentUser);
            const { data: newProfile } = await dbHelpers.getUserProfile(currentUser.id);
            setProfile(newProfile);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = subscriptions.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setLoading(true);

        if (event === 'SIGNED_IN' && session?.user) {
          const currentUser = session.user;
          setUser(currentUser);
          setIsAuthenticated(true);

          // Check for admin profile first
          const { data: adminProfile, error: adminError } = await dbHelpers.getAdminProfile(currentUser.id);

          if (adminProfile) {
            setProfile(adminProfile);
            if (adminProfile.role === 'admin') {
              navigate('/admin');
            } else {
              // Has an admin table entry but not admin role, sign out for security.
              await authHelpers.signOut();
            }
          } else if (adminError) {
            // An actual error occurred fetching admin profile
            console.error("Error fetching admin profile:", adminError);
            await authHelpers.signOut();
          }
          else {
            // Not an admin, proceed with normal user profile
            const { data: userProfile } = await dbHelpers.getUserProfile(currentUser.id);
            if (userProfile) {
              setProfile(userProfile);
            } else {
              // Create profile if it doesn't exist
              await dbHelpers.createUserProfile(currentUser);
              const { data: newProfile } = await dbHelpers.getUserProfile(currentUser.id);
              setProfile(newProfile);
            }
            // For regular users, you might navigate them to a dashboard
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setIsAuthenticated(false);
          // Optionally navigate to login on sign out
          // navigate('/login');
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Auth methods
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await authHelpers.signIn(email, password);
      if (error) {
        // The listener won't fire on error, so we can return failure here.
        return { success: false, error: error.message };
      }
      // On success, the onAuthStateChange listener will handle profile fetching and navigation.
      // We return a pending success state to the UI.
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData) => {
    setLoading(true);
    try {
      const { data, error } = await authHelpers.signUp(email, password, userData);
      if (error) throw new Error(error.message);
      if (data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
        // The profile is created via a trigger in Supabase,
        // but we can fetch it here to be sure.
        const { data: userProfile } = await dbHelpers.getUserProfile(
          data.user.id
        );
        setProfile(userProfile);
        return { success: true, user: data.user, role: userProfile?.role };
      }
      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signInWithMagicLink = async (email) => {
    setLoading(true);
    try {
      const { data, error } = await authHelpers.signInWithMagicLink(email);
      if (error) throw new Error(error);
      
      return { success: true, message: 'Magic link sent to your email!' };
    } catch (error) {
      console.error('Magic link error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signInWithOAuth = async (provider) => {
    setLoading(true);
    try {
      const { data, error } = await authHelpers.signInWithOAuth(provider);
      if (error) throw new Error(error);
      
      return { success: true, data };
    } catch (error) {
      console.error('OAuth error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await authHelpers.signOut();
      if (error) throw new Error(error);
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await authHelpers.updateUser(updates);
      if (error) throw new Error(error);
      
      // Update local profile state
      setProfile(prev => ({ ...prev, ...updates }));
      
      return { success: true, data };
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      const { data, error } = await authHelpers.resetPassword(email);
      if (error) throw new Error(error);
      
      return { success: true, message: 'Password reset email sent!' };
    } catch (error) {
      console.error('Reset password error:', error);
      return { success: false, error: error.message };
    }
  };

  // User data methods
  const saveVideo = async (videoId) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const { data, error } = await dbHelpers.saveVideo(user.id, videoId);
      if (error) throw new Error(error);
      
      return { success: true, data };
    } catch (error) {
      console.error('Save video error:', error);
      return { success: false, error: error.message };
    }
  };

  const getSavedVideos = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const { data, error } = await dbHelpers.getSavedVideos(user.id);
      if (error) throw new Error(error);
      
      return { success: true, data };
    } catch (error) {
      console.error('Get saved videos error:', error);
      return { success: false, error: error.message };
    }
  };

  const updateWatchProgress = async (videoId, progress, duration) => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const { data, error } = await dbHelpers.updateWatchProgress(
        user.id, 
        videoId, 
        progress, 
        duration
      );
      if (error) throw new Error(error);
      
      return { success: true, data };
    } catch (error) {
      console.error('Update progress error:', error);
      return { success: false, error: error.message };
    }
  };


  const getUserAnalytics = async () => {
    if (!user) return { success: false, error: 'User not authenticated' };
    
    try {
      const { data, error } = await dbHelpers.getUserAnalytics(user.id);
      if (error) throw new Error(error);
      
      return { success: true, data };
    } catch (error) {
      console.error('Get analytics error:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    // State
    user,
    profile,
    loading,
    isAuthenticated,
    
    // Auth methods
    signIn,
    signUp,
    signInWithMagicLink,
    signInWithOAuth,
    signOut,
    updateProfile,
    resetPassword,
    
    // User data methods
    saveVideo,
    getSavedVideos,
    updateWatchProgress,
    getUserAnalytics
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
