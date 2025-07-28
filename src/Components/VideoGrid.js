import React, { useState } from 'react';
import VideoCard from './VideoCard';
import ShimmerLoading from './ShimmerLoading';
import { Filter, SortAsc, BookmarkPlus, Eye, Clock } from 'lucide-react';
import './VideoGrid.css';

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
      <div className="video-grid">
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
      <div className="no-results">
        <h3>No videos found</h3>
        <p>Try adjusting your search terms or selecting a different category</p>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Controls for Authenticated Users */}
      {user && (
        <div className="controls-bar">
          <div className="controls-bar-left">
            {/* Sort Dropdown */}
            <div className="sort-dropdown">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sort-button interactive-hover"
              >
                <SortAsc size={16} />
                Sort by: {sortBy === 'recent' ? 'Recent' : sortBy === 'popular' ? 'Popular' : 'Duration'}
              </button>

              {showFilters && (
                <div className="dropdown-menu">
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
            <div className="quick-stats">
              {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {/* Personal Stats */}
          <div className="personal-stats">
            <span>✨ {savedVideos.size} saved</span>
            <span>👁️ 12 watched today</span>
          </div>
        </div>
      )}

      {/* Recommended Section for Authenticated Users */}
      {user && selectedCategory === 'All' && !searchQuery && (
        <div className="recommended-section">
          <h4>
            <span>⭐</span>
            Recommended for {user.role}s
          </h4>
          <p>
            Curated content based on your professional role and viewing history
          </p>
        </div>
      )}

      {/* Video Grid */}
      <div className="video-grid">
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
        <div className="load-more-button">
          <button>
            Load More Videos
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
