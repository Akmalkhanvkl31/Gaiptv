// Simple MainApplication component to fix import issues
// This should be saved as src/MainApplication.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './Components/AuthContext';
import Header from './Components/Header';
import LivePlayer from './Components/LivePlayer';
import VideoGrid from './Components/VideoGrid';
import Sidebar from './Components/Sidebar';
import MiniPlayer from './Components/MiniPlayer';
import NewsPopup from './Components/NewsPopup';
import AuthScreen from './Components/AuthScreen';
import AdminDashboard from './Components/AdminDashboard';
import About from './Components/About/About';
import AdBanner from './Components/AdBanner';
import ShimmerLoading from './Components/ShimmerLoading';
import mockData from './Components/mockData';
import cssAnimations from './Components/cssAnimations';

const MainApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut, loading: authLoading } = useAuth();
  
  // Core application state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isMiniPlayerMuted, setIsMiniPlayerMuted] = useState(true);
  const [isScrollBased, setIsScrollBased] = useState(false);
  
  // UI state management
  const [showNewsPopup, setShowNewsPopup] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Player configuration
  const [playerSize, setPlayerSize] = useState('standard');
  const [layoutMode, setLayoutMode] = useState('split');
  
  // Refs for scroll tracking
  const playerRef = useRef(null);
  const lastScrollY = useRef(0);

  // Initialize application
  useEffect(() => {
    const initializeApp = async () => {
      setIsLoading(true);
      
      // Parse URL parameters for initial state
      const urlParams = new URLSearchParams(location.search);
      const authForm = urlParams.get('form');
      const videoId = urlParams.get('video');
      const category = urlParams.get('category');
      
      // Handle authentication flow
      if (authForm && !user) {
        setShowAuthModal(true);
      }
      
      // Set initial category
      if (category && mockData.categories.includes(category)) {
        setSelectedCategory(category);
      }
      
      // Auto-select live stream if available and no specific video requested
      if (!videoId && mockData.liveStreams?.length > 0) {
        setCurrentVideo(mockData.liveStreams[0]);
      } else if (videoId) {
        // Find specific video by ID
        const allVideos = [...(mockData.liveStreams || []), ...(mockData.featuredVideos || [])];
        const video = allVideos.find(v => v.id === videoId);
        if (video) {
          setCurrentVideo(video);
        }
      }
      
      // Simulate loading time for better UX
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    };
    
    initializeApp();
  }, [location.search, user]);

  // Handle scroll-based mini player activation
  useEffect(() => {
    if (!currentVideo || !playerRef.current) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const playerElement = playerRef.current;
      
      if (playerElement) {
        const playerRect = playerElement.getBoundingClientRect();
        const isPlayerVisible = playerRect.bottom > 0;
        
        // Show mini player when main player scrolls out of view
        if (!isPlayerVisible && currentScrollY > lastScrollY.current) {
          if (!showMiniPlayer) {
            setShowMiniPlayer(true);
            setIsScrollBased(true);
          }
        } else if (isPlayerVisible && showMiniPlayer && isScrollBased) {
          // Hide mini player when main player comes back into view
          setShowMiniPlayer(false);
          setIsScrollBased(false);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    const throttledHandleScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledHandleScroll);
    
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [currentVideo, showMiniPlayer, isScrollBased]);

  // Utility function for throttling
  const throttle = (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  };

  // Event handlers
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    
    // Hide mini player when selecting a new video
    if (showMiniPlayer) {
      setShowMiniPlayer(false);
      setIsScrollBased(false);
    }
    
    // Scroll to top to show the main player
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL without page reload
    const newUrl = `${window.location.pathname}?video=${video.id}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    
    // Update URL to reflect category change
    const urlParams = new URLSearchParams(location.search);
    if (category === 'All') {
      urlParams.delete('category');
    } else {
      urlParams.set('category', category);
    }
    
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('All'); // Reset category when searching
  };

  const handleNewsClick = (newsItem, event) => {
    setSelectedNews(newsItem);
    setShowNewsPopup(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleShowAuth = () => {
    if (user) return; // Don't show auth if already logged in
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
    // Clean up URL parameters
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete('form');
    const newUrl = `${window.location.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    window.history.pushState(null, '', newUrl);
  };

  const handleMiniPlayerClose = () => {
    setShowMiniPlayer(false);
    setIsScrollBased(false);
  };

  const handleMiniPlayerMaximize = () => {
    setShowMiniPlayer(false);
    setIsScrollBased(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMiniPlayerMuteToggle = (muted) => {
    setIsMiniPlayerMuted(muted);
  };

  const handleShowAbout = () => {
    setShowAbout(true);
  };

  const handleCloseAbout = () => {
    setShowAbout(false);
  };

  const handleShowAdmin = () => {
    setShowAdminPanel(true);
  };

  const handleCloseAdmin = () => {
    setShowAdminPanel(false);
  };

  // Prepare video data
  const allVideos = [
    ...(mockData.liveStreams || []),
    ...(mockData.featuredVideos || [])
  ];

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'Admin' || 
                  user?.email?.includes('admin') || 
                  user?.user_metadata?.is_admin === true;

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <ShimmerLoading type="player" />
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Inject CSS animations */}
      <style>{cssAnimations}</style>
      
      {/* Header */}
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        user={user}
        onLogout={handleLogout}
        onShowAuth={handleShowAuth}
        onShowAbout={handleShowAbout}
        currentVideo={currentVideo}
        isGuestMode={!user}
      />

      {/* Main Content */}
      <div style={{
        display: 'flex',
        minHeight: 'calc(100vh - 72px)',
        position: 'relative'
      }}>
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          padding: '24px',
          paddingRight: user ? '0' : '24px', // Adjust padding based on sidebar
          maxWidth: user ? 'calc(100% - 340px)' : '100%',
          transition: 'all 0.3s ease'
        }}>
          {/* Welcome Section for New Users */}
          {!user && (
            <div style={{
              marginBottom: '32px',
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
              borderRadius: '20px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              textAlign: 'center'
            }} className="welcome-section">
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }} className="welcome-title">
                Welcome to GAIPTV
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '20px',
                lineHeight: '1.6'
              }} className="welcome-subtitle">
                Professional insurance broadcasting platform with live events, expert insights, and industry news.
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={handleShowAuth}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)'
                  }}
                  className="interactive-hover"
                >
                  Sign Up Free
                </button>
                <button
                  onClick={handleShowAbout}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="interactive-hover"
                >
                  Learn More
                </button>
              </div>
            </div>
          )}

          {/* Video Player Section */}
          {currentVideo && (
            <div style={{
              marginBottom: '32px',
              background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
              borderRadius: playerSize === 'theater' ? '0' : '24px',
              padding: playerSize === 'theater' ? '0' : '24px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              boxShadow: '0 25px 50px rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: 'white'
                  }}>
                    {currentVideo.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    flexWrap: 'wrap'
                  }}>
                    <span>{currentVideo.speaker}</span>
                    <span>•</span>
                    <span>{currentVideo.views?.toLocaleString()} views</span>
                    {currentVideo.isLive && (
                      <>
                        <span>•</span>
                        <span style={{
                          color: '#ef4444',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                          }}></div>
                          LIVE
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Player Controls */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <select
                    value={playerSize}
                    onChange={(e) => setPlayerSize(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="compact" style={{ background: '#1f2937' }}>Compact</option>
                    <option value="standard" style={{ background: '#1f2937' }}>Standard</option>
                    <option value="cinema" style={{ background: '#1f2937' }}>Cinema</option>
                    <option value="theater" style={{ background: '#1f2937' }}>Theater</option>
                  </select>
                </div>
              </div>

              {/* Video Player */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: playerSize === 'cinema' ? '21/9' : 
                           playerSize === 'compact' ? '4/3' : '16/9',
                minHeight: playerSize === 'compact' ? '300px' : 
                          playerSize === 'cinema' ? '500px' : '400px',
                maxHeight: playerSize === 'theater' ? '100vh' : '80vh',
                borderRadius: playerSize === 'theater' ? '0' : '16px',
                overflow: 'hidden',
                background: '#000'
              }}>
                <LivePlayer
                  ref={playerRef}
                  video={currentVideo}
                  isMainPlayer={true}
                  autoplay={true}
                  playerSize={playerSize}
                  layoutMode={layoutMode}
                />
              </div>

              {/* Video Description */}
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  fontSize: '14px'
                }}>
                  {currentVideo.description}
                </p>
              </div>
            </div>
          )}

          {/* Ad Banner */}
          <AdBanner 
            user={user} 
            position="below-player"
            onClose={() => {}} 
          />

          {/* Video Grid */}
          <VideoGrid
            videos={allVideos}
            currentVideo={currentVideo}
            onVideoSelect={handleVideoSelect}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            isLoading={false}
            user={user}
          />
        </div>

        {/* Sidebar - Only show for authenticated users */}
        {user && (
          <div style={{
            width: '340px',
            flexShrink: 0,
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
            borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
            position: 'sticky',
            top: '72px',
            height: 'calc(100vh - 72px)',
            overflowY: 'auto'
          }}>
            <Sidebar
              news={mockData.news}
              onNewsClick={handleNewsClick}
              user={user}
            />
            
            {/* Sidebar Ad */}
            <div style={{ padding: '0 20px' }}>
              <AdBanner 
                user={user} 
                position="sidebar"
                onClose={() => {}} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Mini Player */}
      {showMiniPlayer && currentVideo && currentVideo.isLive && (
        <MiniPlayer
          video={currentVideo}
          onClose={handleMiniPlayerClose}
          onMaximize={handleMiniPlayerMaximize}
          autoplay={true}
          muted={isMiniPlayerMuted}
          onMuteToggle={handleMiniPlayerMuteToggle}
          playerSize={playerSize}
          isScrollBased={isScrollBased}
          layoutMode={layoutMode}
          isActiveStream={currentVideo.isLive}
        />
      )}

      {/* Modals and Popups */}
      {showAuthModal && (
        <AuthScreen 
          onClose={handleCloseAuth}
          isOverlay={true}
        />
      )}

      {showNewsPopup && selectedNews && (
        <NewsPopup
          newsItem={selectedNews}
          onClose={() => setShowNewsPopup(false)}
        />
      )}

      {showAbout && (
        <About 
          user={user}
          onClose={handleCloseAbout}
        />
      )}

      {showAdminPanel && isAdmin && (
        <AdminDashboard 
          onClose={handleCloseAdmin}
        />
      )}
    </div>
  );
};

export default MainApplication;