import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Components/Header';
import LivePlayer from './Components/LivePlayer';
import VideoGrid from './Components/VideoGrid';
import Sidebar from './Components/Sidebar';
import MiniPlayer from './Components/MiniPlayer';
import mockData from './Components/mockData';

const MainApplication = () => {
  const [currentVideo, setCurrentVideo] = useState(mockData.liveStreams[0]);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [miniPlayerVideo, setMiniPlayerVideo] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const playerContainerRef = useRef(null);

  // ✅ Updated scroll logic to detect partial visibility
  const handleScroll = useCallback(() => {
    if (playerContainerRef.current) {
      const rect = playerContainerRef.current.getBoundingClientRect();
      const isMostlyVisible = rect.top < window.innerHeight && rect.bottom > 150;

      if (!isMostlyVisible && currentVideo) {
        setMiniPlayerVideo(currentVideo);
        setShowMiniPlayer(true);
      } else {
        setShowMiniPlayer(false);
      }
    }
  }, [currentVideo]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Main Player */}
      <div ref={playerContainerRef} className={isFullScreen ? 'fullscreen-player' : ''}>
        <LivePlayer
          video={currentVideo}
          isMainPlayer={true}
          autoplay={true}
          muted={false}
          onMuteToggle={() => {}}
          onMinimize={() => {}}
          playerSize="cinema"
          isFullScreen={isFullScreen}
          onToggleFullScreen={toggleFullScreen}
        />
      </div>

      {/* Video Details */}
      <div style={{
        color: 'white',
        padding: '16px 24px',
        backgroundColor: '#1f2937',
        borderBottom: '1px solid #374151'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>{currentVideo.title}</h2>
        <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '6px' }}>{currentVideo.description}</p>
        <div style={{ fontSize: '13px', color: '#ccc' }}>
          {currentVideo.speaker} • {currentVideo.views?.toLocaleString()} views • {currentVideo.uploadDate}
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '20px', gap: '20px', width: '100%' }}>
        <div style={{ flex: '1 1 0%', minWidth: '300px' }}>
          <VideoGrid
            videos={mockData.featuredVideos}
            currentVideo={currentVideo}
            onVideoSelect={setCurrentVideo}
            searchQuery=""
            selectedCategory="All"
            onCategoryChange={() => {}}
            user={null}
            activeLiveStream={null}
            savedVideoIds={new Set()}
            onVideoSave={() => {}}
          />
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <Sidebar news={mockData.news} onNewsClick={() => {}} user={null} activeLiveStream={null} />
        </div>
      </div>

      {/* MiniPlayer */}
      {showMiniPlayer && miniPlayerVideo && (
        <MiniPlayer
          video={miniPlayerVideo}
          onClose={() => setShowMiniPlayer(false)}
          onMaximize={() => {
            setShowMiniPlayer(false);
            if (playerContainerRef.current) {
              playerContainerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          autoplay={true}
          muted={true}
          isScrollBased={true}
          position="bottom-right"
          isActiveStream={true}
        />
      )}
    </div>
  );
};

export default MainApplication;
