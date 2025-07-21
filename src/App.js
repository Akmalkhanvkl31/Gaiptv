import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AuthProvider, useAuth } from './Components/AuthContext';
import Header from './Components/Header';
import LivePlayer from './Components/LivePlayer';
import VideoGrid from './Components/VideoGrid';
import Sidebar from './Components/Sidebar';
import MiniPlayer from './Components/MiniPlayer';
import NewsPopup from './Components/NewsPopup';
import AuthScreen from './Components/AuthScreen';
import About from './Components/About/About';
import AdBanner from './Components/AdBanner';
import GuestLanding from './Components/GuestLanding';
import ShimmerLoading from './Components/ShimmerLoading';
import mockData from './Components/mockData';
import styles from './Components/Styles';
import cssAnimations from './Components/cssAnimations';
import logo from './Assets/GaipLogo.png';
import AdminPage from './Components/AdminPage';

const AppContent = () => {
  const { 
    user, 
    loading: authLoading, 
    isAuthenticated, 
    signOut,
    saveVideo,
    getSavedVideos,
    updateWatchProgress 
  } = useAuth();

  // Core state
  const [currentVideo, setCurrentVideo] = useState(null);
  const [miniPlayerVideo, setMiniPlayerVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  
  // UI state
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsPosition, setNewsPosition] = useState({ x: 0, y: 0 });
  const [showAuth, setShowAuth] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showGuestLanding, setShowGuestLanding] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Enhanced scroll-based mini player state
  const [scrollY, setScrollY] = useState(0);
  const [playerInView, setPlayerInView] = useState(true);
  const [scrollBasedMiniPlayer, setScrollBasedMiniPlayer] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lastScrollDirection, setLastScrollDirection] = useState(null);
  
  // State for managing active live stream
  const [activeLiveStream, setActiveLiveStream] = useState(null);
  const [liveStreamPaused, setLiveStreamPaused] = useState(false);
  const [miniPlayerTriggered, setMiniPlayerTriggered] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // User data state
  const [savedVideoIds, setSavedVideoIds] = useState(new Set());
  const [userAnalytics, setUserAnalytics] = useState(null);
  
  // Refs for scroll detection
  const playerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastScrollY = useRef(0);
  const autoplayAttempted = useRef(false);
  const scrollThreshold = 150;
  const playerVisibilityThreshold = 0.3;

  // Handle user interaction for autoplay
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      setSoundEnabled(true);
      console.log('🎵 User interaction detected - enabling sound');
      
      // If we have a live stream and haven't attempted autoplay yet, start it
      if (activeLiveStream && !autoplayAttempted.current) {
        console.log('🔴 Starting autoplay after user interaction');
        autoplayAttempted.current = true;
      }
    }
  }, [hasUserInteracted, activeLiveStream]);

  // Add event listeners for user interaction
  useEffect(() => {
    const events = ['click', 'keydown', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [handleUserInteraction]);

  // Initialize app based on auth state
  useEffect(() => {
    const initializeApp = async () => {
      // Always show loading initially
      setIsLoading(true);
      
      // Wait for auth to complete
      if (!authLoading) {
        if (isAuthenticated && user) {
          // User is authenticated - load user data and show main app
          console.log('User authenticated:', user.email);
          
          // Load user's saved videos
          try {
            const savedResult = await getSavedVideos();
            if (savedResult.success && savedResult.data) {
              setSavedVideoIds(new Set(savedResult.data.map(item => item.video_id)));
            }
          } catch (error) {
            console.error('Failed to load saved videos:', error);
          }
          
          // AUTO-START LIVE STREAM WITH ENHANCED SETTINGS
          if (mockData.liveStreams.length > 0) {
            const firstLiveStream = mockData.liveStreams[0];
            
            // Set up live stream for autoplay
            setCurrentVideo(firstLiveStream);
            setActiveLiveStream(firstLiveStream);
            setAutoplayEnabled(true);
            
            console.log('🔴 AUTO-STARTING LIVE STREAM:', firstLiveStream.title);
            console.log('▶️ Autoplay enabled:', true);
            
            // Mark autoplay as attempted
            autoplayAttempted.current = true;
          }
          
          setShowGuestLanding(false);
          setIsLoading(false);
        } else {
          // User not authenticated - show guest landing
          console.log('User not authenticated - showing guest landing');
          setShowGuestLanding(true);
          setIsLoading(false);
        }
      }
    };

    // Reduced delay for faster live stream start
    const timer = setTimeout(initializeApp, 500);
    return () => clearTimeout(timer);
  }, [authLoading, isAuthenticated, user, getSavedVideos]);

  // Enhanced scroll handler with better live stream management
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
    
    setScrollY(currentScrollY);
    setIsScrolling(true);
    setLastScrollDirection(scrollDirection);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const playerHeight = rect.height;
      const visibilityRatio = Math.max(0, visibleHeight) / playerHeight;
      
      const isPlayerVisible = visibilityRatio >= playerVisibilityThreshold;
      setPlayerInView(isPlayerVisible);

      // Auto mini player logic for live streams
      if (activeLiveStream && !miniPlayerTriggered && isAuthenticated) {
        if (scrollDirection === 'down' && 
            currentScrollY > scrollThreshold && 
            !isPlayerVisible) {
          
          console.log('🔴 Auto-triggering mini player for live stream');
          setScrollBasedMiniPlayer(true);
          setMiniPlayerVideo(activeLiveStream);
          setShowMiniPlayer(true);
          setMiniPlayerTriggered(true);
        }
      } 
      
      if (scrollBasedMiniPlayer && scrollDirection === 'up' && isPlayerVisible) {
        console.log('🔴 Hiding mini player - player back in view');
        setScrollBasedMiniPlayer(false);
        setShowMiniPlayer(false);
        setMiniPlayerVideo(null);
        setMiniPlayerTriggered(false);
      }
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 100);

    lastScrollY.current = currentScrollY;
  }, [activeLiveStream, scrollBasedMiniPlayer, scrollThreshold, playerVisibilityThreshold, miniPlayerTriggered, isAuthenticated]);

  const throttledScrollHandler = useCallback(() => {
    requestAnimationFrame(handleScroll);
  }, [handleScroll]);

  // Add scroll listeners only when authenticated
  useEffect(() => {
    if (isAuthenticated && !showGuestLanding) {
      const options = { passive: true };
      window.addEventListener('scroll', throttledScrollHandler, options);

      return () => {
        window.removeEventListener('scroll', throttledScrollHandler);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }
  }, [throttledScrollHandler, isAuthenticated, showGuestLanding]);

  // Enhanced video selection logic
  const handleVideoSelect = async (video) => {
    console.log('🎥 Video selected:', video.title, 'isLive:', video.isLive);
    
    // Handle user interaction
    handleUserInteraction();
    
    // Reset mini player triggers
    setScrollBasedMiniPlayer(false);
    setMiniPlayerTriggered(false);
    
    if (video.isLive) {
      setCurrentVideo(video);
      setActiveLiveStream(video);
      setShowMiniPlayer(false);
      setMiniPlayerVideo(null);
      setLiveStreamPaused(false);
      setAutoplayEnabled(true);
      setSoundEnabled(hasUserInteracted); // Only enable sound if user has interacted
      console.log('🔴 New live stream activated:', video.title);
      console.log('🎵 Sound enabled:', hasUserInteracted);
    } else {
      if (activeLiveStream) {
        console.log('🔴 Moving live stream to mini player for non-live video');
        setMiniPlayerVideo(activeLiveStream);
        setShowMiniPlayer(true);
        setCurrentVideo(video);
        setLiveStreamPaused(false);
      } else {
        setCurrentVideo(video);
        setShowMiniPlayer(false);
        setMiniPlayerVideo(null);
      }
      
      // Track video selection for authenticated users
      if (isAuthenticated && user) {
        try {
          await updateWatchProgress(video.id, 0, 0);
        } catch (error) {
          console.error('Failed to track video selection:', error);
        }
      }
    }

    // Smooth scroll to player
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // Handle video save/unsave
  const handleVideoSave = async (videoId) => {
    if (!isAuthenticated || !user) return;

    try {
      const result = await saveVideo(videoId);
      if (result.success) {
        setSavedVideoIds(prev => {
          const newSet = new Set(prev);
          if (newSet.has(videoId)) {
            newSet.delete(videoId);
          } else {
            newSet.add(videoId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error('Failed to save/unsave video:', error);
    }
  };

  // Handle mini player maximize
  const handleMaximizeMiniPlayer = () => {
    if (miniPlayerVideo && miniPlayerVideo.isLive) {
      console.log('🔴 Maximizing mini player live stream');
      setCurrentVideo(miniPlayerVideo);
      setActiveLiveStream(miniPlayerVideo);
      setMiniPlayerVideo(null);
      setShowMiniPlayer(false);
      setScrollBasedMiniPlayer(false);
      setMiniPlayerTriggered(false);
      setLiveStreamPaused(false);
      setAutoplayEnabled(true);
      setSoundEnabled(hasUserInteracted);
      
      if (playerRef.current) {
        playerRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  };

  // Handle mini player close
  const handleCloseMiniPlayer = () => {
    console.log('🔴 Closing mini player');
    setShowMiniPlayer(false);
    setMiniPlayerVideo(null);
    setScrollBasedMiniPlayer(false);
    setMiniPlayerTriggered(false);
    setActiveLiveStream(null);
    setLiveStreamPaused(true);
  };

  // Handle minimize from main player
  const handleMinimizePlayer = () => {
    if (currentVideo && currentVideo.isLive) {
      console.log('🔴 Minimizing main player live stream');
      setMiniPlayerVideo(currentVideo);
      setActiveLiveStream(currentVideo);
      setShowMiniPlayer(true);
      setScrollBasedMiniPlayer(false);
      setMiniPlayerTriggered(true);
      setCurrentVideo(null);
      setLiveStreamPaused(false);
    }
  };

  // Handle sound toggle
  const handleSoundToggle = () => {
    const newSoundState = !soundEnabled;
    setSoundEnabled(newSoundState);
    console.log('🎵 Sound toggled:', newSoundState);
    
    // Mark user interaction if enabling sound
    if (newSoundState) {
      handleUserInteraction();
    }
  };

  // Handle live stream toggle
  const handleLiveStreamToggle = () => {
    if (activeLiveStream) {
      if (liveStreamPaused) {
        setMiniPlayerVideo(activeLiveStream);
        setShowMiniPlayer(true);
        setLiveStreamPaused(false);
        setAutoplayEnabled(true);
        console.log('🔴 Resuming live stream');
      } else {
        setShowMiniPlayer(false);
        setMiniPlayerVideo(null);
        setLiveStreamPaused(true);
        setAutoplayEnabled(false);
        console.log('🔴 Pausing live stream');
      }
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle news
  const handleNewsClick = (newsItem, event) => {
    const rect = event.target.getBoundingClientRect();
    setNewsPosition({ x: rect.left, y: rect.top });
    setSelectedNews(newsItem);
  };

  const handleCloseNews = () => {
    setSelectedNews(null);
  };

  // Authentication handlers
  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      setCurrentVideo(null);
      setMiniPlayerVideo(null);
      setShowMiniPlayer(false);
      setActiveLiveStream(null);
      setSavedVideoIds(new Set());
      setUserAnalytics(null);
      setAutoplayEnabled(false);
      setSoundEnabled(false);
      setHasUserInteracted(false);
      autoplayAttempted.current = false;
      setShowGuestLanding(true);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Handle About page
  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  // Guest landing handlers
  const handleGuestSignIn = () => {
    setShowAuth(true);
    setShowGuestLanding(false);
  };

  const handleGuestSignUp = () => {
    setShowAuth(true);
    setShowGuestLanding(false);
  };

  const isUserAdmin = () => {
    return user?.user_metadata?.role === 'Admin' || 
           user?.email?.includes('admin') || 
           user?.user_metadata?.is_admin === true;
  };

  // Get all videos
  const allVideos = [...mockData.liveStreams, ...mockData.featuredVideos];

  // Loading screen
  if (isLoading || authLoading) {
    return (
      <div style={styles.loadingScreen}>
        <style>{cssAnimations}</style>
        <div style={styles.loadingContent} className="loading-content">
          <div style={styles.loadingLogo} className="loading-logo">
            <div style={styles.authLogoIcon}>
              <img src={logo} alt="GAIP Logo" style={{ width: '100%', height: '100%', borderRadius: '15px' }} />
            </div>
          </div>
          <h1 style={styles.loadingTitle} className="loading-title">GAIPTV</h1>
          <p style={styles.loadingSubtitle} className="loading-subtitle">
            {authLoading ? 'Authenticating...' : 'Starting Live Stream...'}
          </p>
          <div style={styles.loadingBar} className="loading-bar">
            <div style={styles.loadingProgress}></div>
          </div>
        </div>
      </div>
    );
  }

  // Show guest landing for non-authenticated users
  if (showGuestLanding && !isAuthenticated) {
    return (
      <>
        <style>{cssAnimations}</style>
        <GuestLanding
          onSignIn={handleGuestSignIn}
          onSignUp={handleGuestSignUp}
          liveStreams={mockData.liveStreams}
          featuredVideos={mockData.featuredVideos}
          news={mockData.news}
        />
        
        {/* Authentication Modal */}
        {showAuth && (
          <AuthScreen
            onClose={handleCloseAuth}
            isOverlay={true}
          />
        )}
      </>
    );
  }

  // Main authenticated app
  return (
    <div style={styles.container}>
      <style>{cssAnimations}</style>
      
      {/* Authentication Modal */}
      {showAuth && (
        <AuthScreen
          onClose={handleCloseAuth}
          isOverlay={true}
        />
      )}

      {/* Header */}
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        user={user}
        onLogout={handleLogout}
        onShowAuth={handleShowAuth}
        onShowAbout={handleShowAbout}
        isGuestMode={false}
        currentVideo={currentVideo}
        activeLiveStream={activeLiveStream}
        onLiveStreamToggle={handleLiveStreamToggle}
        liveStreamPaused={liveStreamPaused}
      />

      {isUserAdmin() && (
        <button
          onClick={() => setShowAdmin(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1001,
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}
        >
          Admin Panel
        </button>
      )}

      {/* Live Stream Status Banner */}
      {activeLiveStream && !currentVideo?.isLive && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.9))',
          padding: '12px 24px',
          margin: '0 24px',
          marginTop: '16px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'white'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: 'white',
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <span style={{ fontWeight: '600' }}>
              🔴 Live Stream: {activeLiveStream.title}
            </span>
            <span style={{ opacity: 0.8 }}>
              {liveStreamPaused ? '(Paused)' : showMiniPlayer ? '(Playing in mini player)' : '(Auto-playing with sound)'}
            </span>
            {soundEnabled && (
              <span style={{ 
                padding: '2px 8px', 
                background: 'rgba(255,255,255,0.2)', 
                borderRadius: '12px', 
                fontSize: '10px' 
              }}>
                🔊 SOUND ON
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSoundToggle}
              style={{
                padding: '6px 12px',
                background: soundEnabled ? 'rgba(34, 197, 94, 0.3)' : 'rgba(156, 163, 175, 0.3)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
            </button>
            <button
              onClick={handleLiveStreamToggle}
              style={{
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              {liveStreamPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleMaximizeMiniPlayer}
              style={{
                padding: '6px 12px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            >
              Watch Live
            </button>
          </div>
        </div>
      )}

      {/* Top Advertisement Banner */}
      <div style={{ padding: '0 24px', paddingTop: '16px' }}>
        <AdBanner 
          user={user}
          position="top-banner"
        />
      </div>

      {/* Welcome Section */}
      {user && (
        <div style={{
          ...styles.welcomeSection,
          margin: '16px 24px 0 24px'
        }}>
          <div style={styles.welcomeContent}>
            <h2 style={styles.welcomeTitle}>
              Welcome back, {user.user_metadata?.full_name || user.email?.split('@')[0]}! 👋
            </h2>
            <p style={styles.welcomeSubtitle}>
              🔴 Live stream auto-started {soundEnabled ? 'with sound' : 'muted'} • Continue your professional development journey
            </p>
          </div>
          <div style={styles.userStats}>
            <div style={styles.statItem} className="stat-item">
              <span style={styles.statValue}>{savedVideoIds.size}</span>
              <span style={styles.statLabel}>Saved Videos</span>
            </div>
            <div style={styles.statItem} className="stat-item">
              <span style={styles.statValue}>
                {user.user_metadata?.role === 'Premium' ? '∞' : '12'}
              </span>
              <span style={styles.statLabel}>Videos Watched</span>
            </div>
            <div style={styles.statItem} className="stat-item">
              <span style={styles.statValue}>7</span>
              <span style={styles.statLabel}>Day Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '24px',
        maxWidth: '100%',
        margin: '0',
        minHeight: 'calc(100vh - 64px)',
        transition: 'all 0.5s ease'
      }}>
        <div style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          overflow: 'hidden'
        }}>
          {/* Enhanced Video Player with Autoplay Controls */}
          <div 
            ref={playerRef} 
            style={{
              position: 'relative',
              width: '100%',
              background: '#000',
              overflow: 'hidden',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '20px',
              boxShadow: activeLiveStream ? 
                '0 0 50px rgba(239, 68, 68, 0.4), 0 0 100px rgba(239, 68, 68, 0.2)' :
                '0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2)',
              border: activeLiveStream ? 
                '2px solid rgba(239, 68, 68, 0.4)' :
                '1px solid rgba(139, 92, 246, 0.3)',
              marginTop: '24px',
              height: 'clamp(500px, 75vh, 900px)'
            }}
          >
            {currentVideo ? (
              <LivePlayer 
                video={currentVideo} 
                isMainPlayer={true}
                autoplay={autoplayEnabled}
                muted={!soundEnabled}
                onMuteToggle={handleSoundToggle}
                onMinimize={currentVideo && currentVideo.isLive ? handleMinimizePlayer : null}
                showControls={true}
                playerSize="cinema"
              />
            ) : (
              <div style={styles.loading}>
                <ShimmerLoading type="player" />
              </div>
            )}

            {/* Live Stream Auto-Play Indicator */}
            {currentVideo?.isLive && autoplayEnabled && (
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.8))',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '700',
                color: 'white',
                zIndex: 15,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: 'white',
                  borderRadius: '50%',
                  animation: 'pulse 1s infinite'
                }}></div>
                <span>AUTO-PLAY LIVE</span>
                {soundEnabled && <span>🔊</span>}
              </div>
            )}
          </div>

          {/* Advertisement Banner */}
          <AdBanner 
            user={user}
            position="below-player"
          />

          {/* Video Grid */}
          <div style={styles.videoGrid}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                {selectedCategory === 'All' ? 'Featured Videos' : selectedCategory}
              </h2>
              {mockData.liveStreams.length > 0 && (
                <div style={styles.liveIndicator}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  <span>Live Now: {mockData.liveStreams[0].title}</span>
                </div>
              )}
            </div>

            <VideoGrid
              videos={allVideos}
              currentVideo={currentVideo}
              onVideoSelect={handleVideoSelect}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              user={user}
              activeLiveStream={activeLiveStream}
              savedVideoIds={savedVideoIds}
              onVideoSave={handleVideoSave}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{
          width: '400px',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
          borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '16px',
          height: '100%',
          overflow: 'auto',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
          flexShrink: 0,
          transition: 'all 0.5s ease'
        }}>
          <Sidebar
            news={mockData.news}
            onNewsClick={handleNewsClick}
            user={user}
            activeLiveStream={activeLiveStream}
          />
          
          {/* Advertisement in Sidebar */}
          <AdBanner 
            user={user}
            position="sidebar"
          />
        </div>
      </div>

      {/* Auto Mini Player */}
      {showMiniPlayer && miniPlayerVideo && miniPlayerVideo.isLive && !liveStreamPaused && (
        <MiniPlayer
          video={miniPlayerVideo}
          onClose={handleCloseMiniPlayer}
          onMaximize={handleMaximizeMiniPlayer}
          autoplay={true}
          muted={scrollBasedMiniPlayer}
          isScrollBased={scrollBasedMiniPlayer}
          position="bottom-right"
          isActiveStream={miniPlayerVideo.id === activeLiveStream?.id}
        />
      )}

      {/* News Popup */}
      {selectedNews && (
        <NewsPopup
          newsItem={selectedNews}
          onClose={handleCloseNews}
          position={newsPosition}
        />
      )}

      {/* About Modal */}
      {showAbout && (
        <About
          user={user}
          onClose={handleCloseAbout}
        />
      )}

      {showAdmin && (
        <AdminPage onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
};

// Main App component with AuthProvider wrapper
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
