import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import './PlayerOverlay.css';

const PlayerOverlay = ({ 
  video, 
  playerSize, 
  isMuted,
  onFullscreen,
  onMinimize,
  isLive = false,
  viewers,
  showCaptions,
  showPlayerControls,
  isMainPlayer,
  layoutMode,
  onLayoutModeChange,
  onPlayerSizeChange
}) => {
  
  if (!video) return null;

  return (
    <>
      {/* Live Viewer Count */}
      {isLive && viewers && playerSize !== 'compact' && (
        <div className={`viewer-info ${showPlayerControls ? 'show' : ''}`}>
          <div className="live-indicator"></div>
          <span>{viewers.toLocaleString()} watching</span>
        </div>
      )}

      {/* Video Information Overlay */}
      <div className={`player-overlay ${showCaptions ? 'show' : ''}`}>
        <div className="player-overlay-content">
          <div>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
            <div className="video-meta">
              <span>{video.speaker}</span>
              <span>•</span>
              <span>{video.views?.toLocaleString()} views</span>
              <span>•</span>
              {isLive ? (
                <div className="live-badge">
                  <div className="live-dot"></div>
                  LIVE
                </div>
              ) : (
                <span>{video.uploadDate}</span>
              )}
            </div>
          </div>
          
          {isMainPlayer && (
            <div className={`player-controls ${showPlayerControls ? 'show' : ''}`}>
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerOverlay;
