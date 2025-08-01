import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Clock, 
  Eye, 
  Calendar, 
  User, 
  Tv, 
  Bookmark, 
  Check,
  Star,
  Share,
  MoreVertical,
  Radio
} from 'lucide-react';
import './VideoCard.css';

const VideoCard = ({ 
  video, 
  currentVideo, 
  onClick, 
  user,
  isSaved = false,
  onSave,
  isRecommended = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Generate thumbnail URL based on video source
  const getThumbnailUrl = () => {
    if (video.thumbnail) {
      return video.thumbnail;
    }
    
    // For Vimeo videos, extract video ID and create thumbnail URL
    if (video.videoSrc.includes('vimeo.com')) {
      const vimeoId = video.videoSrc.match(/\/video\/(\d+)/);
      if (vimeoId) {
        return `https://vumbnail.com/${vimeoId[1]}.jpg`;
      }
    }
    
    // For YouTube videos
    if (video.videoSrc.includes('youtube.com') || video.videoSrc.includes('youtu.be')) {
      const youtubeId = video.videoSrc.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
      if (youtubeId) {
        return `https://img.youtube.com/vi/${youtubeId[1]}/maxresdefault.jpg`;
      }
    }
    
    // For live streams or custom content, return a placeholder
    if (video.isLive) {
      return `https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop&crop=center`;
    }
    
    // Default insurance-related placeholder based on category
    const categoryImages = {
      'Technology': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=450&fit=crop',
      'Compliance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop',
      'Innovation': 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop',
      'Analytics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
      'Strategy': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
      'Risk Management': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
      'Customer Service': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
      'Live Events': 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop'
    };
    
    return categoryImages[video.category] || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop';
  };

  const handleCardClick = (e) => {
    // Don't trigger video selection if clicking on action buttons
    if (!e.target.closest('.video-actions')) {
      onClick(video);
    }
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    if (onSave) onSave();
  };

  const handleShareClick = (e) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: window.location.href
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleOptionsClick = (e) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const handleThumbnailLoad = () => {
    setThumbnailLoaded(true);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
    setThumbnailLoaded(true);
  };

  return (
    <div 
      className={`video-card ${isRecommended ? 'recommended' : ''} ${isHovered ? 'hovered' : ''}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          padding: '4px 8px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          fontWeight: '600',
          color: 'white',
          zIndex: 5,
          boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
        }}>
          <Star size={10} fill="white" />
          <span>For You</span>
        </div>
      )}

      {/* Video Thumbnail */}
      <div className="video-thumbnail">
        {/* Loading state */}
        {!thumbnailLoaded && (
          <div className="thumbnail-loading">
            <div className="spinner"></div>
          </div>
        )}

        {/* Actual Thumbnail */}
        {!thumbnailError ? (
          <img
            src={getThumbnailUrl()}
            alt={video.title}
            className="thumbnail-image"
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
            loading="lazy"
          />
        ) : (
          // Fallback content for thumbnail error
          <div className="thumbnail-fallback">
            {video.isLive ? (
              <>
                <Radio size={32} />
                <span>LIVE STREAM</span>
              </>
            ) : (
              <>
                <Tv size={32} />
                <span>{video.category}</span>
              </>
            )}
          </div>
        )}

        {/* Live Badge Overlay */}
        {video.isLive && (
          <div className="live-badge-overlay">
            <div className="live-dot"></div>
            LIVE
          </div>
        )}
          
        {/* Enhanced Play Overlay with better animation */}
        <div className="play-overlay">
          <button className="play-button">
            <Play size={24} color="white" fill="white" />
          </button>
        </div>

        {/* Duration Badge */}
        <div className="duration-badge">
          <Clock size={12} />
          <span>{video.duration}</span>
        </div>


        {/* Action Buttons (visible on hover for authenticated users) */}
        {user && isHovered && (
          <div className="video-actions">
            {/* Save Button */}
            <button
              onClick={handleSaveClick}
              className={`action-button ${isSaved ? 'saved' : ''}`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
            </button>

            {/* More Options Button */}
            <div className="options-menu">
              <button
                onClick={handleOptionsClick}
                className="action-button"
                title="More options"
              >
                <MoreVertical size={16} />
              </button>

              {/* Options Dropdown */}
              {showOptions && (
                <div className="options-dropdown">
                  <button
                    onClick={handleShareClick}
                    className="dropdown-item"
                  >
                    <Share size={12} />
                    Share
                  </button>
                  <button className="dropdown-item">
                    <Calendar size={12} />
                    Add to Schedule
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Card Content with hover animations */}
      <div className="card-content">
        {/* Title */}
        <h3 className="card-title">{video.title}</h3>
        
        {/* Description */}
        <p className="card-description">{video.description}</p>
        
        {/* Meta Information */}
        <div className="card-meta">
          <span>
            <Eye size={12} />
            {video.views?.toLocaleString()} views
          </span>
          <span className="upload-date">
            <Calendar size={12} />
            {video.uploadDate}
          </span>
        </div>
        
        {/* Enhanced Footer with User Features */}
        <div className="card-footer">
          <span className={`category-badge ${video.isLive ? 'live' : ''}`}>{video.category}</span>
          
          <div className="speaker-info">
            {/* Speaker Info */}
            <span>
              <User size={12} />
              {video.speaker?.split(',')[0]}
            </span>

            {/* Saved Indicator for Authenticated Users */}
            {user && isSaved && (
              <div className="saved-indicator">
                <Check size={10} />
                Saved
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Authenticated Users (if video is partially watched) */}
        {user && video.watchProgress && (
          <div className="progress-bar-container">
            <div className="progress-bar-header">
              <span>Continue watching</span>
              <span>{Math.round(video.watchProgress)}%</span>
            </div>
            <div className="progress-bar-background">
              <div 
                className="progress-bar-foreground"
                style={{ width: `${video.watchProgress}%` }} 
              />
            </div>
          </div>
        )}

        {/* Learning Path Indicator */}
        {user && isRecommended && (
          <div className="learning-path-indicator">
            <Star size={12} />
            <span>Part of your {user.role} learning path</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
