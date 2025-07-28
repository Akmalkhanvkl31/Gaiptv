// supabase.js - Fixed Configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Log the environment variables to ensure they are loaded correctly
if (process.env.NODE_ENV === 'development') {
  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Anon Key Loaded:', !!supabaseAnonKey);
}

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anonymous Key is missing. Check your .env.local file.');
}

// Create Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test connection function
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error: error.message };
    }
    console.log('Supabase connection successful');
    return { success: true, data };
  } catch (error) {
    console.error('Supabase connection test error:', error);
    return { success: false, error: error.message };
  }
};

// Auth helper functions with better error handling
export const authHelpers = {
  // Sign up with email and password
  signUp: async (email, password, userData = {}) => {
    try {
      console.log('Attempting sign up for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name || '',
            role: userData.role || 'Insurance Professional',
            company: userData.company || '',
            avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || email)}&background=8b5cf6&color=fff`
          }
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      
      console.log('Sign up successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error.message || 'Sign up failed' };
    }
  },

  // Sign in with email and password
  signIn: async (email, password) => {
    try {
      console.log('Attempting sign in for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      
      console.log('Sign in successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Provide more specific error messages
      let userFriendlyMessage = 'Sign in failed';
      if (error.message?.includes('Invalid API key')) {
        userFriendlyMessage = 'Configuration error. Please contact support.';
      } else if (error.message?.includes('Invalid login credentials')) {
        userFriendlyMessage = 'Invalid email or password';
      } else if (error.message?.includes('Email not confirmed')) {
        userFriendlyMessage = 'Please check your email and confirm your account';
      } else if (error.message?.includes('Too many requests')) {
        userFriendlyMessage = 'Too many attempts. Please try again later';
      }
      
      return { data: null, error: userFriendlyMessage };
    }
  },

  // Sign in with Magic Link
  signInWithMagicLink: async (email) => {
    try {
      console.log('Sending magic link to:', email);
      
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('Magic link error:', error);
        throw error;
      }
      
      console.log('Magic link sent successfully');
      return { data, error: null };
    } catch (error) {
      console.error('Magic link error:', error);
      return { data: null, error: error.message || 'Failed to send magic link' };
    }
  },

  // Sign in with OAuth (Google, GitHub, etc.)
  signInWithOAuth: async (provider) => {
    try {
      console.log('Attempting OAuth sign in with:', provider);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) {
        console.error('OAuth error:', error);
        throw error;
      }
      
      console.log('OAuth redirect initiated');
      return { data, error: null };
    } catch (error) {
      console.error('OAuth error:', error);
      return { data: null, error: error.message || `Failed to sign in with ${provider}` };
    }
  },

  // Sign out
  signOut: async () => {
    try {
      console.log('Signing out user');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      console.log('Sign out successful');
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.message || 'Sign out failed' };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        // Don't throw for missing session - this is expected for new users
        if (error.message.includes('Auth session missing')) {
          console.log('No active session found - user not logged in');
          return { user: null, error: null };
        }
        console.error('Get user error:', error);
        throw error;
      }
      
      console.log('Current user:', user ? user.email : 'None');
      return { user, error: null };
    } catch (error) {
      console.error('Get user error:', error);
      return { user: null, error: error.message };
    }
  },

  // Update user profile
  updateUser: async (updates) => {
    try {
      console.log('Updating user profile:', updates);
      
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });
      
      if (error) {
        console.error('Update user error:', error);
        throw error;
      }
      
      console.log('User profile updated successfully');
      return { data, error: null };
    } catch (error) {
      console.error('Update user error:', error);
      return { data: null, error: error.message || 'Failed to update profile' };
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      console.log('Sending password reset to:', email);
      
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) {
        console.error('Reset password error:', error);
        throw error;
      }
      
      console.log('Password reset email sent');
      return { data, error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { data: null, error: error.message || 'Failed to send reset email' };
    }
  }
};

// Database helper functions (only work with valid auth)
export const dbHelpers = {
  // Create user profile
  createUserProfile: async (user) => {
    try {
      console.log('Creating user profile for:', user.email);
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || '',
          role: user.user_metadata?.role || 'Insurance Professional',
          company: user.user_metadata?.company || '',
          avatar_url: user.user_metadata?.avatar_url || '',
          subscription_plan: 'Free',
          subscription_status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Create profile error:', error);
        throw error;
      }
      
      console.log('User profile created successfully');
      return { data, error: null };
    } catch (error) {
      console.error('Create profile error:', error);
      return { data: null, error: error.message };
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .limit(1)
      .maybeSingle();;
      
      if (error) {
        // Don't log error if profile doesn't exist yet
        if (!error.message.includes('No rows')) {
          console.error('Get profile error:', error);
        }
        return { data: null, error: error.message };
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: error.message };
    }
  },

  // Save video to user's saved list
  saveVideo: async (userId, videoId) => {
    try {
      const { data, error } = await supabase
        .from('saved_videos')
        .upsert({
          user_id: userId,
          video_id: videoId,
          saved_at: new Date().toISOString()
        });
      
      if (error) {
        console.error('Save video error:', error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Save video error:', error);
      return { data: null, error: error.message };
    }
  },

  // Get user's saved videos
  getSavedVideos: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_videos')
        .select('video_id, saved_at')
        .eq('user_id', userId);
      
      if (error) {
        console.error('Get saved videos error:', error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Get saved videos error:', error);
      return { data: null, error: error.message };
    }
  },

  // Track video watch progress
  updateWatchProgress: async (userId, videoId, progress, duration) => {
    try {
      const { data, error } = await supabase
        .from('watch_progress')
        .upsert({
          user_id: userId,
          video_id: videoId,
          progress_percentage: progress,
          watch_duration: duration,
          last_watched: new Date().toISOString()
        });
      
      if (error) {
        console.error('Update progress error:', error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Update progress error:', error);
      return { data: null, error: error.message };
    }
  },

  // Get user analytics
  getUserAnalytics: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('watch_progress')
        .select('video_id, progress_percentage, watch_duration, last_watched')
        .eq('user_id', userId);
      
      if (error) {
        console.error('Get analytics error:', error);
        throw error;
      }
      
      return { data, error: null };
    } catch (error) {
      console.error('Get analytics error:', error);
      return { data: null, error: error.message };
    }
  }
};

// Admin helper functions
export const adminHelpers = {
  // Get platform analytics
  getPlatformAnalytics: async (dateRange = '7d') => {
    try {
      // This would typically call your analytics API
      // For now, returning mock data
      return {
        success: true,
        data: {
          totalUsers: 15847,
          activeUsers: 8542,
          totalVideos: 127,
          liveViewers: 12847,
          totalViews: 125690,
          revenue: 45720,
          newUsersToday: 342,
          avgWatchTime: 28.5
        }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Log admin activity
  logAdminActivity: async (activityType, description, metadata = {}) => {
    try {
      const { data, error } = await supabase
        .from('admin_activities')
        .insert({
          admin_user_id: (await supabase.auth.getUser()).data.user?.id,
          activity_type: activityType,
          description,
          metadata
        });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get all users with pagination
  getAllUsers: async (page = 1, limit = 50) => {
    try {
      const offset = (page - 1) * limit;
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data, totalCount: count };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update user role/status
  updateUserStatus: async (userId, updates) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;
      
      // Log the admin activity
      await adminHelpers.logAdminActivity(
        'user_update',
        `Updated user ${userId}`,
        { userId, updates }
      );

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Create scheduled event
  createScheduledEvent: async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('scheduled_events')
        .insert({
          ...eventData,
          created_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;
      
      await adminHelpers.logAdminActivity(
        'event_created',
        `Created event: ${eventData.title}`,
        { eventData }
      );

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Get platform settings
  getPlatformSettings: async () => {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .select('*');

      if (error) throw error;
      
      // Convert to key-value object
      const settings = {};
      data.forEach(setting => {
        settings[setting.setting_key] = setting.setting_value;
      });

      return { success: true, data: settings };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Update platform setting
  updatePlatformSetting: async (key, value) => {
    try {
      const { data, error } = await supabase
        .from('platform_settings')
        .upsert({
          setting_key: key,
          setting_value: value,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;
      
      await adminHelpers.logAdminActivity(
        'setting_updated',
        `Updated setting: ${key}`,
        { key, value }
      );

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Send notification to users
  sendNotificationToUsers: async (userIds, notification) => {
    try {
      const notifications = userIds.map(userId => ({
        user_id: userId,
        ...notification
      }));

      const { data, error } = await supabase
        .from('notifications')
        .insert(notifications);

      if (error) throw error;
      
      await adminHelpers.logAdminActivity(
        'notification_sent',
        `Sent notification to ${userIds.length} users`,
        { userIds, notification }
      );

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to auth state changes
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email || 'No user');
      callback(event, session);
    });
  },

  // Subscribe to user profile changes
  subscribeToProfile: (userId, callback) => {
    return supabase
      .channel('profile-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${userId}`
      }, callback)
      .subscribe();
  }
};

// Initialize connection test
if (process.env.NODE_ENV === 'development') {
  testSupabaseConnection();
}

export default supabase;
