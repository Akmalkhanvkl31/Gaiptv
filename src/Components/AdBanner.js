import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Star, 
  ArrowRight, 
  Play,
  Shield,
  Award,
  TrendingUp,
  Users,
  Calendar,
  BookOpen
} from 'lucide-react';

const AdBanner = ({ user, position = 'below-player', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showCloseHint, setShowCloseHint] = useState(false);

  // Mock advertisement data - would come from ad server in real implementation
  const ads = {
    'below-player': [
      {
        id: 'ad-1',
        type: 'premium-upgrade',
        title: 'Upgrade to GAIPTV Premium',
        subtitle: 'Ad-free viewing • Exclusive content • Advanced analytics',
        description: 'Join thousands of insurance professionals advancing their careers with premium content.',
        cta: 'Start Free Trial',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop',
        gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        features: ['Ad-free Experience', 'Premium Content', 'Advanced Analytics', 'Priority Support'],
        showToGuests: true,
        showToUsers: !user || user.subscription?.plan === 'Free'
      },
      {
        id: 'ad-2',
        type: 'conference',
        title: 'InsureTek Dubai 2025',
        subtitle: 'Middle East\'s Premier Insurance Technology Conference',
        description: 'Connect with industry leaders and discover cutting-edge solutions.',
        cta: 'Register Now',
        ctaSecondary: 'Learn More',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
        gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
        badge: 'Early Bird 50% Off',
        showToGuests: true,
        showToUsers: true
      },
      {
        id: 'ad-3',
        type: 'certification',
        title: 'Professional Insurance Certification',
        subtitle: 'Advance your career with industry-recognized credentials',
        description: 'Get certified in AI, Risk Management, and Digital Insurance.',
        cta: 'Start Learning',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
        gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
        stats: ['95% Pass Rate', '10,000+ Certified', 'Industry Recognized'],
        showToGuests: true,
        showToUsers: true
      }
    ],
    'sidebar': [
      {
        id: 'sidebar-ad-1',
        type: 'compact-premium',
        title: 'Go Premium',
        subtitle: 'Unlock exclusive content',
        cta: 'Upgrade',
        gradient: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        showToGuests: true,
        showToUsers: !user || user.subscription?.plan === 'Free'
      },
      {
        id: 'sidebar-ad-2',
        type: 'webinar',
        title: 'Live Webinar',
        subtitle: 'AI in Claims Processing',
        description: 'Join 500+ professionals',
        cta: 'Register Free',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=150&fit=crop',
        gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
        time: 'Tomorrow 2:00 PM EST',
        showToGuests: true,
        showToUsers: true
      },
      {
        id: 'sidebar-ad-3',
        type: 'course',
        title: 'New Course',
        subtitle: 'Risk Assessment Mastery',
        description: '8 hours • Certificate included',
        cta: 'Enroll Now',
        gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        price: user ? 'Free for Premium' : '$99',
        showToGuests: true,
        showToUsers: true
      }
    ]
  };

  const currentAds = ads[position] || [];
  const visibleAds = currentAds.filter(ad => {
    if (!user && !ad.showToGuests) return false;
    if (user && !ad.showToUsers) return false;
    return true;
  });

  // Auto-rotate ads every 10 seconds
  useEffect(() => {
    if (visibleAds.length > 1) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % visibleAds.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [visibleAds.length]);

  // Show close hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloseHint(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleAdClick = (ad) => {
    // Track ad click analytics
    console.log('Ad clicked:', ad.id);
    
    // Handle different ad types
    switch (ad.type) {
      case 'premium-upgrade':
        // Redirect to upgrade page
        console.log('Redirecting to premium upgrade');
        break;
      case 'conference':
        // Open external link
        window.open('https://www.insuretek.org/dubai-2025/', '_blank');
        break;
      case 'certification':
        // Navigate to certification page
        console.log('Redirecting to certification');
        break;
      default:
        console.log('Generic ad click');
    }
  };

  if (!isVisible || visibleAds.length === 0) {
    return null;
  }

  const currentAd = visibleAds[currentAdIndex];

  // Below Player Ad Layout
  if (position === 'below-player') {
    return (
      <div style={{
        margin: '24px 0',
        padding: '24px',
        background: currentAd.gradient || 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.6s ease-out'
      }}
      onClick={() => handleAdClick(currentAd)}
      onMouseEnter={() => setShowCloseHint(true)}
      className="interactive-hover"
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
        opacity: 0.3
      }} />

      {/* Close Button */}
      {showCloseHint && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10,
            backdropFilter: 'blur(10px)'
          }}
          title="Close ad"
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.8)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.5)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <X size={16} />
        </button>
      )}

      {/* Badge */}
      {currentAd.badge && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(239, 68, 68, 0.9)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: 5,
          animation: 'pulse 2s infinite'
        }}>
          {currentAd.badge}
        </div>
      )}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Ad Image */}
        {currentAd.image && (
          <div style={{
            width: '200px',
            height: '120px',
            borderRadius: '12px',
            overflow: 'hidden',
            flexShrink: 0,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)'
          }}>
            <img
              src={currentAd.image}
              alt={currentAd.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Ad Content */}
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
          }}>
            {currentAd.title}
          </h3>

          <p style={{
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '12px',
            fontWeight: '500',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}>
            {currentAd.subtitle}
          </p>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '20px',
            lineHeight: '1.5'
          }}>
            {currentAd.description}
          </p>

          {/* Features or Stats */}
          {currentAd.features && (
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              {currentAd.features.map((feature, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: 'white',
                    borderRadius: '50%'
                  }} />
                  {feature}
                </div>
              ))}
            </div>
          )}

          {currentAd.stats && (
            <div style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '20px'
            }}>
              {currentAd.stats.map((stat, index) => (
                <div key={index} style={{
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'white',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}>
                    {stat}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdClick(currentAd);
              }}
              style={{
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '10px',
                color: '#1f2937',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
            >
              {currentAd.cta}
              <ArrowRight size={16} />
            </button>

            {currentAd.ctaSecondary && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAdClick(currentAd);
                }}
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {currentAd.ctaSecondary}
                <ExternalLink size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ad Pagination Dots */}
      {visibleAds.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          gap: '6px',
          zIndex: 10
        }}>
          {visibleAds.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentAdIndex(index);
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentAdIndex 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
    );
  }

  // Sidebar Ad Layout
  if (position === 'sidebar') {
    return (
      <div style={{
        marginTop: '20px',
        padding: '16px',
        background: currentAd.gradient || 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.6s ease-out'
      }}
      onClick={() => handleAdClick(currentAd)}
      className="interactive-hover"
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)`,
        opacity: 0.4
      }} />

      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          background: 'rgba(0, 0, 0, 0.5)',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          fontSize: '12px',
          zIndex: 10,
          opacity: 0.7
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '1';
          e.target.style.background = 'rgba(239, 68, 68, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = '0.7';
          e.target.style.background = 'rgba(0, 0, 0, 0.5)';
        }}
      >
        <X size={12} />
      </button>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Sidebar Ad Image */}
        {currentAd.image && (
          <div style={{
            width: '100%',
            height: '80px',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}>
            <img
              src={currentAd.image}
              alt={currentAd.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Content */}
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '6px',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        }}>
          {currentAd.title}
        </h4>

        <p style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '8px',
          fontWeight: '500'
        }}>
          {currentAd.subtitle}
        </p>

        {currentAd.description && (
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '12px',
            lineHeight: '1.4'
          }}>
            {currentAd.description}
          </p>
        )}

        {/* Time or Price */}
        {currentAd.time && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '12px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.8)'
          }}>
            <Calendar size={12} />
            {currentAd.time}
          </div>
        )}

        {currentAd.price && (
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'white',
            marginBottom: '12px'
          }}>
            {currentAd.price}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdClick(currentAd);
          }}
          style={{
            width: '100%',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '8px',
            color: '#1f2937',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'white';
            e.target.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {currentAd.cta}
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Ad Pagination Dots for Sidebar */}
      {visibleAds.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 10
        }}>
          {visibleAds.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentAdIndex(index);
              }}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentAdIndex 
                  ? 'rgba(255, 255, 255, 0.9)' 
                  : 'rgba(255, 255, 255, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
    );
  }

  return null;
};

export default AdBanner;