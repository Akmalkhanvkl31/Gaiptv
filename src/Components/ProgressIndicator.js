import React from 'react';

const ProgressIndicator = ({ 
  progress, 
  playerSize = 'standard',
  isVisible = false 
}) => {
  
  if (!isVisible || progress === undefined || progress === null) {
    return null;
  }

  const getProgressHeight = () => {
    switch (playerSize) {
      case 'compact':
        return '3px';
      case 'cinema':
        return '6px';
      case 'theater':
        return '4px';
      default:
        return '4px';
    }
  };

  const getBorderRadius = () => {
    return playerSize === 'theater' ? '0' : '0 0 20px 20px';
  };

  return (
    <div style={{
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: getProgressHeight(),
      background: 'rgba(255, 255, 255, 0.2)',
      zIndex: 5,
      borderRadius: getBorderRadius(),
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${Math.max(0, Math.min(100, progress))}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
        borderRadius: getBorderRadius(),
        transition: 'width 0.3s ease',
        position: 'relative'
      }}>
        {/* Animated progress glow */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '20px',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4))',
          borderRadius: getBorderRadius(),
          opacity: progress > 0 && progress < 100 ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>
    </div>
  );
};

export default ProgressIndicator;