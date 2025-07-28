import React, { useState, useRef, useEffect, forwardRef } from 'react';
import PlayerOverlay from './PlayerOverlay';

const LivePlayer = forwardRef(({
  video,
  isMainPlayer = true,
  isMiniPlayer,
  muted = false,
  onMuteToggle,
  autoplay = false,
  onMinimize,
  playerSize = 'cinema',
  layoutMode = 'split',
  onPlayerSizeChange,
  onLayoutModeChange
}, ref) => {
  const [isMuted, setIsMuted] = useState(muted);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showPlayerControls, setShowPlayerControls] = useState(true);
  const [controlsHideTimeout, setControlsHideTimeout] = useState(null);

  const iframeRef = useRef(null);
  const captionTimerRef = useRef(null);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [video]);

  useEffect(() => {
    if (isMainPlayer && showCaptions) {
      clearTimeout(captionTimerRef.current);
      const timeout = setTimeout(() => setShowCaptions(false),
        playerSize === 'compact' ? 3000 :
        playerSize === 'cinema' ? 7000 : 5000
      );
      captionTimerRef.current = timeout;
    }
    return () => clearTimeout(captionTimerRef.current);
  }, [isMainPlayer, showCaptions, video, playerSize]);

  useEffect(() => {
    if (video && isMainPlayer) {
      setShowPlayerControls(true);
      const timeout = setTimeout(() => setShowPlayerControls(false), 5000);
      setControlsHideTimeout(timeout);
    }
    return () => clearTimeout(controlsHideTimeout);
  }, [video, isMainPlayer]);

  useEffect(() => {
    if (isHovered && isMainPlayer) {
      setShowCaptions(true);
    }
  }, [isHovered, isMainPlayer]);

  const handleShowControls = () => {
    setShowPlayerControls(true);
    clearTimeout(controlsHideTimeout);
    const timeout = setTimeout(() => setShowPlayerControls(false), 3000);
    setControlsHideTimeout(timeout);
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (onMuteToggle) onMuteToggle(newMuted);
  };

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) iframeRef.current.requestFullscreen();
  };

  const getContainerStyle = () => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    minHeight: '200px',
    maxHeight: '100vh',
    borderRadius: playerSize === 'theater' ? '0' : '20px',
    overflow: 'hidden',
    background: '#000'
  });

  if (!video) return null;

  return (
    <div
      ref={ref} // 👈 forwarded ref here for scroll tracking
      style={getContainerStyle()}
      onMouseEnter={() => {
        setIsHovered(true);
        handleShowControls();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleShowControls}
    >
      {/* Overlay - shown only if not in mini player mode */}
      {!isMiniPlayer && (
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
          isMiniPlayer={false}
        />
      )}

      {/* Main video iframe */}
      <iframe
        ref={iframeRef}
        src="https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
});

export default LivePlayer;
