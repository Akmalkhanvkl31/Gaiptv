import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Users, 
  Star, 
  TrendingUp, 
  Radio,
  ArrowRight,
  Eye,
  Calendar,
  Award,
  Shield,
  Zap,
  CheckCircle
} from 'lucide-react';
import AdBanner from './AdBanner';
import LivePlayer from './LivePlayer';
import PlayerOverlay from './PlayerOverlay';
import styles from './Styles';

const GuestLanding = ({ onSignIn, onSignUp, liveStreams, featuredVideos, news }) => {
  const [selectedLiveStream, setSelectedLiveStream] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    // Auto-select the first live stream
    if (liveStreams && liveStreams.length > 0) {
      setSelectedLiveStream(liveStreams[0]);
    }
  }, [liveStreams]);

  const handleWatchLive = () => {
    setIsPlaying(true);
  };

  const handleGetStarted = () => {
    onSignUp();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Hero Section with Live Stream */}
      <div style={{
        position: 'relative',
        padding: '60px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
        borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left: Hero Content */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <div style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.4)'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                <Radio size={12} />
                LIVE NOW
              </div>
              <span style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)'
              }}>
                {selectedLiveStream?.viewers?.toLocaleString()} watching
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: '700',
              marginBottom: '20px',
              background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1'
            }}>
              Professional Insurance Broadcasting
            </h1>

            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              Join thousands of insurance professionals watching live events, 
              accessing premium content, and staying ahead of industry trends.
            </p>

            {/* Live Stream Info */}
            {selectedLiveStream && (
              <div style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(15, 15, 35, 0.3))',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                marginBottom: '32px',
                backdropFilter: 'blur(20px)'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'white'
                }}>
                  {selectedLiveStream.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '16px'
                }}>
                  {selectedLiveStream.description}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Users size={12} />
                    {selectedLiveStream.viewers?.toLocaleString()} viewers
                  </span>
                  <span>{selectedLiveStream.category}</span>
                  <span>{selectedLiveStream.speaker}</span>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <button
                onClick={handleGetStarted}
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
                }}
              >
                Get Started Free
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.6)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={16} color="#22c55e" />
                Enterprise Security
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Award size={16} color="#f59e0b" />
                Industry Certified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} color="#8b5cf6" />
                50,000+ Professionals
              </div>
            </div>
          </div>

          {/* Right: Live Stream Preview */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: '#000',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)',
            border: '2px solid rgba(139, 92, 246, 0.4)'
          }}>
            {selectedLiveStream ? (
              isPlaying ? (
                <>
                  <LivePlayer video={selectedLiveStream} autoplay={true} />
                  <PlayerOverlay 
                    video={selectedLiveStream}
                    isLive={true}
                    viewers={selectedLiveStream.viewers}
                    showCaptions={true}
                    showPlayerControls={false}
                    isMainPlayer={false}
                    playerSize="standard"
                  />
                  {showOverlay && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0, 0, 0, 0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      textAlign: 'center',
                      borderRadius: '20px',
                      zIndex: 20
                    }}>
                      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Access Exclusive Content</h2>
                      <p style={{ fontSize: '16px', marginBottom: '30px' }}>Sign in or create an account to continue watching.</p>
                      <div style={{ display: 'flex', gap: '20px' }}>
                        <button onClick={onSignIn} style={{ ...styles.button, background: '#8b5cf6', padding: '12px 24px' }}>Sign In</button>
                        <button onClick={onSignUp} style={{ ...styles.button, background: 'transparent', border: '1px solid #8b5cf6', padding: '12px 24px' }}>Sign Up</button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Thumbnail Preview */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${selectedLiveStream.thumbnail})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>

                </>
              )
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                No live streams available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advertisement Section */}
      <div style={{
        padding: '40px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <AdBanner 
          user={null}
          position="guest-banner"
        />
      </div>

      {/* Featured Content Preview */}
      <div style={{
        padding: '60px 24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h2 style={{
            fontSize: '36px',
            fontWeight: '700',
            marginBottom: '16px',
            background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Premium Content Library
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Access hundreds of expert-led sessions, industry insights, and professional development content
          </p>
        </div>

        {/* Featured Videos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          {featuredVideos?.slice(0, 6).map((video, index) => (
            <div
              key={video.id}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                transform: hoveredVideo === video.id ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: hoveredVideo === video.id 
                  ? '0 25px 50px rgba(139, 92, 246, 0.3)' 
                  : '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={() => setHoveredVideo(video.id)}
              onMouseLeave={() => setHoveredVideo(null)}
              onClick={handleGetStarted}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative',
                aspectRatio: '16/9',
                background: '#2a2a2a',
                overflow: 'hidden'
              }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    transform: hoveredVideo === video.id ? 'scale(1.05)' : 'scale(1)'
                  }}
                />

                {/* Premium Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Star size={10} fill="white" />
                  PREMIUM
                </div>

                {/* Duration */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.8)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  color: 'white',
                  fontWeight: '500'
                }}>
                  {video.duration}
                </div>

                {/* Play Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))',
                  opacity: hoveredVideo === video.id ? 1 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'opacity 0.3s ease'
                }}>
                  <div style={{
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Play size={20} color="white" fill="white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '20px' }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '8px',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {video.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '12px',
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {video.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  <span>{video.speaker?.split(',')[0]}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Eye size={12} />
                    {video.views?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to See More */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleGetStarted}
            style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '12px',
              color: '#8b5cf6',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #8b5cf6, #3b82f6)';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))';
              e.target.style.color = '#8b5cf6';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            View All Premium Content
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Industry News Preview */}
      <div style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(59, 130, 246, 0.02))',
        borderTop: '1px solid rgba(139, 92, 246, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center'
          }}>
            {/* Left: News Content */}
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                marginBottom: '16px',
                color: 'white'
              }}>
                Stay Ahead with Industry News
              </h2>
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '32px',
                lineHeight: '1.6'
              }}>
                Get real-time updates on regulatory changes, market trends, 
                and breakthrough innovations in the insurance industry.
              </p>

              {/* News Items */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {news?.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    style={{
                      padding: '16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={handleGetStarted}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(139, 92, 246, 0.1)';
                      e.target.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        padding: '2px 8px',
                        background: item.type === 'breaking' 
                          ? 'rgba(239, 68, 68, 0.2)' 
                          : item.type === 'update' 
                          ? 'rgba(59, 130, 246, 0.2)' 
                          : 'rgba(156, 163, 175, 0.2)',
                        color: item.type === 'breaking' 
                          ? '#ef4444' 
                          : item.type === 'update' 
                          ? '#3b82f6' 
                          : '#9ca3af',
                        borderRadius: '6px',
                        fontSize: '10px',
                        fontWeight: '600'
                      }}>
                        {item.type.toUpperCase()}
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.6)'
                      }}>
                        {item.date}
                      </span>
                    </div>
                    
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'white',
                      marginBottom: '6px'
                    }}>
                      {item.title}
                    </h4>
                    
                    <p style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {item.content}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGetStarted}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '10px',
                  color: '#8b5cf6',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Access All News & Updates
                <TrendingUp size={16} />
              </button>
            </div>

            {/* Right: Stats & Features */}
            <div>
              <div style={{
                padding: '32px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                borderRadius: '20px',
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '24px',
                  textAlign: 'center'
                }}>
                  Join the Professional Community
                </h3>

                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#8b5cf6',
                      marginBottom: '4px'
                    }}>
                      50,000+
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      Active Professionals
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#22c55e',
                      marginBottom: '4px'
                    }}>
                      500+
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      Premium Videos
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#ef4444',
                      marginBottom: '4px'
                    }}>
                      24/7
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      Live Coverage
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#f59e0b',
                      marginBottom: '4px'
                    }}>
                      95%
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      Satisfaction Rate
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {[
                    { icon: CheckCircle, text: 'Unlimited access to premium content' },
                    { icon: Zap, text: 'Real-time industry updates' },
                    { icon: Award, text: 'Professional certifications' },
                    { icon: Shield, text: 'Enterprise-grade security' }
                  ].map((feature, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '14px'
                      }}
                    >
                      <feature.icon size={16} color="#8b5cf6" />
                      {feature.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div style={{
        padding: '80px 24px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
        borderTop: '1px solid rgba(139, 92, 246, 0.2)'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '16px',
            background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Ready to Elevate Your Career?
          </h2>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Join thousands of insurance professionals who trust GAIPTV for their 
            continuing education and professional development needs.
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <button
              onClick={handleGetStarted}
              style={{
                padding: '20px 40px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
              }}
            >
              Start Your Free Trial
              <ArrowRight size={20} />
            </button>

          </div>

          <p style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            No credit card required • Cancel anytime • Join 50,000+ professionals
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .content-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-buttons { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

export default GuestLanding;
