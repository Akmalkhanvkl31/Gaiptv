import React, { forwardRef } from 'react';

const VideoIframe = forwardRef(({ 
  video, 
  playerSize = 'standard', 
  autoplay = false, 
  muted = false, 
  quality = 'HD',
  onLoad,
  isLoading = false 
}, ref) => {
  
  // Enhanced iframe src generation
  const getIframeSrc = () => {
    if (!video?.videoSrc) return '';
    
    let src = video.videoSrc;
    const params = new URLSearchParams();
    
    if (autoplay) {
      params.append('autoplay', '1');
    }
    if (muted) {
      params.append('muted', '1');
    }
    if (quality !== 'HD') {
      params.append('quality', quality.toLowerCase());
    }
    
    // Enhanced parameters for better experience
    params.append('responsive', '1');
    params.append('title', '0');
    params.append('byline', '0');
    params.append('portrait', '0');
    params.append('pip', '1'); // Picture-in-picture support
    
    // Cinema mode gets highest quality
    if (playerSize === 'cinema') {
      params.append('quality', 'hd1080');
    }
    
    // Theater mode optimizations
    if (playerSize === 'theater') {
      params.append('background', '1');
    }
    
    const separator = src.includes('?') ? '&' : '?';
    const paramString = params.toString();
    
    return paramString ? `${src}${separator}${paramString}` : src;
  };

  const getBorderRadius = () => {
    return playerSize === 'theater' ? '0' : '20px';
  };

  if (!video) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      borderRadius: getBorderRadius(),
      overflow: 'hidden'
    }}>
      {/* Video Iframe */}
      <iframe
        ref={ref}
        src={getIframeSrc()}
        frameBorder="0"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture; gyroscope; accelerometer"
        allowFullScreen
        title={video.title}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: getBorderRadius(),
          background: '#000'
        }}
        onLoad={onLoad}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />

      {/* Enhanced Loading Overlay */}
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 15, 35, 0.8))',
          backdropFilter: 'blur(15px)',
          zIndex: 3,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {/* Loading Spinner */}
          <div style={{
            width: playerSize === 'compact' ? '32px' : playerSize === 'cinema' ? '48px' : '40px',
            height: playerSize === 'compact' ? '32px' : playerSize === 'cinema' ? '48px' : '40px',
            border: '3px solid rgba(139, 92, 246, 0.3)',
            borderTop: '3px solid #8b5cf6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '16px'
          }}></div>
          
          {/* Loading Text */}
          <div style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: playerSize === 'compact' ? '12px' : playerSize === 'cinema' ? '16px' : '14px',
            fontWeight: '500',
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            {video?.isLive ? 'Connecting to live stream...' : 'Loading video...'}
          </div>
          
          {/* Loading Progress Dots */}
          <div style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center'
          }}>
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                style={{
                  width: '6px',
                  height: '6px',
                  background: 'rgba(139, 92, 246, 0.6)',
                  borderRadius: '50%',
                  animation: `pulse 1.5s ease-in-out ${index * 0.2}s infinite`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {!video?.videoSrc && !isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 15, 35, 0.9))',
          zIndex: 2
        }}>
          <div style={{
            width: playerSize === 'compact' ? '48px' : playerSize === 'cinema' ? '72px' : '60px',
            height: playerSize === 'compact' ? '48px' : playerSize === 'cinema' ? '72px' : '60px',
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            border: '2px solid rgba(239, 68, 68, 0.4)'
          }}>
            <span style={{ 
              fontSize: playerSize === 'compact' ? '20px' : playerSize === 'cinema' ? '32px' : '24px'
            }}>
              ⚠️
            </span>
          </div>
          <h3 style={{
            fontSize: playerSize === 'compact' ? '14px' : playerSize === 'cinema' ? '20px' : '16px',
            fontWeight: '600',
            marginBottom: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            Video Unavailable
          </h3>
          <p style={{
            fontSize: playerSize === 'compact' ? '12px' : playerSize === 'cinema' ? '16px' : '14px',
            opacity: 0.8,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            maxWidth: '300px',
            lineHeight: '1.4'
          }}>
            The video source is currently unavailable. Please try again later or contact support.
          </p>
          
          {/* Retry Button */}
          <button
            onClick={() => {
              if (onLoad) onLoad();
            }}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: 0.8
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0.8';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Try Again
          </button>
        </div>
      )}

      {/* Picture-in-Picture Hint */}
      {!isLoading && video?.videoSrc && 'pictureInPictureEnabled' in document && (
        <div 
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 4
          }}
          className="pip-hint"
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0'}
        >
          <div style={{
            padding: '4px 8px',
            background: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '8px',
            fontSize: '10px',
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            whiteSpace: 'nowrap'
          }}>
            Picture-in-Picture Available
          </div>
        </div>
      )}

      {/* Connection Quality Indicator */}
      {/* Video Title Overlay (for accessibility) */}
      {video?.title && (
        <div
          style={{
            position: 'absolute',
            top: '-1000px',
            left: '-1000px',
            opacity: 0,
            pointerEvents: 'none'
          }}
          aria-live="polite"
          aria-label={`Now playing: ${video.title}`}
        >
          {video.title}
        </div>
      )}
    </div>
  );
});

VideoIframe.displayName = 'VideoIframe';

export default VideoIframe;
