import React, { useState, useRef, useEffect } from 'react';
import PlayerOverlay from './PlayerOverlay';
import ProgressIndicator from './ProgressIndicator';
import VideoIframe from './VideoIframe';

const LivePlayer = ({ 
  video, 
  isMainPlayer = true, 
  muted = false, 
  onMuteToggle,
  autoplay = false,
  onMinimize,
  playerSize = 'cinema',
  layoutMode = 'split',
  onPlayerSizeChange,
  onLayoutModeChange
}) => {
  // Player state
  const [isMuted, setIsMuted] = useState(muted);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showPlayerControls, setShowPlayerControls] = useState(true);
  const [controlsHideTimeout, setControlsHideTimeout] = useState(null);
  
  // Refs
  const iframeRef = useRef(null);
  const captionTimerRef = useRef(null);

  // Sync muted state with prop
  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [video]);

  // Auto-hide captions based on player size
  useEffect(() => {
    if (isMainPlayer && showCaptions) {
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current);
      }
      
      const timeout = playerSize === 'compact' ? 3000 : 
                     playerSize === 'cinema' ? 7000 : 5000;
      
      captionTimerRef.current = setTimeout(() => {
        setShowCaptions(false);
      }, timeout);
    }

    return () => {
      if (captionTimerRef.current) {
        clearTimeout(captionTimerRef.current);
      }
    };
  }, [isMainPlayer, showCaptions, video, playerSize]);

  // Auto-hide player controls
  useEffect(() => {
    const hideControls = () => {
      const timeout = setTimeout(() => {
        setShowPlayerControls(false);
      }, 5000);
      
      setControlsHideTimeout(timeout);
    };

    if (video && isMainPlayer) {
      setShowPlayerControls(true);
      hideControls();
    }

    return () => {
      if (controlsHideTimeout) {
        clearTimeout(controlsHideTimeout);
      }
    };
  }, [video, isMainPlayer]);

  // Show captions when hovering
  useEffect(() => {
    if (isHovered && isMainPlayer) {
      setShowCaptions(true);
    }
  }, [isHovered, isMainPlayer]);

  // Event handlers
  const handleShowControls = () => {
    setShowPlayerControls(true);
    
    if (controlsHideTimeout) {
      clearTimeout(controlsHideTimeout);
    }
    
    const timeout = setTimeout(() => {
      setShowPlayerControls(false);
    }, 3000);
    
    setControlsHideTimeout(timeout);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (onMuteToggle) {
      onMuteToggle(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  // Enhanced header padding
  const getHeaderPadding = () => {
    switch (playerSize) {
      case 'compact':
        return '12px';
      case 'cinema':
        return '24px';
      default:
        return '20px';
    }
  };

  // Get container style
  const getContainerStyle = () => {
    return {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: playerSize === 'theater' ? '0' : '20px',
      overflow: 'hidden',
      background: '#000'
    };
  };

  // Get live header style
  const getLiveHeaderStyle = () => {
    return {
      position: 'absolute',
      top: showPlayerControls && isMainPlayer ? '80px' : '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
      padding: getHeaderPadding(),
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      transition: 'top 0.3s ease'
    };
  };

  // Get controls hint style
  const getControlsHintStyle = () => {
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 18px',
      borderRadius: '25px',
      fontSize: '13px',
      fontWeight: '500',
      opacity: 0.8,
      transition: 'opacity 0.3s ease',
      pointerEvents: 'none',
      zIndex: 8,
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(139, 92, 246, 0.3)'
    };
  };

  if (!video) return null;

  return (
    <div 
      style={getContainerStyle()}
      onMouseEnter={() => {
        setIsHovered(true);
        handleShowControls();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleShowControls}
    >
      {/* Player Size and Layout Controls */}
  
      <PlayerOverlay
        video={video}
        isMuted={isMuted}
        isHovered={isHovered}
        showCaptions={showCaptions}
        showPlayerControls={showPlayerControls}
        onMuteToggle={handleMuteToggle}
        onFullscreen={handleFullscreen}
        onMinimize={onMinimize}
        playerSize={playerSize}
        layoutMode={layoutMode}
        onPlayerSizeChange={onPlayerSizeChange}
        onLayoutModeChange={onLayoutModeChange}
        isMainPlayer={isMainPlayer}
      />

      {/* Video Iframe */}
      <VideoIframe
        ref={iframeRef}
        video={video}
        playerSize={playerSize}
        autoplay={autoplay}
        muted={isMuted}
        onLoad={handleVideoLoad}
        isLoading={isLoading}
      />

      {/* Progress Indicator (for non-live videos) */}
      {!video.isLive && isMainPlayer && (
        <ProgressIndicator
          progress={video.watchProgress}
          playerSize={playerSize}
          isVisible={video.watchProgress > 0}
        />
      )}
    </div>
  );
};

export default LivePlayer;
