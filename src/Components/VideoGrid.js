import React, { useState } from 'react';
import VideoCard from './VideoCard';
import ShimmerLoading from './ShimmerLoading';
import { Filter, SortAsc, BookmarkPlus, Eye, Clock } from 'lucide-react';
import styles from './Styles';

const VideoGrid = ({ 
  videos, 
  currentVideo, 
  onVideoSelect, 
  searchQuery, 
  selectedCategory, 
  isLoading = false,
  user 
}) => {
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [savedVideos, setSavedVideos] = useState(new Set());

  if (isLoading) {
    return (
      <div style={styles.grid}>
        <ShimmerLoading type="card" count={4} />
      </div>
    );
  }

  const handleSaveVideo = (videoId) => {
    const newSavedVideos = new Set(savedVideos);
    if (newSavedVideos.has(videoId)) {
      newSavedVideos.delete(videoId);
    } else {
      newSavedVideos.add(videoId);
    }
    setSavedVideos(newSavedVideos);
    
    // Here you would typically make an API call to save/unsave the video
    console.log(`Video ${videoId} ${newSavedVideos.has(videoId) ? 'saved' : 'unsaved'}`);
  };

  let filteredVideos = videos.filter(video => {
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort videos based on user preference
  filteredVideos = filteredVideos.sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'duration':
        // Convert duration to minutes for comparison
        const getDurationMinutes = (duration) => {
          if (duration === 'LIVE') return 0;
          const [mins, secs] = duration.split(':').map(Number);
          return mins + (secs / 60);
        };
        return getDurationMinutes(a.duration) - getDurationMinutes(b.duration);
      case 'recent':
      default:
        // Simple date comparison based on upload date string
        const getDateScore = (dateStr) => {
          if (dateStr.includes('hour')) return 100;
          if (dateStr.includes('day')) return 50;
          if (dateStr.includes('week')) return 10;
          return 1;
        };
        return getDateScore(b.uploadDate) - getDateScore(a.uploadDate);
    }
  });

  // Add recommended videos for authenticated users
  if (user && selectedCategory === 'All' && !searchQuery) {
    const recommendedVideos = videos.filter(video => 
      user.role === 'Risk Manager' ? video.category === 'Risk Management' :
      user.role === 'Compliance Officer' ? video.category === 'Compliance' :
      video.category === 'Technology'
    );
    
    // Mix recommended videos with others
    filteredVideos = [
      ...recommendedVideos.slice(0, 2),
      ...filteredVideos.filter(video => !recommendedVideos.includes(video))
    ];
  }

  if (filteredVideos.length === 0) {
    return (
      <div style={styles.noResults}>
        <h3>No videos found</h3>
        <p>Try adjusting your search terms or selecting a different category</p>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Controls for Authenticated Users */}
      {user && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          padding: '16px 20px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {/* Sort Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                className="interactive-hover"
              >
                <SortAsc size={16} />
                Sort by: {sortBy === 'recent' ? 'Recent' : sortBy === 'popular' ? 'Popular' : 'Duration'}
              </button>

              {showFilters && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  marginTop: '8px',
                  background: 'rgba(15, 15, 35, 0.95)',
                  borderRadius: '8px',
                  padding: '8px',
                  minWidth: '160px',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  zIndex: 10
                }}>
                  {[
                    { value: 'recent', label: 'Most Recent', icon: Clock },
                    { value: 'popular', label: 'Most Popular', icon: Eye },
                    { value: 'duration', label: 'Shortest First', icon: Filter }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowFilters(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: sortBy === option.value ? 'rgba(139, 92, 246, 0.3)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textAlign: 'left'
                      }}
                      className="dropdown-item"
                    >
                      <option.icon size={14} />
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Personal Stats */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            <span>✨ {savedVideos.size} saved</span>
            <span>👁️ 12 watched today</span>
          </div>
        </div>
      )}

      {/* Recommended Section for Authenticated Users */}
      {user && selectedCategory === 'All' && !searchQuery && (
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.02))',
          borderRadius: '12px',
          border: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          <h4 style={{
            color: '#8b5cf6',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>⭐</span>
            Recommended for {user.role}s
          </h4>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            marginBottom: '0'
          }}>
            Curated content based on your professional role and viewing history
          </p>
        </div>
      )}

      {/* Video Grid */}
      <div style={styles.grid}>
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={video.id}
            video={video}
            currentVideo={currentVideo}
            onClick={onVideoSelect}
            user={user}
            isSaved={savedVideos.has(video.id)}
            onSave={() => handleSaveVideo(video.id)}
            isRecommended={user && index < 2 && selectedCategory === 'All' && !searchQuery}
          />
        ))}
      </div>

      {/* Load More Button for Large Collections */}
      {filteredVideos.length > 12 && (
        <div style={{
          textAlign: 'center',
          marginTop: '32px'
        }}>
          <button style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '12px',
            color: '#8b5cf6',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            Load More Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;