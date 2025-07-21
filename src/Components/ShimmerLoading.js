import styles from './Styles';
import React, { useState } from 'react';
import { Tv, Monitor, Zap, Search, Bell, UserCircle } from 'lucide-react';
import mockData from './mockData';


const ShimmerLoading = ({ type = 'card', count = 1 }) => {
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} style={styles.shimmerCard}>
            <div style={styles.shimmerThumbnail} />
            <div style={styles.shimmerContent}>
              <div style={{...styles.shimmerTitle, width: '80%'}} />
              <div style={{...styles.shimmerDescription, width: '100%'}} />
              <div style={{...styles.shimmerDescription, width: '60%'}} />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'player') {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} className="loading-spinner"></div>
        <div style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          Connecting to live stream...
        </div>
      </div>
    );
  }

  return null;
};

// Header Component
const Header = ({ onSearch, onCategoryChange, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <div style={styles.logoBackground}>
              <Tv color="white" size={18} />
            </div>
            <div style={styles.liveDot}></div>
          </div>
          <div>
            <h1 style={styles.logoText}>GAIPTV</h1>
            <p style={styles.logoSubtext}>
              <Monitor size={11} />
              <span>Professional Broadcasting</span>
            </p>
          </div>
        </div>

        <nav style={styles.nav}>
          {mockData.categories.map(category => (
            <button
              key={category}
              className="nav-button"
              style={{
                ...styles.navButton,
                ...(selectedCategory === category ? styles.navButtonActive : styles.navButtonInactive)
              }}
              onClick={() => onCategoryChange(category)}
            >
              <span>{category}</span>
              {category === 'Live Events' && <Zap size={14} style={{ color: '#facc15' }} />}
            </button>
          ))}
        </nav>

        <div style={styles.searchContainer}>
          <div style={styles.searchInputContainer}>
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              style={styles.searchInput}
            />
            <button
              onClick={() => onSearch(searchQuery)}
              style={styles.searchButton}
            >
              <Search size={20} />
            </button>
          </div>
          
          <button style={styles.notificationButton}>
            <Bell size={20} />
            <span style={styles.notificationDot}></span>
          </button>

          <div style={styles.profileContainer}>
            <button style={styles.profileButton}>
              <UserCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShimmerLoading;