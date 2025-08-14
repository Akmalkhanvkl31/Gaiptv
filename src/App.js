import React from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './Components/AuthContext';
import GuestLanding from './Components/GuestLanding';
import mockData from './Components/mockData';
import AuthScreen from './Components/AuthScreen';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import AdminRoute from './Components/AdminRoute';
import About from './Components/About/About';
import LivePlayer from './Components/LivePlayer';

// Import MainApplication component
import MainApplication from './MainApplication';

const App = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Show loading screen while auth state is being determined
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      }}>
        {/* Loading Logo */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)'
        }} className="loading-logo">
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center'
          }}>
            GAIPTV
          </div>
        </div>

        {/* Loading Spinner */}
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(139, 92, 246, 0.3)',
          borderTop: '3px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }}></div>

        {/* Loading Text */}
        <div style={{
          fontSize: '16px',
          fontWeight: '500',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center'
        }} className="loading-title">
          Loading GAIPTV...
        </div>

        <div style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          marginTop: '8px'
        }} className="loading-subtitle">
          Professional Insurance Broadcasting
        </div>

        {/* Loading Progress Bar */}
        <div style={{
          width: '200px',
          height: '3px',
          background: 'rgba(139, 92, 246, 0.2)',
          borderRadius: '2px',
          marginTop: '24px',
          overflow: 'hidden'
        }} className="loading-bar">
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
            borderRadius: '2px',
            animation: 'loadingProgress 2s ease-in-out infinite'
          }}></div>
        </div>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes loadingProgress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          .loading-logo {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <Routes>
      {/* 🔐 Auth page - handles both signin and signup */}
      <Route 
        path="/auth" 
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <AuthScreen />
          )
        } 
      />

      {/* 📄 About Page - accessible to everyone */}
      <Route 
        path="/about" 
        element={
          <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <About 
              user={user} 
              onClose={() => navigate(user ? '/home' : '/')} 
            />
          </div>
        } 
      />

      {/* 👤 Admin Access */}
      <Route 
        path="/admin/login" 
        element={
          user ? (
            <Navigate to="/admin" replace />
          ) : (
            <AdminLogin />
          )
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <div style={{
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AdminDashboard onClose={() => navigate('/home')} />
            </div>
          </AdminRoute>
        } 
      />

      {/* 👥 Guest Landing Page - for non-authenticated users */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to="/home" replace />
          ) : (
            <GuestLanding 
              liveStreams={mockData.liveStreams} 
              featuredVideos={mockData.featuredVideos}
              news={mockData.news}
              onSignIn={() => navigate('/auth?form=signin')}
              onSignUp={() => navigate('/auth?form=signup')}
            />
          )
        } 
      />

      {/* 🏠 Home/Main Application - for authenticated users */}
      <Route 
        path="/home" 
        element={
          user ? (
            <MainApplication />
          ) : (
            <Navigate to="/auth?form=signin" replace />
          )
        } 
      />

      {/* 📺 Public video viewing - allows guests to view specific content */}
      <Route 
        path="/watch/:videoId" 
        element={<PublicVideoViewer />} 
      />

      {/* 🔄 Redirect handling for common paths */}
      <Route 
        path="/login" 
        element={<Navigate to="/auth?form=signin" replace />} 
      />
      
      <Route 
        path="/signup" 
        element={<Navigate to="/auth?form=signup" replace />} 
      />
      
      <Route 
        path="/register" 
        element={<Navigate to="/auth?form=signup" replace />} 
      />

      {/* 🚫 404 Not Found */}
      <Route 
        path="*" 
        element={<NotFoundPage />} 
      />
    </Routes>
  );
};

// Public Video Viewer Component
const PublicVideoViewer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const videoId = location.pathname.split('/').pop();
  
  // Find the video by ID
  const allVideos = [...mockData.liveStreams, ...mockData.featuredVideos];
  const video = allVideos.find(v => v.id === videoId);
  
  if (!video) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header with limited functionality for guests */}
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
        background: 'rgba(15, 15, 35, 0.9)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div 
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              padding: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              📺
            </div>
            <div>
              <h1 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                margin: 0,
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                GAIPTV
              </h1>
              <p style={{ 
                fontSize: '12px', 
                color: 'rgba(255, 255, 255, 0.6)', 
                margin: 0 
              }}>
                Professional Broadcasting
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {!user && (
              <>
                <button
                  onClick={() => navigate('/auth?form=signin')}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/auth?form=signup')}
                  style={{
                    padding: '8px 16px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Video Content */}
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'rgba(15, 15, 35, 0.8)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            marginBottom: '16px',
            color: 'white'
          }}>
            {video.title}
          </h2>
          
          <div style={{
            marginBottom: '24px',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#000'
          }}>
            <LivePlayer 
              video={video}
              autoplay={true}
              playerSize="standard"
            />
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '20px',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)'
          }}>
            <span>{video.speaker}</span>
            <span>•</span>
            <span>{video.views?.toLocaleString()} views</span>
            <span>•</span>
            <span>{video.uploadDate}</span>
          </div>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            fontSize: '16px',
            marginBottom: '24px'
          }}>
            {video.description}
          </p>
          
          {!user && (
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px',
                color: 'white'
              }}>
                Unlock Premium Content
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '16px',
                fontSize: '14px'
              }}>
                Join thousands of insurance professionals with full access to our content library.
              </p>
              
              <button
                onClick={() => navigate('/auth?form=signup')}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Start Free Trial
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 404 Not Found Component
const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      textAlign: 'center',
      padding: '20px'
    }}>
      {/* 404 Animation */}
      <div style={{
        fontSize: '120px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '24px',
        animation: 'float 3s ease-in-out infinite'
      }}>
        404
      </div>
      
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '16px',
        color: 'white'
      }}>
        Page Not Found
      </h1>
      
      <p style={{
        fontSize: '18px',
        color: 'rgba(255, 255, 255, 0.7)',
        marginBottom: '32px',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        Sorry, the page you're looking for doesn't exist or has been moved. 
        Let's get you back to watching amazing insurance content!
      </p>
      
      <div style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => navigate(user ? '/home' : '/')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          className="interactive-hover"
        >
          {user ? 'Go to Dashboard' : 'Go Home'}
        </button>
        
        {!user && (
          <button
            onClick={() => navigate('/auth?form=signup')}
            style={{
              padding: '12px 24px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            className="interactive-hover"
          >
            Sign Up Free
          </button>
        )}
      </div>
      
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'float 4s ease-in-out infinite reverse'
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)',
        borderRadius: '50%',
        animation: 'float 5s ease-in-out infinite'
      }}></div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        .interactive-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </div>
  );
};

export default App;