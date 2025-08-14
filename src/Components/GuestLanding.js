import React, { useState, useEffect, useRef } from 'react';
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
  Info,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  LogOut
} from 'lucide-react';

// Enhanced Supabase Configuration
const createSupabaseClient = () => {
  // Simulated Supabase client for demo
  return {
    from: (table) => ({
      select: (columns) => ({
        eq: (column, value) => Promise.resolve({ data: [], error: null }),
        order: (column, options) => Promise.resolve({ data: [], error: null }),
        limit: (count) => Promise.resolve({ data: [], error: null })
      }),
      insert: (data) => Promise.resolve({ data: [], error: null }),
      update: (data) => Promise.resolve({ data: [], error: null }),
      upsert: (data) => Promise.resolve({ data: [], error: null })
    }),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signUp: (credentials) => Promise.resolve({ data: null, error: null }),
      signInWithPassword: (credentials) => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: (callback) => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  };
};

const supabase = createSupabaseClient();

// Enhanced Live Player with RGB Effects
const EnhancedLivePlayer = React.forwardRef(({
  video,
  isMainPlayer = true,
  isMiniPlayer = false,
  muted = false,
  autoplay = false,
  playerSize = 'standard',
  showRGBEffect = true
}, ref) => {
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsMuted(muted);
  }, [muted]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  if (!video) return null;

  return (
    <div className="live-player-wrapper" style={{ position: 'relative' }}>
      {/* RGB Background Effect */}
      {showRGBEffect && (
        <div 
          className="rgb-glow-effect"
          style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            right: '-20px',
            bottom: '-20px',
            background: `
              radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)
            `,
            borderRadius: '40px',
            filter: 'blur(15px)',
            animation: 'rgbAnimation 8s ease-in-out infinite',
            zIndex: -1,
            opacity: video?.isLive ? 1 : 0.5
          }}
        />
      )}

      {/* Floating RGB Particles */}
      {showRGBEffect && video?.isLive && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: [
                  'rgba(139, 92, 246, 0.8)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(236, 72, 153, 0.8)',
                  'rgba(16, 185, 129, 0.8)'
                ][Math.floor(Math.random() * 4)],
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floatingParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
                zIndex: -1,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </>
      )}

      {/* Main Player Container */}
      <div 
        ref={ref} 
        className="live-player-container"
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: playerSize === 'theater' ? '0' : '20px',
          overflow: 'hidden',
          background: '#000',
          border: video?.isLive ? '2px solid rgba(239, 68, 68, 0.5)' : '2px solid rgba(139, 92, 246, 0.3)',
          boxShadow: video?.isLive 
            ? '0 0 40px rgba(239, 68, 68, 0.4)' 
            : '0 0 40px rgba(139, 92, 246, 0.3)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Video iframe */}
        <iframe
          src={video?.isLive 
            ? "https://iframes.5centscdn.in/5centscdn/hls/skin1/kygt6dlsg6zh7rmq/aHR0cHM6Ly80M3dyempucHFveGUtaGxzLWxpdmUud21uY2RuLm5ldC9HQUlQL1RWL3BsYXlsaXN0Lm0zdTg=?showcv=true&title=GAIP/TV"
            : video.videoSrc
          }
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            border: 'none'
          }}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Live indicator */}
        {video?.isLive && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            padding: '6px 12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '700',
            color: 'white',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)',
            animation: 'livePulse 2s infinite',
            zIndex: 10
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              background: 'white',
              borderRadius: '50%',
              animation: 'pulse 1s infinite'
            }} />
            LIVE
          </div>
        )}

        {/* Viewer count for live streams */}
        {video?.isLive && video.viewers && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '6px 12px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            fontWeight: '600',
            color: 'white',
            backdropFilter: 'blur(10px)',
            zIndex: 10
          }}>
            <Eye size={14} />
            {video.viewers.toLocaleString()}
          </div>
        )}

        {/* Mini player controls */}
        {isMiniPlayer && (
          <>
            <button 
              onClick={handleMuteToggle}
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                padding: '8px',
                background: isMuted ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 10,
                backdropFilter: 'blur(10px)'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes rgbAnimation {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
            filter: blur(15px) hue-rotate(0deg);
          }
          25% { 
            transform: rotate(90deg) scale(1.1);
            filter: blur(20px) hue-rotate(90deg);
          }
          50% { 
            transform: rotate(180deg) scale(0.9);
            filter: blur(25px) hue-rotate(180deg);
          }
          75% { 
            transform: rotate(270deg) scale(1.05);
            filter: blur(20px) hue-rotate(270deg);
          }
        }

        @keyframes floatingParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.7;
          }
          33% { 
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 1;
          }
          66% { 
            transform: translateY(-10px) translateX(-15px) scale(0.8);
            opacity: 0.8;
          }
        }

        @keyframes livePulse {
          0%, 100% {
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 8px 25px rgba(239, 68, 68, 0.8);
            transform: scale(1.05);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .live-player-wrapper:hover .rgb-glow-effect {
          animation-duration: 4s;
          opacity: ${video?.isLive ? 1 : 0.8};
        }
      `}</style>
    </div>
  );
});

// Enhanced Sidebar Component
const EnhancedSidebar = ({ news, onNewsClick, user, onAdBannerClose }) => {
  const [hoveredNewsId, setHoveredNewsId] = useState(null);
  const [activeTab, setActiveTab] = useState('news');

  const getNewsIcon = (type) => {
    switch (type) {
      case 'breaking':
        return <AlertCircle size={16} style={{ color: '#ef4444' }} />;
      case 'update':
        return <TrendingUp size={16} style={{ color: '#3b82f6' }} />;
      default:
        return <Clock size={16} style={{ color: '#9ca3af' }} />;
    }
  };

  // Mock user data
  const userLearningData = user ? {
    weeklyGoal: 5,
    completed: 3,
    streak: 7,
    certificates: 2
  } : null;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '20px',
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
      color: 'white',
      overflowY: 'auto'
    }}>
      {/* Tab Navigation for Authenticated Users */}
      {user && (
        <div style={{
          display: 'flex',
          marginBottom: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          padding: '4px'
        }}>
          {[
            { id: 'news', label: 'News', icon: TrendingUp },
            { id: 'learning', label: 'Learning', icon: BookOpen }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' 
                  : 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* News Section */}
      {(!user || activeTab === 'news') && (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'white'
            }}>
              <TrendingUp size={20} />
              News & Updates
            </h3>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.3s ease'
            }}>
              <RefreshCw size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {news.map(newsItem => (
              <div 
                key={newsItem.id} 
                style={{
                  padding: '16px',
                  background: hoveredNewsId === newsItem.id 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))'
                    : 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  transform: hoveredNewsId === newsItem.id ? 'translateX(8px)' : 'translateX(0)'
                }}
                onMouseEnter={() => setHoveredNewsId(newsItem.id)}
                onMouseLeave={() => setHoveredNewsId(null)}
                onClick={(e) => onNewsClick && onNewsClick(newsItem, e)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  {getNewsIcon(newsItem.type)}
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderRadius: '6px',
                    fontWeight: '600',
                    background: newsItem.type === 'breaking' 
                      ? 'rgba(239, 68, 68, 0.2)' 
                      : newsItem.type === 'update'
                      ? 'rgba(59, 130, 246, 0.2)'
                      : 'rgba(156, 163, 175, 0.2)',
                    color: newsItem.type === 'breaking' 
                      ? '#ef4444' 
                      : newsItem.type === 'update'
                      ? '#3b82f6'
                      : '#9ca3af'
                  }}>
                    {newsItem.date}
                  </span>
                </div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: 'white',
                  lineHeight: '1.3'
                }}>
                  {newsItem.title}
                </h4>
                <p style={{
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.4',
                  margin: 0
                }}>
                  {newsItem.content.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Learning Section for Authenticated Users */}
      {user && activeTab === 'learning' && (
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'white'
          }}>
            <BookOpen size={20} />
            Learning Progress
          </h3>

          {/* Weekly Goal */}
          <div style={{
            marginBottom: '20px',
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
            borderRadius: '12px',
            border: '1px solid rgba(139, 92, 246, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'white' }}>
                Weekly Goal
              </span>
              <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: '600' }}>
                {userLearningData.completed}/{userLearningData.weeklyGoal}
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(userLearningData.completed / userLearningData.weeklyGoal) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                borderRadius: '3px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Learning Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#22c55e', marginBottom: '4px' }}>
                {userLearningData.streak}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Day Streak
              </div>
            </div>
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                {userLearningData.certificates}
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Certificates
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Stats */}
      <div style={{
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
        borderRadius: '16px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        marginBottom: '20px'
      }}>
        <h4 style={{
          color: 'white',
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Zap size={16} style={{ color: '#8b5cf6' }} />
          Platform Stats
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'Live Viewers', value: '12,847', color: '#22c55e' },
            { label: 'Total Videos', value: '127', color: 'white' },
            { label: "Today's Views", value: '25.3K', color: '#3b82f6' }
          ].map((stat, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{stat.label}</span>
              <span style={{ color: stat.color, fontWeight: '600' }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ad Banner for Sidebar */}
      <div style={{
        padding: '16px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
        borderRadius: '12px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}>
        <button
          onClick={onAdBannerClose}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.5)',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={12} />
        </button>
        
        <h4 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '8px'
        }}>
          Upgrade to Premium
        </h4>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '12px',
          lineHeight: '1.4'
        }}>
          Get ad-free viewing and exclusive content
        </p>
        <button style={{
          width: '100%',
          padding: '8px 16px',
          background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Start Free Trial
        </button>
      </div>
    </div>
  );
};

// Enhanced Guest Landing Component
const EnhancedGuestLanding = () => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  // Mock data
  const mockData = {
    liveStreams: [{
      id: 'live-1',
      title: 'Live Insurance Summit 2025',
      isLive: true,
      viewers: 12847,
      description: 'Live coverage of the annual insurance innovation summit featuring keynote speakers from major insurance companies.',
      category: 'Live Events',
      speaker: 'Insurance Industry Leaders',
      duration: 'LIVE',
      views: 15420,
      uploadDate: 'Broadcasting Now'
    }],
    featuredVideos: [
      {
        id: '1',
        title: 'AI in Insurance: Transforming Claims Processing',
        description: 'Discover how artificial intelligence is revolutionizing insurance claims processing.',
        category: 'Technology',
        speaker: 'Dr. Sarah Mitchell',
        duration: '45:30',
        views: 8500,
        uploadDate: '2 days ago',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop'
      },
      {
        id: '2',
        title: 'Regulatory Compliance in Digital Insurance',
        description: 'Understanding the latest compliance requirements for digital insurance platforms.',
        category: 'Compliance',
        speaker: 'Michael Chen',
        duration: '32:15',
        views: 6200,
        uploadDate: '1 week ago',
        thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=450&fit=crop'
      }
    ],
    news: [
      {
        id: 1,
        type: 'regular',
        title: 'Insurance AI Summit Goes Live',
        content: 'Join industry leaders discussing the future of AI in insurance.',
        date: 'Today'
      },
      {
        id: 2,
        type: 'breaking',
        title: 'Cyber Insurance Claims Surge 340%',
        content: '340% increase in cyber insurance claims following recent cyber attacks.',
        date: 'Breaking'
      }
    ]
  };

  useEffect(() => {
    // Initialize with live stream
    if (mockData.liveStreams?.length > 0) {
      setCurrentVideo(mockData.liveStreams[0]);
    }
  }, []);

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  const handleNewsClick = (newsItem) => {
    console.log('News clicked:', newsItem);
  };

  // Locked Video Card Component
  const LockedVideoCard = ({ video, onLoginClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
          borderRadius: '16px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s ease',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
          boxShadow: isHovered 
            ? '0 25px 50px rgba(139, 92, 246, 0.3)' 
            : '0 10px 25px rgba(0, 0, 0, 0.2)',
          minHeight: '300px',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onLoginClick}
      >
        {/* Thumbnail with blur effect */}
        <div style={{
          position: 'relative',
          height: '180px',
          overflow: 'hidden'
        }}>
          <img
            src={video.thumbnail}
            alt={video.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'blur(8px) brightness(0.7)',
              transition: 'filter 0.3s ease'
            }}
          />
          
          {/* Lock overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <div style={{
              padding: '16px',
              background: 'rgba(139, 92, 246, 0.2)',
              borderRadius: '50%',
              marginBottom: '8px',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.3s ease'
            }}>
              <Lock size={32} color="white" />
            </div>
            <span style={{
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              textAlign: 'center'
            }}>
              Sign in to watch
            </span>
          </div>

          {/* Duration badge */}
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '4px 8px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Clock size={12} />
            {video.duration}
          </div>
        </div>

        {/* Card content */}
        <div style={{
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            {video.title}
          </h3>
          
          <p style={{
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '12px',
            lineHeight: '1.4',
            flex: 1
          }}>
            {video.description}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '12px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Eye size={12} />
              {video.views?.toLocaleString()} views
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={12} />
              {video.uploadDate}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              padding: '4px 8px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#8b5cf6',
              border: '1px solid rgba(139, 92, 246, 0.4)'
            }}>
              {video.category}
            </span>
            
            <span style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <User size={12} />
              {video.speaker?.split(',')[0]}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '16px 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
            }}>
              <Radio size={20} color="white" />
            </div>
            <div>
              <h1 style={{
                fontSize: '20px',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                GAIPTV
              </h1>
              <p style={{
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0
              }}>
                Professional Broadcasting
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button style={{
              padding: '8px 16px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Info size={16} />
              About
            </button>
          </nav>

          {/* Right side controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Search */}
            <div style={{
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <input
                type="text"
                placeholder="Search content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '200px',
                  padding: '8px 12px 8px 40px',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <Search size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255, 255, 255, 0.5)'
              }} />
            </div>

            {/* Notifications */}
            <button style={{
              padding: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
            </button>

            {/* Mobile menu toggle */}
            <button 
              onClick={() => setShowSidebar(!showSidebar)}
              style={{
                padding: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                display: 'none'
              }}
              className="mobile-menu-button"
            >
              <Menu size={16} />
            </button>

            {/* Auth buttons */}
            <button
              onClick={handleLoginClick}
              style={{
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.4)'
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Main content layout */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 88px)' }}>
        {/* Main content area */}
        <div style={{
          flex: 1,
          padding: '24px',
          maxWidth: showSidebar ? 'calc(100% - 340px)' : '100%'
        }}>
          {/* Welcome banner */}
          <div style={{
            marginBottom: '32px',
            padding: '32px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background animation */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: `
                radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
              `,
              animation: 'backgroundShift 20s ease-in-out infinite',
              zIndex: -1
            }} />

            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome to GAIPTV
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              Professional insurance broadcasting platform with live events, expert insights, and industry analysis.
            </p>
            
            {/* Live event highlight */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.2)',
              borderRadius: '20px',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ef4444',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                background: '#ef4444',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              Live Event: Insurance AI Summit 2025
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={handleLoginClick}
                style={{
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Start Free Trial
                <ArrowRight size={18} />
              </button>
              <button
                style={{
                  padding: '14px 28px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Live Player Section */}
          {currentVideo && (
            <div style={{
              marginBottom: '32px',
              background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid rgba(139, 92, 246, 0.2)'
            }}>
              <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: 'white'
                  }}>
                    {currentVideo.title}
                  </h2>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    flexWrap: 'wrap'
                  }}>
                    <span>{currentVideo.speaker}</span>
                    <span>•</span>
                    <span>{currentVideo.views?.toLocaleString()} views</span>
                    {currentVideo.isLive && (
                      <>
                        <span>•</span>
                        <span style={{
                          color: '#ef4444',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <div style={{
                            width: '6px',
                            height: '6px',
                            background: '#ef4444',
                            borderRadius: '50%',
                            animation: 'pulse 2s infinite'
                          }} />
                          LIVE • {currentVideo.viewers?.toLocaleString()} watching
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Enhanced Live Player with RGB effects */}
              <EnhancedLivePlayer
                video={currentVideo}
                isMainPlayer={true}
                autoplay={false}
                playerSize="standard"
                showRGBEffect={true}
              />

              {/* Video description */}
              <div style={{
                marginTop: '20px',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  lineHeight: '1.6',
                  fontSize: '14px',
                  margin: 0
                }}>
                  {currentVideo.description}
                </p>
              </div>
            </div>
          )}

          {/* Premium content section */}
          <div style={{
            marginBottom: '32px'
          }}>
            <div style={{
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px'
              }}>
                Premium Professional Content
              </h2>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.6'
              }}>
                Access exclusive videos, expert insights, and industry analysis. Sign up for free to unlock our complete library.
              </p>
            </div>

            {/* Locked video grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '32px'
            }}>
              {mockData.featuredVideos.map(video => (
                <LockedVideoCard 
                  key={video.id} 
                  video={video} 
                  onLoginClick={handleLoginClick}
                />
              ))}
            </div>

            {/* Call to action */}
            <div style={{
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
              borderRadius: '20px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '12px'
              }}>
                Ready to unlock premium content?
              </h3>
              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                Join thousands of insurance professionals advancing their careers with our premium content library.
              </p>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={handleLoginClick}
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
                    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  Start Free Trial
                  <ArrowRight size={18} />
                </button>
                
                <button 
                  onClick={handleLoginClick}
                  style={{
                    padding: '16px 32px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Already have an account?
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div style={{
          width: showSidebar ? '340px' : '0',
          flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
          borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
          position: 'sticky',
          top: '88px',
          height: 'calc(100vh - 88px)',
          overflowY: 'auto',
          overflow: showSidebar ? 'visible' : 'hidden',
          transition: 'all 0.3s ease'
        }}>
          {showSidebar && (
            <EnhancedSidebar
              news={mockData.news}
              onNewsClick={handleNewsClick}
              user={user}
              onAdBannerClose={() => {}}
            />
          )}
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            padding: '32px',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '50%',
                color: '#ef4444',
                cursor: 'pointer',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
              }}>
                <Lock size={28} color="white" />
              </div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '8px'
              }}>
                Premium Content Access
              </h3>
              
              <p style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.7)',
                lineHeight: '1.5'
              }}>
                Sign up for free to access our complete library of professional insurance content, 
                including expert videos, certifications, and exclusive events.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <button style={{
                width: '100%',
                padding: '14px 20px',
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
                justifyContent: 'center',
                gap: '8px'
              }}>
                Create Free Account
                <ArrowRight size={18} />
              </button>
              
              <button style={{
                width: '100%',
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Sign In
              </button>
            </div>
            
            <button
              onClick={() => setShowAuthModal(false)}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '12px',
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Continue as guest
            </button>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes backgroundShift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedGuestLanding;
