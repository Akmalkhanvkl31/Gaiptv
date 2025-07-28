import React from 'react';
import './ShimmerLoading.css';

const ShimmerLoading = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="shimmer-card">
            <div className="shimmer-thumbnail" />
            <div className="shimmer-content">
              <div className="shimmer-title" style={{ width: '80%' }} />
              <div className="shimmer-description" style={{ width: '100%' }} />
              <div className="shimmer-description" style={{ width: '60%' }} />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'player') {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <div>Connecting to live stream...</div>
      </div>
    );
  }

  return null;
};

export default ShimmerLoading;
