import React, { useState } from 'react';
import { Maximize2, X, Volume2, VolumeX, Radio, AlertCircle, Minimize2 } from 'lucide-react';
import LivePlayer from './LivePlayer';  
import './MiniPlayer.css';

const MiniPlayer = ({ 
  video, 
  onClose, 
  onMaximize, 
  autoplay = true, 
  muted = true,
  playerSize = 'standard',
  isScrollBased = false,
  layoutMode = 'split',
  isActiveStream = false
}) => {
  const [isMuted, setIsMuted] = useState(muted);
  const [showControls, setShowControls] = useState(false);

  // CRITICAL: ONLY allow live videos in mini player
  if (!video || !video.isLive) {
    console.warn('MiniPlayer: Only live videos are supported');
    return null;
  }

  const handleClick = (e) => {
    if (!e.target.closest('.mini-player-controls')) {
      onMaximize && onMaximize();
    }
  };

  const handleControlClick = (e) => {
    e.stopPropagation();
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // Enhanced mini player sizing based on main player size and layout
  const getMiniPlayerSize = () => {
    const baseConfig = {
      width: 'clamp(280px, 23vw, 380px)',
      aspectRatio: '16/9',
      fontSize: '12px',
      controlSize: 14
    };

    switch (playerSize) {
      case 'compact':
        return {
          width: 'clamp(200px, 18vw, 280px)',
          aspectRatio: '16/9',
          fontSize: '11px',
          controlSize: 12
        };
      case 'cinema':
        return {
          width: 'clamp(350px, 28vw, 450px)',
          aspectRatio: '16/9',
          fontSize: '13px',
          controlSize: 16
        };
      case 'fullwidth':
        return {
          width: 'clamp(320px, 25vw, 400px)',
          aspectRatio: '16/9',
          fontSize: '12px',
          controlSize: 14
        };
      case 'theater':
        return {
          width: 'clamp(250px, 20vw, 320px)',
          aspectRatio: '16/9',
          fontSize: '11px',
          controlSize: 13
        };
      default:
        return baseConfig;
    }
  };

  // Enhanced positioning based on player size and layout
  const getMiniPlayerPosition = () => {
    const basePosition = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 50
    };

    // Adjust position for full-scroll layout
    if (layoutMode === 'full-scroll') {
      return {
        ...basePosition,
        bottom: '24px',
        right: '24px',
        zIndex: 60 // Higher z-index for full scroll
      };
    }

    // Adjust position for different player sizes
    switch (playerSize) {
      case 'fullwidth':
        return {
          ...basePosition,
          bottom: '24px',
          right: '24px'
        };
      case 'cinema':
        return {
          ...basePosition,
          bottom: '30px',
          right: '30px'
        };
      case 'theater':
        return {
          ...basePosition,
          bottom: '20px',
          right: '20px',
          zIndex: 46 // Below theater mode
        };
      default:
        return basePosition;
    }
  };

  const miniSize = getMiniPlayerSize();

  return (
    <div 
      className={`mini-player ${isScrollBased ? 'scroll-based' : 'manual'}`}
      style={{ width: miniSize.width, aspectRatio: miniSize.aspectRatio }}
      onClick={handleClick}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Close Button */}
      <button 
        className="mini-player-close-button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close Live Stream"
      >
        <X size={miniSize.controlSize} />
      </button>

      {/* Video Player */}
      <div className="mini-player-video">
        <LivePlayer 
          video={video} 
          isMainPlayer={false} 
          muted={isMuted}
          autoplay={autoplay}
          playerSize={playerSize}
          isMiniPlayer={true}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
