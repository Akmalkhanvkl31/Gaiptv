import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const PlayerOverlay = ({ 
  video, 
  playerSize, 
  isMuted,
  onMuteToggle,
  isLive = false,
  viewers,
  showCaptions,
  showPlayerControls,
  isMiniPlayer = false,
  isMainPlayer = true
}) => {

  if (!video) return null;

  // ✅ Show only mute button in mini-player, skip the rest
  if (isMiniPlayer) {
    return (
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '10px', 
        zIndex: 15,
        opacity: 1 
      }}>
        <button onClick={onMuteToggle} style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            color: 'white'
        }}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    );
  }

  // 🧠 Render full overlay only for non-mini players
  const getCaptionStyle = () => {
    const sizeMultiplier = {
      compact: 0.8,
      standard: 1,
      cinema: 1.2,
      fullwidth: 1.1,
      theater: 0.9
    }[playerSize] || 1;

    return {
      position: 'absolute',
      bottom: `${20 * sizeMultiplier}px`,
      left: `${20 * sizeMultiplier}px`,
      right: `${20 * sizeMultiplier}px`,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 15, 35, 0.8))',
      padding: `${20 * sizeMultiplier}px`,
      borderRadius: `${16 * sizeMultiplier}px`,
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      opacity: showCaptions ? 1 : 0,
      transform: showCaptions ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.5s ease',
      pointerEvents: showCaptions ? 'auto' : 'none',
      zIndex: 10
    };
  };

  const getViewerInfoStyle = () => {
    const sizeMultiplier = {
      compact: 0.8,
      standard: 1,
      cinema: 1.1,
      fullwidth: 1,
      theater: 0.9
    }[playerSize] || 1;

    return {
      position: 'absolute',
      top: `${80 * sizeMultiplier}px`,
      right: `${20 * sizeMultiplier}px`,
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(15, 15, 35, 0.7))',
      padding: `${10 * sizeMultiplier}px ${14 * sizeMultiplier}px`,
      borderRadius: '25px',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      opacity: showPlayerControls ? 1 : 0,
      transition: 'opacity 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      zIndex: 12
    };
  };

  return (
    <>
      {/* Live Viewer Count */}
      {isLive && viewers && playerSize !== 'compact' && (
        <div style={getViewerInfoStyle()}>
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#22c55e',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></div>
          <span style={{
            color: 'white',
            fontSize: playerSize === 'cinema' ? '13px' : '12px',
            fontWeight: '600'
          }}>
            {viewers.toLocaleString()} watching
          </span>
        </div>
      )}

      {/* Video Information Overlay */}
      <div style={getCaptionStyle()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{
              fontSize: `${20 * (playerSize === 'cinema' ? 1.3 : playerSize === 'compact' ? 0.8 : 1)}px`,
              fontWeight: '700',
              marginBottom: '10px',
              color: 'white',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
            }}>
              {video.title}
            </h3>
            
            <p style={{
              fontSize: `${14 * (playerSize === 'cinema' ? 1.2 : playerSize === 'compact' ? 0.9 : 1)}px`,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '10px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
              lineHeight: '1.5'
            }}>
              {video.description}
            </p>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: `${13 * (playerSize === 'cinema' ? 1.2 : playerSize === 'compact' ? 0.9 : 1)}px`,
              color: 'rgba(255, 255, 255, 0.8)',
              flexWrap: 'wrap'
            }}>
              <span>{video.speaker}</span>
              <span>•</span>
              <span>{video.views?.toLocaleString()} views</span>
              <span>•</span>
              {isLive ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  background: 'rgba(239, 68, 68, 0.8)',
                  borderRadius: '15px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  LIVE
                </div>
              ) : (
                <span>{video.uploadDate}</span>
              )}
            </div>
          </div>

          {/* Mute/Unmute Button */}
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            position: 'absolute',
            top: '20px',
            right: '20px',
            opacity: showPlayerControls ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <button onClick={onMuteToggle} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                color: 'white'
            }}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerOverlay;
