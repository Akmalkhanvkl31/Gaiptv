import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Archive,
  ExternalLink,
  Info,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import './Header.css';
import logo from "../Assets/GaipLogo.png"; 

const Header = ({ 
  onSearch = () => {}, 
  onCategoryChange = () => {}, 
  selectedCategory = 'All', 
  user = null, 
  profile,
  onLogout = () => {}, 
  onShowAuth = () => {},
  onShowAbout = () => {},
  isGuestMode = false,
  currentVideo = null
}) => {
  const isAdmin = profile?.role === 'admin';
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('GAIP');
  const [isGaipDropdownOpen, setIsGaipDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
      if (window.innerWidth <= 768) setIsMobileMenuOpen(false);
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

  const handleGaipAction = (action) => {
    setActiveTab('GAIP');
    setIsGaipDropdownOpen(false);
    setIsMobileMenuOpen(false);
    
    switch (action) {
      case 'archive':
        onCategoryChange('Archive');
        break;
      case 'featured':
        onCategoryChange('Featured');
        break;
      default:
        onCategoryChange('All');
        break;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="header-content">
        
        <div 
          onClick={handleLogoClick}
          className="logo-section"
        >
          <div className="logo-icon">
            <img src={logo} alt="GAIP Logo" />
          </div>
          
          <div className="logo-text">
            <h1>GAIPTV</h1>
            <p>Professional Broadcasting</p>
          </div>
        </div>

        <nav className="nav-tabs">
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsGaipDropdownOpen(!isGaipDropdownOpen)}
                className={`nav-tab-button ${activeTab === 'GAIP' ? 'active' : ''}`}
              >
                <Archive size={16} />
                <span>GAIP</span>
                <ChevronDown size={14} className={`chevron-icon ${isGaipDropdownOpen ? 'open' : ''}`} />
              </button>

              {isGaipDropdownOpen && (
                <div className="dropdown-menu gaip-dropdown">
                  {[
                    { label: 'Video Archive', icon: <Archive size={14} />, action: () => handleGaipAction('archive') },
                    { label: 'Featured Videos', icon: <Archive size={14} />, action: () => handleGaipAction('featured') },
                    { 
                      label: 'Visit GAIP.co', 
                      icon: <ExternalLink size={14} />, 
                      action: () => window.open('https://www.gaip.co/', '_blank'),
                      isExternal: true 
                    }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="dropdown-item"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.isExternal && (
                        <ExternalLink size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                handleTabClick('InsureTek', () => window.open('https://www.insuretek.org/dubai-2025/', '_blank'));
              }}
              className={`nav-tab-button ${activeTab === 'InsureTek' ? 'active' : ''}`}
            >
              <ExternalLink size={16} />
              <span>InsureTek</span>
            </button>

            <button
              onClick={handleAboutClick}
              className={`nav-tab-button ${activeTab === 'About' ? 'active' : ''}`}
            >
              <Info size={16} />
              <span>About</span>
            </button>
        </nav>

        <div className="right-controls">
            <div className="search-input">
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
              <button onClick={() => onSearch(searchQuery)}>
                <Search size={16} />
              </button>
            </div>
            
            <div style={{ position: 'relative' }} className="notification-button-wrapper">
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="control-button"
              >
                <Bell size={18} />
                {mockNotifications.some(n => n.unread) && (
                  <span className="notification-dot" />
                )}
              </button>

              {isNotificationOpen && (
                <div className="dropdown-menu notification-dropdown">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    {currentVideo?.isLive && (
                      <div className="live-indicator">
                        <div className="live-dot" />
                        LIVE
                      </div>
                    )}
                  </div>
                  
                  {mockNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`notification-item ${notification.unread ? 'unread' : ''} ${notification.type === 'live' ? 'live-type' : ''}`}
                    >
                      <div className="notification-title">
                        <span>{notification.title}</span>
                        {notification.unread && (
                          <div className={`unread-dot ${notification.type === 'live' ? 'live' : ''}`} />
                        )}
                      </div>
                      <p>{notification.message}</p>
                      <span>{notification.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="profile-btn"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                  />
                  <span>{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className="dropdown-menu profile-dropdown">
                    <div className="profile-info">
                        <img
                          src={user.avatar}
                          alt={user.name}
                        />
                        <div>
                          <div>{user.name}</div>
                          <div>{user.email}</div>
                        </div>
                    </div>

                    <div className="profile-menu-items">
                      {[
                        { icon: <User size={16} />, label: 'Profile' },
                        { icon: <Settings size={16} />, label: 'Settings' },
                        { icon: <Info size={16} />, label: 'About GAIPTV', action: () => { setIsProfileOpen(false); handleAboutClick(); } }
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          className="dropdown-item"
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}

                      {isAdmin && (
                        <button
                          onClick={() => setShowAdmin(true)}
                          className="dropdown-item admin-panel-btn"
                        >
                          <Settings size={16} />
                          <span>Admin Panel</span>
                        </button>
                      )}
                      
                      <hr />
                      
                      <button 
                        onClick={onLogout}
                        className="dropdown-item sign-out-btn"
                      >
                        <LogOut size={16} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onShowAuth}
                className="sign-in-btn"
              >
                Sign In
              </button>
            )}
        </div>

        <div className="mobile-menu">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="control-button"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            
            <div className="search-input mobile-search">
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
              />
              <button onClick={() => onSearch(searchQuery)}>
                <Search size={18} />
              </button>
            </div>

            <div className="mobile-nav-items">
              
              <div style={{ marginBottom: '16px' }}>
                <button
                  onClick={() => setIsGaipDropdownOpen(!isGaipDropdownOpen)}
                  className={`mobile-nav-button ${activeTab === 'GAIP' ? 'active' : ''}`}
                >
                  <Archive size={20} />
                  <span style={{ flex: 1 }}>GAIP</span>
                  <ChevronDown size={16} className={`chevron-icon ${isGaipDropdownOpen ? 'open' : ''}`} />
                </button>

                {isGaipDropdownOpen && (
                  <div className="mobile-dropdown-menu">
                    {[
                      { label: 'Video Archive', icon: <Archive size={16} />, action: () => handleGaipAction('archive') },
                      { label: 'Featured Videos', icon: <Archive size={16} />, action: () => handleGaipAction('featured') },
                      { 
                        label: 'Visit GAIP.co', 
                        icon: <ExternalLink size={16} />, 
                        action: () => window.open('https://www.gaip.co/', '_blank'),
                        isExternal: true 
                      }
                    ].map((item, index) => (
                      <button
                        key={index}
                        onClick={item.action}
                        className="mobile-dropdown-item"
                      >
                        {item.icon}
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.isExternal && (
                          <ExternalLink size={14} style={{ opacity: 0.6 }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  handleTabClick('InsureTek', () => window.open('https://www.insuretek.org/dubai-2025/', '_blank'));
                }}
                className={`mobile-nav-button ${activeTab === 'InsureTek' ? 'active' : ''}`}
              >
                <ExternalLink size={20} />
                <span>InsureTek</span>
              </button>

              <button
                onClick={handleAboutClick}
                className={`mobile-nav-button ${activeTab === 'About' ? 'active' : ''}`}
              >
                <Info size={20} />
                <span>About</span>
              </button>
            </div>

            {user ? (
              <div className="mobile-user-section">
                <div className="profile-info">
                  <img
                    src={user.avatar}
                    alt={user.name}
                  />
                  <div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                </div>

                <div className="mobile-user-menu">
                  {[
                    { icon: <User size={18} />, label: 'Profile' },
                    { icon: <Settings size={18} />, label: 'Settings' },
                    { icon: <Info size={18} />, label: 'About GAIPTV', action: () => { setIsMobileMenuOpen(false); handleAboutClick(); } }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      className="mobile-menu-item"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}

                  {isAdmin && (
                    <button
                      onClick={() => { setShowAdmin(true); setIsMobileMenuOpen(false); }}
                      className="mobile-menu-item admin-panel-btn"
                    >
                      <Settings size={18} />
                      <span>Admin Panel</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="mobile-menu-item sign-out-btn"
                  >
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onShowAuth(); setIsMobileMenuOpen(false); }}
                className="sign-in-btn mobile-sign-in"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {(isGaipDropdownOpen || isNotificationOpen || isProfileOpen) && (
        <div 
          className="dropdown-overlay"
          onClick={() => {
            setIsGaipDropdownOpen(false);
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
