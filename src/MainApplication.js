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

  const playerRef = useRef(null);

  // 👇 Scroll logic to detect when main player is out of view
  const handleScroll = useCallback(() => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!isVisible && currentVideo) {
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

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Video Player (not sticky now) */}
      <div ref={playerRef}>
        <LivePlayer
          video={currentVideo}
          isMainPlayer={true}
          autoplay={true}
          muted={false}
          onMuteToggle={() => {}}
          onMinimize={() => {}}
          playerSize="cinema"
        />
      </div>

      {/* Content below the video */}
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

      {/* 🎬 Mini Player Triggered on Scroll */}
      {showMiniPlayer && miniPlayerVideo && (
        <MiniPlayer
          video={miniPlayerVideo}
          onClose={() => setShowMiniPlayer(false)}
          onMaximize={() => {
            setShowMiniPlayer(false);
            if (playerRef.current) playerRef.current.scrollIntoView({ behavior: 'smooth' });
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
