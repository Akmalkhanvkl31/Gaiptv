import React, { useState, useEffect } from 'react';
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

// Mock logo for demo
const logo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5z'/%3E%3Cpath d='M2 17l10 5 10-5'/%3E%3Cpath d='M2 12l10 5 10-5'/%3E%3C/svg%3E";

// Mock useAdminAuth hook
const useAdminAuth = () => ({ isAdmin: true });

const Header = ({ 
  onSearch = () => {}, 
  onCategoryChange = () => {}, 
  selectedCategory = 'All', 
  user = null, 
  onLogout = () => {}, 
  onShowAuth = () => {},
  onShowAbout = () => {},
  isGuestMode = false,
  currentVideo = null
}) => {
  const { isAdmin } = useAdminAuth();
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('GAIP');
  const [isGaipDropdownOpen, setIsGaipDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
    <header style={{
      background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '0',
      height: '64px',
      width: '100%'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: isMobile ? '0 16px' : '0 24px'
      }}>
        
        {/* Logo Section - Left */}
        <div 
          onClick={handleLogoClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: isMobile ? '6px 8px' : '8px 12px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            transition: 'all 0.3s ease',
            minWidth: isMobile ? '100px' : '140px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.15)';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {/* Logo Icon */}
          <div style={{
            width: isMobile ? '28px' : '32px',
            height: isMobile ? '28px' : '32px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
          }}>
            <img src={logo} alt="GAIP Logo" style={{ width: '20px', height: '20px', borderRadius: '4px' }} />
          </div>
          
          {/* Logo Text */}
          <div>
            <h1 style={{
              color: 'white',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              margin: 0,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              letterSpacing: '-0.025em'
            }}>
              GAIPTV
            </h1>
            {!isMobile && (
              <p style={{
                color: 'rgba(156, 163, 175, 0.8)',
                fontSize: '11px',
                margin: 0,
                fontWeight: '500',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                Professional Broadcasting
              </p>
            )}
          </div>
        </div>

        {/* Desktop Navigation - Center */}
        {!isMobile && (
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(17, 24, 39, 0.5)',
            borderRadius: '12px',
            padding: '6px',
            border: '1px solid rgba(75, 85, 99, 0.3)'
          }}>
            
            {/* GAIP Tab with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsGaipDropdownOpen(!isGaipDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  background: activeTab === 'GAIP' 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                    : 'transparent',
                  border: activeTab === 'GAIP' 
                    ? '1px solid rgba(139, 92, 246, 0.3)' 
                    : '1px solid transparent',
                  borderRadius: '8px',
                  color: activeTab === 'GAIP' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== 'GAIP') {
                    e.target.style.background = 'rgba(75, 85, 99, 0.3)';
                    e.target.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== 'GAIP') {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                  }
                }}
              >
                <Archive size={16} />
                <span>GAIP</span>
                <ChevronDown size={14} style={{ 
                  transform: isGaipDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }} />
              </button>

              {/* GAIP Dropdown */}
              {isGaipDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  marginTop: '8px',
                  background: 'rgba(17, 24, 39, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  padding: '8px',
                  minWidth: '200px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.1)',
                  zIndex: 1001,
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto'
                }}>
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
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'rgba(156, 163, 175, 0.9)',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        textAlign: 'left',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))';
                        e.target.style.color = '#ffffff';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                        e.target.style.transform = 'translateX(0)';
                      }}
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

            {/* InsureTek Tab */}
            <button
              onClick={() => {
                handleTabClick('InsureTek', () => window.open('https://www.insuretek.org/dubai-2025/', '_blank'));
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                background: activeTab === 'InsureTek' 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                  : 'transparent',
                border: activeTab === 'InsureTek' 
                  ? '1px solid rgba(139, 92, 246, 0.3)' 
                  : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'InsureTek' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'InsureTek') {
                  e.target.style.background = 'rgba(75, 85, 99, 0.3)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'InsureTek') {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                }
              }}
            >
              <ExternalLink size={16} />
              <span>InsureTek</span>
            </button>

            {/* About Tab */}
            <button
              onClick={handleAboutClick}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 16px',
                background: activeTab === 'About' 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                  : 'transparent',
                border: activeTab === 'About' 
                  ? '1px solid rgba(139, 92, 246, 0.3)' 
                  : '1px solid transparent',
                borderRadius: '8px',
                color: activeTab === 'About' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'About') {
                  e.target.style.background = 'rgba(75, 85, 99, 0.3)';
                  e.target.style.color = '#ffffff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'About') {
                  e.target.style.background = 'transparent';
                  e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                }
              }}
            >
              <Info size={16} />
              <span>About</span>
            </button>
          </nav>
        )}

        {/* Desktop Right Side Controls */}
        {!isMobile ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            
            {/* Search Input */}
            <div style={{
              position: 'relative',
              background: 'rgba(17, 24, 39, 0.6)',
              borderRadius: '10px',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                style={{
                  width: '280px',
                  padding: '10px 16px 10px 16px',
                  fontSize: '14px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              />
              <button
                onClick={() => onSearch(searchQuery)}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '8px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Search size={16} />
              </button>
            </div>
            
            {/* Notification Button */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                style={{
                  padding: '10px',
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '10px',
                  color: 'rgba(156, 163, 175, 0.9)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <Bell size={18} />
                {mockNotifications.some(n => n.unread) && (
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: '2px solid rgba(17, 24, 39, 0.9)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  minWidth: '320px',
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto',
                  background: 'rgba(17, 24, 39, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.1)',
                  zIndex: 1001
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      margin: 0,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Notifications
                    </h4>
                    {currentVideo?.isLive && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        color: '#ef4444',
                        fontWeight: '600',
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '4px 8px',
                        borderRadius: '6px'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: '#ef4444',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite'
                        }} />
                        LIVE
                      </div>
                    )}
                  </div>
                  
                  {mockNotifications.map(notification => (
                    <div
                      key={notification.id}
                      style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
                        opacity: notification.unread ? 1 : 0.7,
                        background: notification.type === 'live' 
                          ? 'rgba(239, 68, 68, 0.05)' 
                          : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: 'white',
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          {notification.title}
                        </span>
                        {notification.unread && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            background: notification.type === 'live' ? '#ef4444' : '#8b5cf6',
                            borderRadius: '50%',
                            marginLeft: 'auto'
                          }} />
                        )}
                      </div>
                      <p style={{
                        fontSize: '13px',
                        color: 'rgba(156, 163, 175, 0.8)',
                        margin: '0 0 6px 0',
                        lineHeight: '1.4',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        {notification.message}
                      </p>
                      <span style={{
                        fontSize: '11px',
                        color: 'rgba(156, 163, 175, 0.6)',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile or Sign In */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(17, 24, 39, 0.6)',
                    border: '1px solid rgba(75, 85, 99, 0.4)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    maxWidth: '100px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}>
                    {user.name}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    marginTop: '8px',
                    minWidth: '240px',
                    maxHeight: 'calc(100vh - 100px)',
                    overflowY: 'auto',
                    background: 'rgba(17, 24, 39, 0.98)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(75, 85, 99, 0.4)',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    zIndex: 1001,
                    overflow: 'visible'
                  }}>
                    <div style={{
                      padding: '16px',
                      borderBottom: '1px solid rgba(75, 85, 99, 0.3)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                        />
                        <div>
                          <div style={{
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: '700',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}>
                            {user.name}
                          </div>
                          <div style={{
                            color: 'rgba(156, 163, 175, 0.8)',
                            fontSize: '12px',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ padding: '8px' }}>
                      {[
                        { icon: <User size={16} />, label: 'Profile' },
                        { icon: <Settings size={16} />, label: 'Settings' },
                        { icon: <Info size={16} />, label: 'About GAIPTV', action: () => { setIsProfileOpen(false); handleAboutClick(); } }
                      ].map((item, index) => (
                        <button
                          key={index}
                          onClick={item.action}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'rgba(156, 163, 175, 0.9)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textAlign: 'left',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}

                      {isAdmin && (
                        <button
                          onClick={() => setShowAdmin(true)}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'rgba(245, 158, 11, 0.9)',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            textAlign: 'left',
                            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                          }}
                        >
                          <Settings size={16} />
                          <span>Admin Panel</span>
                        </button>
                      )}
                      
                      <hr style={{ 
                        border: 'none', 
                        borderTop: '1px solid rgba(75, 85, 99, 0.3)', 
                        margin: '8px 0' 
                      }} />
                      
                      <button 
                        onClick={onLogout}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#ef4444',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          textAlign: 'left',
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
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
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)',
                  minWidth: '90px'
                }}
              >
                Sign In
              </button>
            )}
          </div>
        ) : (
          /* Mobile Right Side - Hamburger Menu */
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Mobile Notification Button */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                style={{
                  padding: '8px',
                  background: 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '8px',
                  color: 'rgba(156, 163, 175, 0.9)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  minWidth: '40px',
                  minHeight: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bell size={16} />
                {mockNotifications.some(n => n.unread) && (
                  <span style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '6px',
                    height: '6px',
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: '1px solid rgba(17, 24, 39, 0.9)',
                    animation: 'pulse 2s infinite'
                  }} />
                )}
              </button>

              {/* Mobile Notifications Dropdown */}
              {isNotificationOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  minWidth: '280px',
                  maxWidth: 'calc(100vw - 32px)',
                  maxHeight: 'calc(100vh - 100px)',
                  overflowY: 'auto',
                  background: 'rgba(17, 24, 39, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.1)',
                  zIndex: 1001
                }}>
                  <div style={{
                    padding: '16px',
                    borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      margin: 0,
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      Notifications
                    </h4>
                    {currentVideo?.isLive && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '11px',
                        color: '#ef4444',
                        fontWeight: '600',
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '3px 6px',
                        borderRadius: '4px'
                      }}>
                        <div style={{
                          width: '4px',
                          height: '4px',
                          background: '#ef4444',
                          borderRadius: '50%',
                          animation: 'pulse 2s infinite'
                        }} />
                        LIVE
                      </div>
                    )}
                  </div>
                  
                  {mockNotifications.map(notification => (
                    <div
                      key={notification.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
                        opacity: notification.unread ? 1 : 0.7,
                        background: notification.type === 'live' 
                          ? 'rgba(239, 68, 68, 0.05)' 
                          : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '6px'
                      }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: 'white',
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                          {notification.title}
                        </span>
                        {notification.unread && (
                          <div style={{
                            width: '6px',
                            height: '6px',
                            background: notification.type === 'live' ? '#ef4444' : '#8b5cf6',
                            borderRadius: '50%',
                            marginLeft: 'auto'
                          }} />
                        )}
                      </div>
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(156, 163, 175, 0.8)',
                        margin: '0 0 4px 0',
                        lineHeight: '1.4',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        {notification.message}
                      </p>
                      <span style={{
                        fontSize: '10px',
                        color: 'rgba(156, 163, 175, 0.6)',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}>
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                padding: '8px',
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(75, 85, 99, 0.4)',
                borderRadius: '8px',
                color: 'rgba(156, 163, 175, 0.9)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                minWidth: '40px',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          height: 'calc(100vh - 64px)',
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'rgba(17, 24, 39, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            borderTop: 'none',
            height: '100%',
            overflowY: 'auto',
            padding: '20px',
            animation: 'slideDown 0.3s ease'
          }}>
            
            {/* Mobile Search */}
            <div style={{
              marginBottom: '24px',
              background: 'rgba(17, 24, 39, 0.6)',
              borderRadius: '12px',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              overflow: 'hidden'
            }}>
              <input
                type="text"
                placeholder="Search videos, events, archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '16px',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'white',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              />
              <button
                onClick={() => onSearch(searchQuery)}
                style={{
                  position: 'absolute',
                  right: '28px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '10px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)'
                }}
              >
                <Search size={18} />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div style={{ marginBottom: '24px' }}>
              
              {/* GAIP Section */}
              <div style={{ marginBottom: '16px' }}>
                <button
                  onClick={() => setIsGaipDropdownOpen(!isGaipDropdownOpen)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: activeTab === 'GAIP' 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                      : 'rgba(17, 24, 39, 0.6)',
                    border: '1px solid rgba(75, 85, 99, 0.4)',
                    borderRadius: '12px',
                    color: activeTab === 'GAIP' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                  }}
                >
                  <Archive size={20} />
                  <span style={{ flex: 1 }}>GAIP</span>
                  <ChevronDown size={16} style={{ 
                    transform: isGaipDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} />
                </button>

                {/* GAIP Dropdown Items */}
                {isGaipDropdownOpen && (
                  <div style={{
                    marginTop: '8px',
                    marginLeft: '16px',
                    background: 'rgba(17, 24, 39, 0.4)',
                    borderRadius: '8px',
                    border: '1px solid rgba(75, 85, 99, 0.3)',
                    overflow: 'hidden'
                  }}>
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
                        style={{
                          width: '100%',
                          padding: '14px 16px',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: index < 2 ? '1px solid rgba(75, 85, 99, 0.2)' : 'none',
                          color: 'rgba(156, 163, 175, 0.9)',
                          fontSize: '15px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          textAlign: 'left',
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}
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

              {/* InsureTek */}
              <button
                onClick={() => {
                  handleTabClick('InsureTek', () => window.open('https://www.insuretek.org/dubai-2025/', '_blank'));
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginBottom: '12px',
                  background: activeTab === 'InsureTek' 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                    : 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  color: activeTab === 'InsureTek' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                <ExternalLink size={20} />
                <span>InsureTek</span>
              </button>

              {/* About */}
              <button
                onClick={handleAboutClick}
                style={{
                  width: '100%',
                  padding: '16px',
                  marginBottom: '12px',
                  background: activeTab === 'About' 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))'
                    : 'rgba(17, 24, 39, 0.6)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  color: activeTab === 'About' ? '#ffffff' : 'rgba(156, 163, 175, 0.9)',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                <Info size={20} />
                <span>About</span>
              </button>
            </div>

            {/* Mobile User Section */}
            {user ? (
              <div style={{
                background: 'rgba(17, 24, 39, 0.6)',
                border: '1px solid rgba(75, 85, 99, 0.4)',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                {/* User Info */}
                <div style={{
                  padding: '16px',
                  borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '700',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {user.name}
                    </div>
                    <div style={{
                      color: 'rgba(156, 163, 175, 0.8)',
                      fontSize: '13px',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                      {user.email}
                    </div>
                  </div>
                </div>

                {/* User Menu Items */}
                <div>
                  {[
                    { icon: <User size={18} />, label: 'Profile' },
                    { icon: <Settings size={18} />, label: 'Settings' },
                    { icon: <Info size={18} />, label: 'About GAIPTV', action: () => { setIsMobileMenuOpen(false); handleAboutClick(); } }
                  ].map((item, index) => (
                    <button
                      key={index}
                      onClick={item.action}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
                        color: 'rgba(156, 163, 175, 0.9)',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}

                  {isAdmin && (
                    <button
                      onClick={() => { setShowAdmin(true); setIsMobileMenuOpen(false); }}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
                        color: 'rgba(245, 158, 11, 0.9)',
                        fontSize: '15px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left',
                        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                      }}
                    >
                      <Settings size={18} />
                      <span>Admin Panel</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      textAlign: 'left',
                      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}
                  >
                    <LogOut size={18} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { onShowAuth(); setIsMobileMenuOpen(false); }}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
                }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* Close dropdowns when clicking outside (Desktop) */}
      {!isMobile && (isGaipDropdownOpen || isNotificationOpen || isProfileOpen) && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => {
            setIsGaipDropdownOpen(false);
            setIsNotificationOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}

      {/* Add animations and styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        input::placeholder {
          color: rgba(156, 163, 175, 0.7) !important;
        }
        
        /* Scrollbar styling for dropdowns */
        div::-webkit-scrollbar {
          width: 6px;
        }
        
        div::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.2);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.4);
          border-radius: 3px;
        }
        
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }

        /* Touch-friendly hover effects for mobile */
        @media (max-width: 768px) {
          button:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;