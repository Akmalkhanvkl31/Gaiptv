import React, { useState, useRef, useEffect } from 'react';
import PlayerOverlay from './PlayerOverlay';
import ProgressIndicator from './ProgressIndicator';
import VideoIframe from './VideoIframe';
import { Volume2, VolumeX } from 'lucide-react';

const LivePlayer = ({
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
}) => {
  const [isMuted, setIsMuted] = useState(muted);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showPlayerControls, setShowPlayerControls] = useState(true);
  const [controlsHideTimeout, setControlsHideTimeout] = useState(null);

  const iframeRef = useRef(null);
  const playerContainerRef = useRef(null);
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

  

  const handleFullscreen = () => {
    if (iframeRef.current?.requestFullscreen) iframeRef.current.requestFullscreen();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (onMuteToggle) {
      onMuteToggle(!isMuted);
    }
  };

  const getContainerStyle = () => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: playerSize === 'theater' ? '0' : '20px',
    overflow: 'hidden',
    background: '#000'
  });

  if (!video) return null;

  return (
    <div
      ref={playerContainerRef}
      style={getContainerStyle()}
      onMouseEnter={() => {
        setIsHovered(true);
        handleShowControls();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleShowControls}
    >
        
      {/* Overlay - shown only if not in mini player mode */}
      {showOverlay && !isMiniPlayer && (
        <PlayerOverlay
          video={video}
          isMuted={isMuted}
          isHovered={isHovered}
          showCaptions={showCaptions}
          showPlayerControls={showPlayerControls}
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

      

      {/* Video */}
      <VideoIframe
        ref={iframeRef}
        video={video}
        playerSize={playerSize}
        autoplay={autoplay}
        muted={isMuted}
        onLoad={() => setIsLoading(false)}
        isLoading={isLoading}
      />

      {/* Progress */}
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
