import React, { useState, useEffect, useRef, forwardRef } from 'react';

const LivePlayer = forwardRef(({
  video,
  isMainPlayer = true,
  isMiniPlayer,
  showOverlay = true,
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
  const iframeRef = useRef(null);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (onMuteToggle) onMuteToggle(newMuted);
  };

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    }
  };

  const getContainerStyle = () => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    minHeight: '200px',
    maxHeight: '100vh',
    borderRadius: playerSize === 'theater' ? '0' : '20px',
    overflow: 'hidden',
    background: '#000',
  });

  if (!video) return null;

  return (
    <div
      ref={ref} // 👈 forwarded ref for scroll tracking
      style={getContainerStyle()}
    >
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
          display: 'block',
        }}
      />
    </div>
  );
});

export default LivePlayer;
