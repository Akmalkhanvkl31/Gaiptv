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
  Menu
} from 'lucide-react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import AdminRoute from './AdminRoute';
import './Header.css';
import logo from "../Assets/GaipLogo.png"; 

const Header = ({
  onSearch,
  onCategoryChange,
  selectedCategory,
  user,
  profile,
  onLogout,
  onShowAuth,
  onShowAbout,
  isGuestMode = false,
  currentVideo
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
    }
  };

  const handleLogoClick = () => {
    setActiveTab('GAIP');
    onCategoryChange('All');
  };

  const handleTabClick = (tabId, action) => {
    setActiveTab(tabId);
    if (action) action();
  };

  const handleGaipAction = (action) => {
    setActiveTab('GAIP');
    setIsGaipDropdownOpen(false);
    
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
        
        {/* Logo Section - Left */}
        <div 
          onClick={handleLogoClick}
          className="logo-section"
        >
          {/* Logo Icon */}
          <div className="logo-icon">
            <img src={logo} alt="GAIP Logo" />
          </div>
          
          {/* Logo Text */}
          <div className="logo-text">
            <h1>GAIPTV</h1>
            <p>Professional Broadcasting</p>
          </div>
        </div>

        {/* Navigation Tabs - Center */}
        <nav className="navigation-tabs">
          
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
                zIndex: 1000
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

        {/* Right Side Controls */}
        <div className="right-controls">
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button"
            >
              <Menu size={24} />
            </button>
          )}
          
          {/* Search Input */}
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
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(75, 85, 99, 0.3)';
                e.target.style.color = '#ffffff';
                e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(17, 24, 39, 0.6)';
                e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
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
                maxHeight: '400px',
                overflowY: 'auto',
                background: 'rgba(17, 24, 39, 0.98)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(75, 85, 99, 0.4)',
                borderRadius: '12px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 92, 246, 0.1)',
                zIndex: 1000
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
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = notification.type === 'live' 
                        ? 'rgba(239, 68, 68, 0.05)' 
                        : 'transparent';
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
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(75, 85, 99, 0.3)';
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(17, 24, 39, 0.6)';
                  e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
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
                  background: 'rgba(17, 24, 39, 0.98)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '12px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                  zIndex: 1000,
                  overflow: 'hidden'
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
                        onMouseEnter={(e) => {
                          e.target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))';
                          e.target.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'rgba(156, 163, 175, 0.9)';
                        }}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}

                    {isAdmin && (
                      <Link
                        to="/admin"
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
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                          textDecoration: 'none'
                        }}
                      >
                        <Settings size={16} />
                        <span>Admin Panel</span>
                      </Link>
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
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.target.style.color = '#ff6b6b';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#ef4444';
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
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
                e.target.style.background = 'linear-gradient(135deg, #9333ea, #2563eb)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
                e.target.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(isGaipDropdownOpen || isNotificationOpen || isProfileOpen) && (
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

      {showAdmin && (
        <AdminRoute onClose={() => setShowAdmin(false)} />
      )}

      {/* Add pulse animation for notifications */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
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
      `}</style>
    </header>
  );
};

export default Header;
