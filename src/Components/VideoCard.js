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
import styles from './Styles';

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
  const isActive = currentVideo && currentVideo.id === video.id;

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

  // Enhanced card styling with hover outline for featured videos
  const getCardStyle = () => {
    let cardStyle = {
      ...styles.videoCard,
      ...(isActive ? styles.videoCardActive : {}),
      ...(isRecommended ? {
        border: '2px solid rgba(139, 92, 246, 0.4)',
        boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
      } : {})
    };

    // Add enhanced hover effect for featured videos (non-live)
    if (!video.isLive && isHovered) {
      cardStyle = {
        ...cardStyle,
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 0 2px rgba(139, 92, 246, 0.5)',
        border: '2px solid rgba(139, 92, 246, 0.6)',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.08))'
      };
    } else if (video.isLive && isHovered) {
      // Different hover effect for live videos
      cardStyle = {
        ...cardStyle,
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(239, 68, 68, 0.3), 0 0 0 2px rgba(239, 68, 68, 0.4)',
        border: '2px solid rgba(239, 68, 68, 0.5)'
      };
    }

    return cardStyle;
  };

  return (
    <div 
      style={getCardStyle()}
      className="video-card"
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
      <div style={{
        ...styles.videoThumbnail,
        // Enhanced hover scaling for thumbnail
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.4s ease'
      }}>
        {/* Loading state */}
        {!thumbnailLoaded && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #2a2a2a, #3a3a3a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderTop: '2px solid #8b5cf6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          </div>
        )}

        {/* Actual Thumbnail */}
        {!thumbnailError ? (
          <img
            src={getThumbnailUrl()}
            alt={video.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 2,
              transition: 'transform 0.4s ease'
            }}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
            loading="lazy"
          />
        ) : (
          // Fallback content for thumbnail error
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2
          }}>
            {video.isLive ? (
              <>
                <Radio size={32} color="rgba(239, 68, 68, 0.8)" />
                <span style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginTop: '8px'
                }}>
                  LIVE STREAM
                </span>
              </>
            ) : (
              <>
                <Tv size={32} color="rgba(139, 92, 246, 0.8)" />
                <span style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '11px',
                  marginTop: '4px'
                }}>
                  {video.category}
                </span>
              </>
            )}
          </div>
        )}

        {/* Live Badge Overlay */}
        {video.isLive && (
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            padding: '4px 8px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: '700',
            color: 'white',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: 'white',
              borderRadius: '50%',
              animation: 'pulse 1s infinite'
            }}></div>
            LIVE
          </div>
        )}
          
        {/* Enhanced Play Overlay with better animation */}
        <div style={{
          ...styles.playOverlay,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 0.4s ease'
        }} className="play-overlay">
          <button style={{
            ...styles.playButton,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            background: video.isLive 
              ? 'rgba(239, 68, 68, 0.3)' 
              : 'rgba(139, 92, 246, 0.3)',
            border: video.isLive 
              ? '2px solid rgba(239, 68, 68, 0.6)' 
              : '2px solid rgba(139, 92, 246, 0.6)'
          }} className="playButton">
            <Play size={24} color="white" fill="white" />
          </button>
        </div>

        {/* Duration Badge */}
        <div style={{
          ...styles.duration,
          background: video.isLive 
            ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))'
            : 'rgba(0, 0, 0, 0.8)',
          color: video.isLive ? 'white' : 'rgba(255, 255, 255, 0.9)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease'
        }}>
          <Clock size={12} />
          <span>{video.duration}</span>
        </div>

        {/* Now Playing Indicator */}
        {isActive && (
          <div style={{
            ...styles.nowPlaying,
            animation: 'pulse 2s infinite'
          }}>
            <div style={styles.nowPlayingDot}></div>
            <span style={styles.nowPlayingText}>NOW PLAYING</span>
          </div>
        )}

        {/* Action Buttons (visible on hover for authenticated users) */}
        {user && isHovered && (
          <div 
            className="video-actions"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              zIndex: 15,
              transform: 'translateX(0)',
              opacity: 1,
              transition: 'all 0.3s ease'
            }}
          >
            {/* Save Button */}
            <button
              onClick={handleSaveClick}
              style={{
                padding: '8px',
                background: isSaved 
                  ? 'rgba(139, 92, 246, 0.9)' 
                  : 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transform: 'scale(1)',
              }}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
            </button>

            {/* More Options Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={handleOptionsClick}
                style={{
                  padding: '8px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                title="More options"
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                <MoreVertical size={16} />
              </button>

              {/* Options Dropdown */}
              {showOptions && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '4px',
                  background: 'rgba(15, 15, 35, 0.95)',
                  borderRadius: '8px',
                  padding: '8px',
                  minWidth: '140px',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  zIndex: 20,
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  <button
                    onClick={handleShareClick}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left'
                    }}
                    className="dropdown-item"
                  >
                    <Share size={12} />
                    Share
                  </button>
                  <button
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      color: 'white',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      textAlign: 'left'
                    }}
                    className="dropdown-item"
                  >
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
      <div style={{
        ...styles.cardContent,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.3s ease'
      }}>
        {/* Title */}
        <h3 style={{
          ...styles.cardTitle,
          color: isHovered && !video.isLive ? '#8b5cf6' : 'white',
          transition: 'color 0.3s ease'
        }}>{video.title}</h3>
        
        {/* Description */}
        <p style={styles.cardDescription}>{video.description}</p>
        
        {/* Meta Information */}
        <div style={styles.cardMeta}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Eye size={12} />
            {video.views?.toLocaleString()} views
          </span>
          <span style={styles.uploadDate}>
            <Calendar size={12} />
            {video.uploadDate}
          </span>
        </div>
        
        {/* Enhanced Footer with User Features */}
        <div style={styles.cardFooter}>
          <span style={{
            ...styles.category,
            background: video.isLive
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))'
              : 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
            border: video.isLive
              ? '1px solid rgba(239, 68, 68, 0.4)'
              : '1px solid rgba(139, 92, 246, 0.4)',
            color: video.isLive ? '#ef4444' : '#a855f7'
          }} className="category">{video.category}</span>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Speaker Info */}
            <span style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <User size={12} />
              {video.speaker?.split(',')[0]}
            </span>

            {/* Saved Indicator for Authenticated Users */}
            {user && isSaved && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                background: 'rgba(139, 92, 246, 0.2)',
                borderRadius: '8px',
                fontSize: '10px',
                color: '#8b5cf6',
                fontWeight: '600'
              }}>
                <Check size={10} />
                Saved
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar for Authenticated Users (if video is partially watched) */}
        {user && video.watchProgress && (
          <div style={{
            marginTop: '12px',
            padding: '8px 0'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4px'
            }}>
              <span style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.6)',
                fontWeight: '500'
              }}>
                Continue watching
              </span>
              <span style={{
                fontSize: '11px',
                color: '#8b5cf6',
                fontWeight: '600'
              }}>
                {Math.round(video.watchProgress)}%
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${video.watchProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Learning Path Indicator */}
        {user && isRecommended && (
          <div style={{
            marginTop: '12px',
            padding: '8px 12px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Star size={12} color="#8b5cf6" />
            <span>Part of your {user.role} learning path</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCard;