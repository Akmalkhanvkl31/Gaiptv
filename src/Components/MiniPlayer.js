import React, { useState } from 'react';
import { Maximize2, X, Volume2, VolumeX, Radio, AlertCircle, Minimize2 } from 'lucide-react';
import LivePlayer from './LivePlayer';  
import styles from './Styles';

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

  // Get enhanced styling based on trigger method
  const getMiniPlayerStyle = () => {
    const miniSize = getMiniPlayerSize();
    const miniPosition = getMiniPlayerPosition();
    
    const baseStyle = {
      ...styles.miniPlayer,
      ...miniSize,
      ...miniPosition,
      cursor: 'pointer',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 15, 35, 0.9))',
      border: isScrollBased 
        ? '2px solid rgba(59, 130, 246, 0.6)' // Blue border for scroll-triggered
        : '2px solid rgba(239, 68, 68, 0.6)', // Red border for manual
      borderRadius: '16px',
      backdropFilter: 'blur(20px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    // Enhanced shadows based on player size
    if (playerSize === 'cinema') {
      baseStyle.boxShadow = isScrollBased
        ? '0 30px 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.2)'
        : '0 30px 60px rgba(239, 68, 68, 0.4), 0 0 80px rgba(239, 68, 68, 0.2)';
    } else if (playerSize === 'compact') {
      baseStyle.boxShadow = isScrollBased
        ? '0 20px 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)'
        : '0 20px 40px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1)';
    } else {
      baseStyle.boxShadow = isScrollBased
        ? '0 25px 50px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)'
        : '0 25px 50px rgba(239, 68, 68, 0.3), 0 0 60px rgba(239, 68, 68, 0.1)';
    }

    return baseStyle;
  };

  const miniSize = getMiniPlayerSize();

  return (
    <div 
      style={getMiniPlayerStyle()}
      className="mini-player"
      onClick={handleClick}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Mute/Unmute Button */}
      <button 
        style={{
          position: 'absolute',
          top: '10px',
          right: '50px',
          padding: playerSize === 'compact' ? '6px' : '8px',
          background: isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 11
        }}
        onClick={handleMuteToggle}
        title={isMuted ? 'Unmute Live Stream' : 'Mute Live Stream'}
        className="mini-player-button"
      >
        {isMuted ? <VolumeX size={miniSize.controlSize} /> : <Volume2 size={miniSize.controlSize} />}
      </button>

      {/* Close Button */}
      <button 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: playerSize === 'compact' ? '6px' : '8px',
          background: 'rgba(239, 68, 68, 0.8)',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 11
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        title="Close Live Stream"
        className="mini-player-button"
      >
        <X size={miniSize.controlSize} />
      </button>

      {/* Video Player */}
      <div style={{
        aspectRatio: miniSize.aspectRatio,
        borderRadius: '16px',
        overflow: 'hidden'
      }}>
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
