import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Users, 
  Radio, 
  Lock, 
  ArrowRight, 
  TrendingUp,
  AlertCircle,
  Clock,
  Star,
  Shield,
  Zap,
  BookOpen,
  Eye,
  Calendar,
  User,
  RefreshCw,
  ChevronRight,
  Target,
  Award,
  Menu,
  X,
  Bell,
  Search,
  ExternalLink,
  Info
} from 'lucide-react';
import './GuestLanding.css';

// Mock Data
const mockData = {
  liveStreams: [
    {
      id: 'live-1',
      title: 'Live Insurance Summit 2025',
      isLive: true,
      viewers: 12847,
      description: 'Live coverage of the annual insurance innovation summit featuring keynote speakers from major insurance companies.',
      category: 'Live Events',
      speaker: 'Insurance Industry Leaders',
      duration: 'LIVE',
      views: 15420,
      uploadDate: 'Broadcasting Now',
      videoSrc: 'https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop&crop=center'
    }
  ],
  
  featuredVideos: [
    {
      id: '1',
      title: 'AI in Insurance: Transforming Claims Processing',
      description: 'Discover how artificial intelligence is revolutionizing insurance claims processing, reducing costs and improving customer satisfaction.',
      category: 'Technology',
      speaker: 'Dr. Sarah Mitchell, AI Insurance Expert',
      duration: '45:30',
      views: 8500,
      uploadDate: '2 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop'
    },
    {
      id: '2',
      title: 'Regulatory Compliance in Digital Insurance',
      description: 'Understanding the latest compliance requirements for digital insurance platforms and how to implement them effectively.',
      category: 'Compliance',
      speaker: 'Michael Chen, Compliance Director',
      duration: '32:15',
      views: 6200,
      uploadDate: '1 week ago',
      thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop'
    },
    {
      id: '3',
      title: 'Customer Experience Innovation in InsurTech',
      description: 'Learn how leading insurance companies are leveraging technology to create seamless customer experiences.',
      category: 'Innovation',
      speaker: 'Emma Rodriguez, CX Strategy Lead',
      duration: '28:45',
      views: 4700,
      uploadDate: '3 days ago',
      thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop'
    }
  ],
  
  news: [
    {
      id: 1,
      type: 'regular',
      title: 'Insurance AI Summit Goes Live',
      content: 'Join industry leaders discussing the future of AI in insurance. The summit features groundbreaking presentations on machine learning applications in claims processing, underwriting automation, and customer service enhancement.',
      date: 'Today'
    },
    {
      id: 2,
      type: 'update',
      title: 'New Regulatory Guidelines Released',
      content: 'Updated compliance requirements for digital insurance platforms have been released by regulatory authorities. The new guidelines focus on data protection, customer privacy, and digital identity verification protocols.',
      date: 'June 23'
    },
    {
      id: 3,
      type: 'breaking',
      title: 'Cyber Insurance Claims Surge 340%',
      content: '340% increase in cyber insurance claims following recent cyber attacks on major corporations. This surge highlights the critical need for comprehensive digital protection strategies and updated cyber insurance policies.',
      date: 'Breaking'
    },
    {
      id: 4,
      type: 'update',
      title: 'Climate Risk Assessment Standards Updated',
      content: 'New international standards for climate risk assessment in insurance have been established. These standards will help insurers better evaluate and price climate-related risks across different geographical regions.',
      date: 'June 21'
    },
    {
      id: 5,
      type: 'regular',
      title: 'InsureTech Funding Reaches Record High',
      content: '$2.4B raised in Q2 2025, marking the highest quarterly investment in insurance technology startups. The funding surge is driven by innovations in AI, automation, and digital customer experience solutions.',
      date: 'June 22'
    }
  ]
};

// Live Player Component with RGB Enhancement
const LivePlayer = React.forwardRef(({
  video,
  isMainPlayer = true,
  isMiniPlayer,
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

  if (!video) return null;

  return (
    <div className="live-player-wrapper">
      {/* RGB Surrounding Light Effect */}
      <div className="rgb-background" />

      <div ref={ref} className="live-player-container rgb-glow">
        {/* Main video iframe */}
        <iframe
          ref={iframeRef}
          src="https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="live-player-iframe"
        />
      </div>
    </div>
  );
});

// Header Component
const Header = ({ 
  onSearch = () => {}, 
  onCategoryChange = () => {}, 
  selectedCategory = 'All', 
  user = null, 
  onLogout = () => {}, 
  onShowAuth = () => {},
  onShowAbout = () => {},
  isGuestMode = true,
  currentVideo = null
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('GAIP');
  const [isGaipDropdownOpen, setIsGaipDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E";

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
      if (isMobile) setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    setActiveTab('GAIP');
    onCategoryChange('All');
    setIsMobileMenuOpen(false);
  };

  const handleTabClick = (tabId, action) => {
    setActiveTab(tabId);
    if (action) action();
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    setActiveTab('About');
    onShowAbout();
    setIsMobileMenuOpen(false);
  };

  const mockNotifications = [
    {
      id: 1,
      title: 'Live Event Active',
      message: 'Insurance AI Summit is currently live',
      time: 'Now',
      type: 'live',
      unread: true
    },
    {
      id: 2,
      title: 'New Content Available',
      message: 'Risk Assessment with Big Data Analytics uploaded',
      time: '2 hours ago',
      type: 'info',
      unread: true
    }
  ];

  return (
    <header className="header">
      <div className={`header-inner ${isMobile ? 'mobile' : 'desktop'}`}>
        
        {/* Logo Section - Left */}
        <div onClick={handleLogoClick} className="logo-section">
          {/* Logo Icon */}
          <div className="logo-icon">
            <img src={logo} alt="GAIP Logo" className="logo-image" />
          </div>
          
          {/* Logo Text */}
          <div className="logo-text">
            <h1 className="logo-title">GAIPTV</h1>
            {!isMobile && (
              <p className="logo-subtitle">Professional Broadcasting</p>
            )}
          </div>
        </div>

        {/* Desktop Navigation - Center */}
        {!isMobile && (
          <nav className="nav-container">
            
            {/* Live TV Tab */}
            <div className="nav-tab-wrapper">
              <button
                onClick={() => setIsGaipDropdownOpen(!isGaipDropdownOpen)}
                className={`nav-button ${activeTab === 'GAIP' ? 'active' : ''}`}
              >
                <Radio size={16} />
                <span>Live TV</span>
              </button>
            </div>

            {/* About Tab */}
            <button
              onClick={handleAboutClick}
              className={`nav-button ${activeTab === 'About' ? 'active' : ''}`}
            >
              <Info size={16} />
              <span>About</span>
            </button>
          </nav>
        )}

        {/* Desktop Right Side Controls */}
        {!isMobile ? (
          <div className="header-controls">
            
            {/* Search Input */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="search-input"
              />
              <button
                onClick={() => onSearch(searchQuery)}
                className="search-button"
              >
                <Search size={16} />
              </button>
            </div>
            
            {/* Notification Button */}
            <div className="notification-wrapper">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="notification-button"
              >
                <Bell size={18} />
                {mockNotifications.some(n => n.unread) && (
                  <span className="notification-dot" />
                )}
              </button>
            </div>

            {/* Auth Button for Guest */}
            <button onClick={onShowAuth} className="auth-button">
              Sign In
            </button>
          </div>
        ) : (
          /* Mobile Right Side - Hamburger Menu */
          <div className="mobile-controls">
            {/* Mobile Notification Button */}
            <div className="notification-wrapper">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="notification-button mobile"
              >
                <Bell size={16} />
                {mockNotifications.some(n => n.unread) && (
                  <span className="notification-dot mobile" />
                )}
              </button>
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            
            {/* Mobile Search */}
            <div className="mobile-search">
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="mobile-search-input"
              />
            </div>

            {/* Mobile Auth Button */}
            <button
              onClick={() => { onShowAuth(); setIsMobileMenuOpen(false); }}
              className="mobile-auth-button"
            >
              Sign In / Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

// Sidebar Component
const Sidebar = ({ news, onNewsClick, user }) => {
  const [hoveredNewsId, setHoveredNewsId] = useState(null);

  const getNewsIcon = (type) => {
    switch (type) {
      case 'breaking':
        return <AlertCircle size={16} className="news-icon breaking" />;
      case 'update':
        return <TrendingUp size={16} className="news-icon update" />;
      default:
        return <Clock size={16} className="news-icon regular" />;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <TrendingUp size={20} />
            <span>News & Updates</span>
          </h3>
          <button className="refresh-button">
            <RefreshCw size={16} />
          </button>
        </div>

        <div className="news-container">
          {news.map(newsItem => (
            <div 
              key={newsItem.id} 
              className={`news-item ${hoveredNewsId === newsItem.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredNewsId(newsItem.id)}
              onMouseLeave={() => setHoveredNewsId(null)}
              onClick={(e) => onNewsClick && onNewsClick(newsItem, e)}
            >
              <div className="news-header">
                {getNewsIcon(newsItem.type)}
                <span className={`news-badge ${newsItem.type}`}>
                  {newsItem.date}
                </span>
              </div>

              <h4 className="news-title">{newsItem.title}</h4>
              <p className="news-content">{newsItem.content}</p>
            </div>
          ))}
        </div>

        <button className="view-all-button">
          <span>View All Updates</span>
          <ChevronRight size={16} />
        </button>

        {/* Platform Stats */}
        <div className="platform-stats">
          <h4 className="stats-title">
            <Zap size={18} />
            Platform Stats
          </h4>
          <div className="stats-list">
            <div className="stat-item">
              <span className="stat-label">Live Viewers</span>
              <span className="stat-value live">12,847</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Videos</span>
              <span className="stat-value">127</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Today's Views</span>
              <span className="stat-value trending">25.3K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Locked Video Card Component
const LockedVideoCard = ({ video, onLoginClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`video-card locked ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onLoginClick}
    >
      {/* Thumbnail with Blur Effect */}
      <div className="video-thumbnail-container">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="video-thumbnail blurred"
        />
        
        {/* Lock Overlay */}
        <div className="lock-overlay">
          <div className={`lock-icon-container ${isHovered ? 'animated' : ''}`}>
            <Lock size={32} />
          </div>
          <span className="lock-text">Sign in to watch</span>
        </div>

        {/* Duration Badge */}
        <div className="duration-badge">
          <Clock size={12} />
          {video.duration}
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-main">
          <h3 className="card-title">{video.title}</h3>
          <p className="card-description">{video.description}</p>
        </div>

        <div className="card-meta">
          <span className="meta-item">
            <Eye size={12} />
            {video.views?.toLocaleString()} views
          </span>
          <span className="meta-item">
            <Calendar size={12} />
            {video.uploadDate}
          </span>
        </div>

        <div className="card-footer">
          <span className="category-badge">{video.category}</span>
          <span className="speaker-info">
            <User size={12} />
            {video.speaker?.split(',')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Guest Landing Component
const EnhancedGuestLanding = () => {
  const [currentVideo, setCurrentVideo] = useState(mockData.liveStreams[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

  const playerContainerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleSignIn = () => {
    console.log('Navigate to sign in');
    window.location.href = '/auth?form=signin';
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    window.location.href = '/auth?form=signup';
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewsClick = (newsItem, e) => {
    e.stopPropagation();
    console.log('News clicked:', newsItem);
  };

  return (
    <div className="guest-landing">
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        user={null}
        onShowAuth={handleLoginClick}
        isGuestMode={true}
        currentVideo={currentVideo}
      />

      {/* Main Content Layout */}
      <div className="main-layout">
        {/* Main Content Area */}
        <div className="content-area">
          {/* Live Player Section */}
          <div ref={playerContainerRef} className="player-section">
            <LivePlayer
              video={currentVideo}
              isMainPlayer={true}
              autoplay={false}
              muted={false}
              playerSize="cinema"
              layoutMode="split"
            />

            {/* Video Info Section */}
            <div className="video-info">
              <h2 className="video-title">{currentVideo.title}</h2>
              <p className="video-description">{currentVideo.description}</p>
              <div className="video-meta">
                <span className="meta-item">
                  <User size={16} />
                  {currentVideo.speaker}
                </span>
                <span className="meta-item">
                  <Users size={16} />
                  {currentVideo.viewers?.toLocaleString()} watching
                </span>
                <span className="meta-item">
                  <Eye size={16} />
                  {currentVideo.views?.toLocaleString()} total views
                </span>
              </div>
            </div>
          </div>

          {/* Premium Content Section */}
          <div className="premium-section">
            {/* Section Header */}
            <div className="section-header">
              <h2 className="section-title">Premium Professional Content</h2>
              <p className="section-description">
                Access exclusive videos, expert insights, and industry analysis. 
                Sign up for free to unlock our complete library.
              </p>
            </div>

            {/* Locked Video Grid */}
            <div className="video-grid">
              {mockData.featuredVideos.map(video => (
                <LockedVideoCard 
                  key={video.id} 
                  video={video} 
                  onLoginClick={handleLoginClick}
                />
              ))}
            </div>

            {/* Call to Action */}
            <div className="cta-section">
              <h3 className="cta-title">Ready to unlock premium content?</h3>
              <p className="cta-description">
                Join thousands of insurance professionals advancing their careers with our premium content library.
              </p>
              
              <div className="cta-buttons">
                <button onClick={handleSignUp} className="cta-button primary">
                  Start Free Trial
                  <ArrowRight size={18} />
                </button>
                
                <button onClick={handleSignIn} className="cta-button secondary">
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Hidden on Mobile */}
        {!isMobile && (
          <Sidebar 
            news={mockData.news} 
            onNewsClick={handleNewsClick} 
            user={null} 
          />
        )}
      </div>

      {/* Mobile News Section - Only shown on mobile */}
      {isMobile && (
        <div className="mobile-news-section">
          <h3 className="mobile-news-title">
            <TrendingUp size={20} />
            Latest News
          </h3>
          
          <div className="mobile-news-list">
            {mockData.news.slice(0, 3).map(newsItem => (
              <div 
                key={newsItem.id} 
                className="mobile-news-item"
                onClick={(e) => handleNewsClick(newsItem, e)}
              >
                <div className="mobile-news-header">
                  {newsItem.type === 'breaking' && <AlertCircle size={14} />}
                  {newsItem.type === 'update' && <TrendingUp size={14} />}
                  {newsItem.type === 'regular' && <Clock size={14} />}
                  <span className={`mobile-news-date ${newsItem.type}`}>
                    {newsItem.date}
                  </span>
                </div>

                <h4 className="mobile-news-title">{newsItem.title}</h4>
                <p className="mobile-news-content">
                  {newsItem.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Auth Modal Overlay */}
      {showAuthModal && (
        <div className="auth-modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <div className="auth-modal-icon">
              <Lock size={32} />
            </div>
            
            <h3 className="auth-modal-title">Premium Content Access</h3>
            
            <p className="auth-modal-description">
              Sign up for free to access our complete library of professional insurance content, 
              including expert videos, certifications, and exclusive events.
            </p>
            
            <div className="auth-modal-buttons">
              <button onClick={handleSignUp} className="auth-button primary">
                Create Free Account
                <ArrowRight size={18} />
              </button>
              
              <button onClick={handleSignIn} className="auth-button secondary">
                Sign In
              </button>
            </div>
            
            <button
              onClick={() => setShowAuthModal(false)}
              className="auth-modal-close"
            >
              Continue as guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedGuestLanding;