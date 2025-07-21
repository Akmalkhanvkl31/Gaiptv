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
      {/* Enhanced LIVE Indicator Badge with scroll-based styling */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        background: isScrollBased 
          ? 'linear-gradient(135deg, #3b82f6, #1e40af)' // Blue for scroll-triggered
          : 'linear-gradient(135deg, #ef4444, #dc2626)', // Red for manual/live
        padding: '4px 8px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        fontWeight: '700',
        color: 'white',
        zIndex: 15,
        boxShadow: isScrollBased 
          ? '0 4px 12px rgba(59, 130, 246, 0.6)'
          : '0 4px 12px rgba(239, 68, 68, 0.6)',
        animation: 'pulse 2s infinite'
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'white',
          borderRadius: '50%',
          animation: 'pulse 1s infinite'
        }}></div>
        <Radio size={10} />
        <span>{isScrollBased ? 'AUTO' : 'LIVE'}</span>
      </div>

      {/* Scroll-based indicator */}
      {isScrollBased && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: showControls ? '140px' : '8px',
          background: 'rgba(59, 130, 246, 0.9)',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '9px',
          fontWeight: '600',
          color: 'white',
          zIndex: 14,
          transition: 'right 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Minimize2 size={8} />
          <span>AUTO-PLAY</span>
        </div>
      )}

      {/* Enhanced Controls with adaptive sizing */}
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: playerSize === 'compact' ? '6px' : '8px',
          zIndex: 10,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(15, 15, 35, 0.7))',
          borderRadius: '8px',
          padding: '4px',
          backdropFilter: 'blur(10px)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
          transform: showControls ? 'translateX(0)' : 'translateX(10px)'
        }}
        className="mini-player-controls"
        onClick={handleControlClick}
      >
        {/* Mute/Unmute Button */}
        <button 
          style={{
            padding: playerSize === 'compact' ? '6px' : '8px',
            background: isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={handleMuteToggle}
          title={isMuted ? 'Unmute Live Stream' : 'Mute Live Stream'}
          className="mini-player-button"
        >
          {isMuted ? <VolumeX size={miniSize.controlSize} /> : <Volume2 size={miniSize.controlSize} />}
        </button>

        {/* Maximize Button */}
        {onMaximize && (
          <button 
            style={{
              padding: playerSize === 'compact' ? '6px' : '8px',
              background: isScrollBased 
                ? 'rgba(59, 130, 246, 0.8)' 
                : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            title="Maximize Live Stream"
            className="mini-player-button"
          >
            <Maximize2 size={miniSize.controlSize} />
          </button>
        )}

        {/* Close Button */}
        <button 
          style={{
            padding: playerSize === 'compact' ? '6px' : '8px',
            background: 'rgba(239, 68, 68, 0.8)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
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
      </div>

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
        />
      </div>

      {/* Enhanced Video Info with scroll-based styling */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: isScrollBased
          ? 'linear-gradient(0deg, rgba(59, 130, 246, 0.9) 0%, rgba(59, 130, 246, 0.7) 50%, transparent 100%)'
          : 'linear-gradient(0deg, rgba(239, 68, 68, 0.9) 0%, rgba(239, 68, 68, 0.7) 50%, transparent 100%)',
        padding: playerSize === 'compact' ? '8px 10px' : playerSize === 'cinema' ? '16px 14px' : '12px',
        borderRadius: '0 0 16px 16px',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          color: 'white',
          fontSize: `${miniSize.fontSize}`,
          fontWeight: '600',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
        }}>
          {isScrollBased ? '📺' : '🔴'} {video.title}
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: `${parseInt(miniSize.fontSize) - 1}px`,
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: 'white',
              borderRadius: '50%',
              animation: 'pulse 2s infinite',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)'
            }}></div>
            <span style={{ fontWeight: '700', color: 'white' }}>
              {isScrollBased ? 'AUTO-PLAY' : 'LIVE'}
            </span>
            <span>•</span>
            <span>{video.viewers?.toLocaleString()} viewers</span>
          </div>

          {/* Enhanced status indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {/* Muted Indicator */}
            {isMuted && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                background: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '8px',
                fontSize: `${parseInt(miniSize.fontSize) - 2}px`,
                fontWeight: '600'
              }}>
                <VolumeX size={10} />
                <span>Muted</span>
              </div>
            )}

            {/* Scroll-based auto indicator */}
            {isScrollBased && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 6px',
                background: 'rgba(59, 130, 246, 0.8)',
                borderRadius: '8px',
                fontSize: `${parseInt(miniSize.fontSize) - 2}px`,
                fontWeight: '600'
              }}>
                <span>🤖</span>
                <span>Auto</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced expand hint with scroll-based messaging */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: isScrollBased
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.8))'
          : 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.8))',
        padding: playerSize === 'compact' ? '8px 16px' : playerSize === 'cinema' ? '16px 24px' : '12px 20px',
        borderRadius: '25px',
        fontSize: `${parseInt(miniSize.fontSize)}px`,
        color: 'white',
        fontWeight: '700',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        border: '1px solid rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(15px)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
      }}
      className="expand-hint"
      >
        <Maximize2 size={miniSize.controlSize} />
        <span>
          {isScrollBased ? 'Return to Live Stream' : 'Watch Live Stream'}
        </span>
        {isMuted && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: '8px',
            padding: '2px 6px',
            background: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '8px',
            fontSize: `${parseInt(miniSize.fontSize) - 2}px`
          }}>
            <VolumeX size={10} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;