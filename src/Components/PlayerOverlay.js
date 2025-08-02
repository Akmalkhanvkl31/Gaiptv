import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import './PlayerOverlay.css';

const PlayerOverlay = ({
  video,
  playerSize,
  isMuted,
  onFullscreen,
  onMinimize,
  onMuteToggle,
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

          {/* Player Controls */}
          {isMainPlayer && (
            <div className={`player-controls ${showPlayerControls ? 'show' : ''}`}>
              {/* Mute/Unmute */}
              {onMuteToggle && (
                <button
                  className="control-button mute-toggle"
                  onClick={onMuteToggle}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  type="button"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              )}

              {/* Fullscreen */}
              {onFullscreen && (
                <button
                  className="control-button fullscreen-toggle"
                  onClick={onFullscreen}
                  aria-label="Toggle fullscreen"
                  type="button"
                >
                  <Maximize size={20} />
                </button>
              )}

              {/* Minimize */}
              {onMinimize && (
                <button
                  className="control-button minimize-toggle"
                  onClick={onMinimize}
                  aria-label="Minimize player"
                  type="button"
                >
                  <Minimize size={20} />
                </button>
              )}

              {/* Layout Mode */}
              {onLayoutModeChange && (
                <button
                  className="control-button layout-toggle"
                  onClick={onLayoutModeChange}
                  aria-label="Change layout mode"
                  type="button"
                >
                  {layoutMode === 'grid' ? 'Grid View' : 'List View'}
                </button>
              )}

              {/* Player Size */}
              {onPlayerSizeChange && (
                <button
                  className="control-button size-toggle"
                  onClick={() =>
                    onPlayerSizeChange(playerSize === 'compact' ? 'normal' : 'compact')
                  }
                  aria-label="Toggle player size"
                  type="button"
                >
                  {playerSize === 'compact' ? 'Expand' : 'Compact'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayerOverlay;
