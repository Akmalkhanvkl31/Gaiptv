import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Video, 
  FileText, 
  Save, 
  Edit,
  Trash2,
  Plus,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Eye,
  PlayCircle,
  Radio,
  Clock,
  CheckCircle,
  AlertCircle,
  Monitor,
  Globe,
  Shield,
  Search,
  Filter,
  Download,
  Mail,
  Bell,
  Star,
  TrendingUp,
  Award,
  Zap,
  Database,
  Activity,
  DollarSign,
  UserCheck,
  VideoIcon,
  MessageSquare,
  Headphones,
  Tv,
  MoreVertical,
  RefreshCw,
  ExternalLink,
  Building2,
  MapPin,
  Phone
} from 'lucide-react';

const SettingsManager = () => {
  return (
    <div>
      <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
        Platform Settings
      </h3>
      <div style={{ color: 'white' }}>
        Settings management interface will be here.
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [showAdmin, setShowAdmin] = useState(true);
  
  // Mock user data - replace with actual auth context
  const user = {
    user_metadata: {
      role: 'Admin',
      full_name: 'John Doe',
      is_admin: true
    },
    email: 'admin@gaiptv.com'
  };
  
  // Content Management States
  const [videos, setVideos] = useState([
    { id: 1, title: 'AI in Insurance: Transforming Claims Processing', category: 'Technology', views: 8500, status: 'published', isLive: false, duration: '45:30' },
    { id: 2, title: 'Regulatory Compliance in Digital Insurance', category: 'Compliance', views: 6200, status: 'published', isLive: false, duration: '32:15' },
    { id: 3, title: 'Live Insurance Summit 2025', category: 'Live Events', views: 12847, status: 'live', isLive: true, duration: 'LIVE' }
  ]);
  
  const [news, setNews] = useState([
    { id: 1, title: 'Insurance AI Summit Goes Live', type: 'regular', status: 'published', views: 2400, publishedAt: '2024-01-15' },
    { id: 2, title: 'New Regulatory Guidelines Released', type: 'update', status: 'published', views: 1800, publishedAt: '2024-01-14' },
    { id: 3, title: 'Cyber Insurance Claims Surge 340%', type: 'breaking', status: 'published', views: 5200, publishedAt: '2024-01-13' }
  ]);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Risk Manager', status: 'active', lastActive: '2 hours ago', totalWatchTime: 142 },
    { id: 2, name: 'Michael Rodriguez', email: 'michael.r@example.com', role: 'Insurance Professional', status: 'active', lastActive: '1 day ago', totalWatchTime: 89 },
    { id: 3, name: 'Emily Johnson', email: 'emily.j@example.com', role: 'Compliance Officer', status: 'inactive', lastActive: '5 days ago', totalWatchTime: 234 }
  ]);
  
  const [analytics, setAnalytics] = useState({
    totalUsers: 15847,
    activeUsers: 8542,
    totalVideos: 127,
    liveViewers: 12847,
    totalViews: 125690,
    revenue: 45720,
    newUsersToday: 342,
    avgWatchTime: 28.5,
    topCategories: [
      { name: 'Technology', views: 35420, growth: 12.5 },
      { name: 'Compliance', views: 28150, growth: 8.3 },
      { name: 'Risk Management', views: 22890, growth: 15.2 },
      { name: 'Strategy', views: 18640, growth: 6.7 }
    ],
    recentActivities: [
      { id: 1, type: 'video_upload', description: 'New video uploaded: AI in Claims Processing', time: '2 hours ago', user: 'Content Team' },
      { id: 2, type: 'user_signup', description: '25 new users signed up', time: '4 hours ago', user: 'System' },
      { id: 3, type: 'live_event', description: 'Insurance Summit 2025 went live', time: '6 hours ago', user: 'Event Team' },
      { id: 4, type: 'news_publish', description: 'Published: New Regulatory Guidelines', time: '8 hours ago', user: 'News Team' }
    ]
  });
  
  // Form States
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: 'Technology',
    speaker: '',
    duration: '',
    videoUrl: '',
    thumbnailUrl: '',
    isLive: false,
    isPublished: true
  });
  
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    type: 'regular',
    author: user?.user_metadata?.full_name || 'Admin',
    isPublished: true
  });

  // Check if user is admin
  const isAdmin = user?.user_metadata?.role === 'Admin' || 
                  user?.email?.includes('admin') || 
                  user?.user_metadata?.is_admin === true;

  const loadDashboardData = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleVideoSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const videoData = {
        ...newVideo,
        id: Date.now(),
        uploadedAt: new Date().toISOString(),
        uploadedBy: user.user_metadata?.full_name || user.email,
        views: 0,
        status: 'published'
      };
      
      setVideos(prev => [videoData, ...prev]);
      setNewVideo({
        title: '',
        description: '',
        category: 'Technology',
        speaker: '',
        duration: '',
        videoUrl: '',
        thumbnailUrl: '',
        isLive: false,
        isPublished: true
      });
      
      setLoading(false);
      alert('Video uploaded successfully!');
    }, 1000);
  };

  const handleNewsSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const newsData = {
        ...newNews,
        id: Date.now(),
        publishedAt: new Date().toISOString().split('T')[0],
        publishedBy: user.user_metadata?.full_name || user.email,
        views: 0,
        status: 'published'
      };
      
      setNews(prev => [newsData, ...prev]);
      setNewNews({
        title: '',
        content: '',
        type: 'regular',
        author: user?.user_metadata?.full_name || 'Admin',
        isPublished: true
      });
      
      setLoading(false);
      alert('News published successfully!');
    }, 1000);
  };

  const handleDeleteItem = (type, id) => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    if (type === 'video') {
      setVideos(prev => prev.filter(v => v.id !== id));
    } else if (type === 'news') {
      setNews(prev => prev.filter(n => n.id !== id));
    }
    alert(`${type} deleted successfully`);
  };

  if (!showAdmin) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #1f2937, #111827)',
        minHeight: '100vh',
        color: 'white'
      }}>
        <h2>Admin Dashboard Closed</h2>
        <button 
          onClick={() => setShowAdmin(true)}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Reopen Admin Panel
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <Shield size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
          <h3 style={{ color: 'white', fontSize: '20px', marginBottom: '12px' }}>
            Access Denied
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>
            Administrator privileges required to access this page.
          </p>
          <button
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Admin Panel */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(26, 26, 46, 0.95))',
        borderRadius: '24px',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{
              padding: '12px',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              borderRadius: '16px',
              color: 'white',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.4)'
            }}>
              <Settings size={24} />
            </div>
            <div>
              <h2 style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: '700',
                margin: 0,
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                GAIPTV Admin Dashboard
              </h2>
              <p style={{
                color: 'rgba(245, 158, 11, 0.8)',
                fontSize: '14px',
                margin: 0,
                fontWeight: '500'
              }}>
                Content Management & Platform Analytics
              </p>
            </div>
          </div>
          
          <button
            style={{
              padding: '12px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '50%',
              color: '#ef4444',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden'
        }}>
          {/* Sidebar Navigation */}
          <div style={{
            width: '280px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
            borderRight: '1px solid rgba(139, 92, 246, 0.2)',
            padding: '24px',
            overflowY: 'auto'
          }}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: '#3b82f6' },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: '#22c55e' },
              { id: 'videos', label: 'Video Management', icon: Video, color: '#8b5cf6' },
              { id: 'upload', label: 'Upload Content', icon: Upload, color: '#f59e0b' },
              { id: 'news', label: 'News Management', icon: FileText, color: '#ec4899' },
              { id: 'users', label: 'User Management', icon: Users, color: '#06b6d4' },
              { id: 'live', label: 'Live Events', icon: Radio, color: '#ef4444' },
              { id: 'settings', label: 'Platform Settings', icon: Settings, color: '#6b7280' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  background: activeTab === tab.id 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2))' 
                    : 'transparent',
                  border: activeTab === tab.id 
                    ? '1px solid rgba(139, 92, 246, 0.4)' 
                    : '1px solid transparent',
                  borderRadius: '16px',
                  color: activeTab === tab.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                  marginBottom: '8px',
                  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                <tab.icon size={18} style={{ color: tab.color }} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div style={{
            flex: 1,
            padding: '32px',
            overflowY: 'auto'
          }}>
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '32px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Platform Overview
                  </h3>
                  <button
                    onClick={loadDashboardData}
                    style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px'
                    }}
                  >
                    <RefreshCw size={16} />
                    Refresh
                  </button>
                </div>
                
                {/* Stats Cards */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {[
                    { label: 'Total Users', value: analytics.totalUsers?.toLocaleString(), icon: Users, color: '#3b82f6', trend: '+12.5%' },
                    { label: 'Active Users', value: analytics.activeUsers?.toLocaleString(), icon: UserCheck, color: '#22c55e', trend: '+8.3%' },
                    { label: 'Live Viewers', value: analytics.liveViewers?.toLocaleString(), icon: Radio, color: '#ef4444', trend: 'LIVE' },
                    { label: 'Total Videos', value: analytics.totalVideos?.toString(), icon: Video, color: '#8b5cf6', trend: '+5 this week' },
                    { label: 'Total Views', value: analytics.totalViews?.toLocaleString(), icon: Eye, color: '#06b6d4', trend: '+15.2%' },
                    { label: 'Revenue', value: `$${analytics.revenue?.toLocaleString()}`, icon: DollarSign, color: '#f59e0b', trend: '+23.8%' }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      padding: '24px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                      borderRadius: '20px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      backdropFilter: 'blur(20px)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                      }}>
                        <stat.icon size={24} style={{ color: stat.color }} />
                        <span style={{
                          fontSize: '12px',
                          color: stat.color,
                          fontWeight: '600',
                          background: `${stat.color}20`,
                          padding: '4px 8px',
                          borderRadius: '8px'
                        }}>
                          {stat.trend}
                        </span>
                      </div>
                      <div style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '4px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                  borderRadius: '20px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  padding: '24px'
                }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Activity size={20} />
                    Recent Activity
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {analytics.recentActivities?.map(activity => (
                      <div key={activity.id} style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}>
                          <div style={{
                            padding: '8px',
                            background: activity.type === 'video_upload' ? 'rgba(139, 92, 246, 0.2)' :
                                       activity.type === 'user_signup' ? 'rgba(34, 197, 94, 0.2)' :
                                       activity.type === 'live_event' ? 'rgba(239, 68, 68, 0.2)' :
                                       'rgba(59, 130, 246, 0.2)',
                            borderRadius: '8px'
                          }}>
                            {activity.type === 'video_upload' && <Upload size={16} />}
                            {activity.type === 'user_signup' && <Users size={16} />}
                            {activity.type === 'live_event' && <Radio size={16} />}
                            {activity.type === 'news_publish' && <FileText size={16} />}
                          </div>
                          <div>
                            <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>
                              {activity.description}
                            </div>
                            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                              by {activity.user} • {activity.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Video Management Tab */}
            {activeTab === 'videos' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Video Management
                  </h3>
                  <button
                    onClick={() => setActiveTab('upload')}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    Upload Video
                  </button>
                </div>

                {/* Search and Filters */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    flex: 1,
                    position: 'relative'
                  }}>
                    <Search size={16} style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }} />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 40px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <select
                    style={{
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="all">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="compliance">Compliance</option>
                    <option value="live">Live Events</option>
                  </select>
                </div>

                {/* Video List */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                  borderRadius: '16px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 100px 100px 120px 80px',
                    gap: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'uppercase'
                  }}>
                    <div>Video</div>
                    <div>Category</div>
                    <div>Views</div>
                    <div>Duration</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {videos.map(video => (
                    <div key={video.id} style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 100px 100px 120px 80px',
                      gap: '16px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: '500', marginBottom: '4px' }}>
                          {video.title}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                          ID: {video.id}
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        background: 'rgba(139, 92, 246, 0.2)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#8b5cf6',
                        width: 'fit-content'
                      }}>
                        {video.category}
                      </div>
                      <div style={{ color: 'white' }}>
                        {video.views.toLocaleString()}
                      </div>
                      <div style={{ color: 'white' }}>
                        {video.duration}
                      </div>
                      <div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: video.isLive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                          color: video.isLive ? '#ef4444' : '#22c55e'
                        }}>
                          {video.isLive ? 'LIVE' : video.status}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <button style={{
                          padding: '6px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#3b82f6',
                          cursor: 'pointer'
                        }}>
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem('video', video.id)}
                          style={{
                            padding: '6px',
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Content Tab */}
            {activeTab === 'upload' && (
              <div>
                <h3 style={{
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '24px'
                }}>
                  Upload New Content
                </h3>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px'
                }}>
                  {/* Video Upload */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    padding: '24px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <Video size={24} style={{ color: '#8b5cf6' }} />
                      <h4 style={{
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        Upload Video
                      </h4>
                    </div>
                    
                    <form onSubmit={handleVideoSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Video Title *
                        </label>
                        <input
                          type="text"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                          placeholder="Enter video title..."
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Description
                        </label>
                        <textarea
                          value={newVideo.description}
                          onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                          placeholder="Enter video description..."
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div>
                          <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '8px'
                          }}>
                            Category
                          </label>
                          <select
                            value={newVideo.category}
                            onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              borderRadius: '12px',
                              color: 'white',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          >
                            <option value="Technology" style={{ background: '#1f2937' }}>Technology</option>
                            <option value="Compliance" style={{ background: '#1f2937' }}>Compliance</option>
                            <option value="Strategy" style={{ background: '#1f2937' }}>Strategy</option>
                            <option value="Risk Management" style={{ background: '#1f2937' }}>Risk Management</option>
                            <option value="Live Events" style={{ background: '#1f2937' }}>Live Events</option>
                          </select>
                        </div>

                        <div>
                          <label style={{
                            display: 'block',
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginBottom: '8px'
                          }}>
                            Duration
                          </label>
                          <input
                            type="text"
                            value={newVideo.duration}
                            onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                            placeholder="e.g., 45:30"
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(139, 92, 246, 0.3)',
                              borderRadius: '12px',
                              color: 'white',
                              fontSize: '14px',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Speaker/Presenter
                        </label>
                        <input
                          type="text"
                          value={newVideo.speaker}
                          onChange={(e) => setNewVideo({...newVideo, speaker: e.target.value})}
                          placeholder="Enter speaker name and title..."
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Video URL *
                        </label>
                        <input
                          type="url"
                          value={newVideo.videoUrl}
                          onChange={(e) => setNewVideo({...newVideo, videoUrl: e.target.value})}
                          placeholder="https://player.vimeo.com/video/..."
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer'
                        }}>
                          <input
                            type="checkbox"
                            checked={newVideo.isLive}
                            onChange={(e) => setNewVideo({...newVideo, isLive: e.target.checked})}
                            style={{ accentColor: '#8b5cf6' }}
                          />
                          <span style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '14px'
                          }}>
                            Live Stream
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '100%',
                          padding: '12px 24px',
                          background: loading 
                            ? 'rgba(139, 92, 246, 0.5)' 
                            : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        {loading ? (
                          <>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderTop: '2px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }} />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload size={16} />
                            Upload Video
                          </>
                        )}
                      </button>
                    </form>
                  </div>

                  {/* News Publishing */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                    borderRadius: '20px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    padding: '24px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <FileText size={24} style={{ color: '#f59e0b' }} />
                      <h4 style={{
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: 0
                      }}>
                        Publish News
                      </h4>
                    </div>

                    <form onSubmit={handleNewsSubmit}>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          News Title *
                        </label>
                        <input
                          type="text"
                          value={newNews.title}
                          onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                          placeholder="Enter news headline..."
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: '16px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          News Type
                        </label>
                        <select
                          value={newNews.type}
                          onChange={(e) => setNewNews({...newNews, type: e.target.value})}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                          }}
                        >
                          <option value="regular" style={{ background: '#1f2937' }}>Regular News</option>
                          <option value="update" style={{ background: '#1f2937' }}>Important Update</option>
                          <option value="breaking" style={{ background: '#1f2937' }}>Breaking News</option>
                        </select>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{
                          display: 'block',
                          color: 'rgba(255, 255, 255, 0.8)',
                          fontSize: '14px',
                          fontWeight: '500',
                          marginBottom: '8px'
                        }}>
                          Content *
                        </label>
                        <textarea
                          value={newNews.content}
                          onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                          placeholder="Enter news content..."
                          rows={8}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none',
                            resize: 'vertical'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '100%',
                          padding: '12px 24px',
                          background: loading 
                            ? 'rgba(245, 158, 11, 0.5)' 
                            : 'linear-gradient(135deg, #f59e0b, #d97706)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontSize: '14px',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        {loading ? (
                          <>
                            <div style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid rgba(255, 255, 255, 0.3)',
                              borderTop: '2px solid white',
                              borderRadius: '50%',
                              animation: 'spin 1s linear infinite'
                            }} />
                            Publishing...
                          </>
                        ) : (
                          <>
                            <Globe size={16} />
                            Publish News
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Platform Analytics
                  </h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px'
                      }}
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                    <button style={{
                      padding: '8px 12px',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Analytics Charts */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  gap: '24px',
                  marginBottom: '24px'
                }}>
                  {/* Main Chart */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    padding: '24px'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '20px'
                    }}>
                      User Activity Trends
                    </h4>
                    <div style={{
                      height: '300px',
                      background: 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      Chart visualization would go here
                      <br />
                      (Integrate with Chart.js or similar)
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                    borderRadius: '16px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    padding: '24px'
                  }}>
                    <h4 style={{
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      marginBottom: '20px'
                    }}>
                      Top Categories
                    </h4>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}>
                      {analytics.topCategories?.map((category, index) => (
                        <div key={category.name} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px'
                        }}>
                          <div>
                            <div style={{ color: 'white', fontWeight: '500', fontSize: '14px' }}>
                              {category.name}
                            </div>
                            <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                              {category.views.toLocaleString()} views
                            </div>
                          </div>
                          <div style={{
                            color: category.growth > 10 ? '#22c55e' : '#f59e0b',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            +{category.growth}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px'
                }}>
                  {[
                    { label: 'Avg Watch Time', value: `${analytics.avgWatchTime} min`, icon: Clock, color: '#3b82f6' },
                    { label: 'Completion Rate', value: '78%', icon: CheckCircle, color: '#22c55e' },
                    { label: 'User Retention', value: '85%', icon: Users, color: '#8b5cf6' },
                    { label: 'Daily Active Users', value: '2,847', icon: Activity, color: '#f59e0b' }
                  ].map((metric, index) => (
                    <div key={index} style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                      borderRadius: '16px',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      textAlign: 'center'
                    }}>
                      <metric.icon size={32} style={{ color: metric.color, marginBottom: '12px' }} />
                      <div style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: 'white',
                        marginBottom: '4px'
                      }}>
                        {metric.value}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    User Management
                  </h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Mail size={16} />
                      Send Newsletter
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <Download size={16} />
                      Export Users
                    </button>
                  </div>
                </div>

                {/* User Statistics */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {[
                    { label: 'Total Users', value: analytics.totalUsers?.toLocaleString(), color: '#3b82f6' },
                    { label: 'Active Today', value: analytics.newUsersToday?.toString(), color: '#22c55e' },
                    { label: 'Premium Users', value: '2,847', color: '#f59e0b' },
                    { label: 'New This Week', value: '847', color: '#8b5cf6' }
                  ].map((stat, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                      borderRadius: '12px',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                      <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: stat.color,
                        marginBottom: '4px'
                      }}>
                        {stat.value}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.7)'
                      }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* User List */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                  borderRadius: '16px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 100px 100px 80px',
                    gap: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'uppercase'
                  }}>
                    <div>User</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Watch Time</div>
                    <div>Last Active</div>
                    <div>Actions</div>
                  </div>
                  {users.map(user => (
                    <div key={user.id} style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 100px 100px 80px',
                      gap: '16px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: '500', marginBottom: '4px' }}>
                          {user.name}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                          {user.email}
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 8px',
                        background: 'rgba(59, 130, 246, 0.2)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: '#3b82f6',
                        width: 'fit-content'
                      }}>
                        {user.role}
                      </div>
                      <div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: user.status === 'active' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: user.status === 'active' ? '#22c55e' : '#ef4444'
                        }}>
                          {user.status}
                        </span>
                      </div>
                      <div style={{ color: 'white' }}>
                        {user.totalWatchTime}h
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                        {user.lastActive}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <button style={{
                          padding: '6px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#3b82f6',
                          cursor: 'pointer'
                        }}>
                          <Edit size={14} />
                        </button>
                        <button style={{
                          padding: '6px',
                          background: 'rgba(245, 158, 11, 0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#f59e0b',
                          cursor: 'pointer'
                        }}>
                          <Mail size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News Management Tab */}
            {activeTab === 'news' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    News Management
                  </h3>
                  <button
                    onClick={() => setActiveTab('upload')}
                    style={{
                      padding: '12px 20px',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Plus size={16} />
                    Publish News
                  </button>
                </div>

                {/* News List */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                  borderRadius: '16px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'grid',
                    gridTemplateColumns: '2fr 100px 100px 120px 120px 80px',
                    gap: '16px',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'rgba(255, 255, 255, 0.7)',
                    textTransform: 'uppercase'
                  }}>
                    <div>Article</div>
                    <div>Type</div>
                    <div>Views</div>
                    <div>Status</div>
                    <div>Published</div>
                    <div>Actions</div>
                  </div>
                  {news.map(article => (
                    <div key={article.id} style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
                      display: 'grid',
                      gridTemplateColumns: '2fr 100px 100px 120px 120px 80px',
                      gap: '16px',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ color: 'white', fontWeight: '500', marginBottom: '4px' }}>
                          {article.title}
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                          ID: {article.id}
                        </div>
                      </div>
                      <div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: article.type === 'breaking' ? 'rgba(239, 68, 68, 0.2)' :
                                     article.type === 'update' ? 'rgba(59, 130, 246, 0.2)' :
                                     'rgba(156, 163, 175, 0.2)',
                          color: article.type === 'breaking' ? '#ef4444' :
                                 article.type === 'update' ? '#3b82f6' :
                                 '#9ca3af'
                        }}>
                          {article.type}
                        </span>
                      </div>
                      <div style={{ color: 'white' }}>
                        {article.views.toLocaleString()}
                      </div>
                      <div>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          background: 'rgba(34, 197, 94, 0.2)',
                          color: '#22c55e'
                        }}>
                          {article.status}
                        </span>
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px' }}>
                        {article.publishedAt}
                      </div>
                      <div style={{
                        display: 'flex',
                        gap: '8px'
                      }}>
                        <button style={{
                          padding: '6px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#3b82f6',
                          cursor: 'pointer'
                        }}>
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem('news', article.id)}
                          style={{
                            padding: '6px',
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live Events Tab */}
            {activeTab === 'live' && (
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px'
                }}>
                  <h3 style={{
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: 0
                  }}>
                    Live Events Management
                  </h3>
                  <button style={{
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Radio size={16} />
                    Start Live Stream
                  </button>
                </div>

                {/* Current Live Events */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
                  borderRadius: '16px',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '24px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{
                    color: '#ef4444',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: '#ef4444',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite'
                    }}></div>
                    Currently Live
                  </h4>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px'
                  }}>
                    <div>
                      <div style={{ color: 'white', fontWeight: '600', marginBottom: '4px' }}>
                        Insurance AI Summit 2025
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
                        Live coverage of the annual insurance innovation summit
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: 'white'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Eye size={16} />
                        12,847 viewers
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={16} />
                        2h 15m
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button style={{
                        padding: '8px 16px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                        Manage
                      </button>
                      <button style={{
                        padding: '8px 16px',
                        background: 'rgba(239, 68, 68, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}>
                        End Stream
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scheduled Events */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
                  borderRadius: '16px',
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  padding: '24px'
                }}>
                  <h4 style={{
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Calendar size={16} />
                    Scheduled Events
                  </h4>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {[
                      {
                        title: 'Risk Management Workshop',
                        date: 'Tomorrow, 2:00 PM EST',
                        registrations: 347,
                        status: 'scheduled'
                      },
                      {
                        title: 'Compliance Q&A Session',
                        date: 'Friday, 10:00 AM EST',
                        registrations: 156,
                        status: 'scheduled'
                      },
                      {
                        title: 'Digital Insurance Trends',
                        date: 'Next Monday, 3:00 PM EST',
                        registrations: 89,
                        status: 'draft'
                      }
                    ].map((event, index) => (
                      <div key={index} style={{
                        padding: '16px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '12px',
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr auto auto',
                        gap: '16px',
                        alignItems: 'center'
                      }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: '500', marginBottom: '4px' }}>
                            {event.title}
                          </div>
                          <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>
                            {event.date}
                          </div>
                        </div>
                        <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {event.registrations} registered
                        </div>
                        <div>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '500',
                            background: event.status === 'scheduled' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            color: event.status === 'scheduled' ? '#22c55e' : '#f59e0b'
                          }}>
                            {event.status}
                          </span>
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '8px'
                        }}>
                          <button style={{
                            padding: '6px',
                            background: 'rgba(59, 130, 246, 0.2)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#3b82f6',
                            cursor: 'pointer'
                          }}>
                            <Edit size={14} />
                          </button>
                          <button style={{
                            padding: '6px',
                            background: 'rgba(239, 68, 68, 0.2)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}>
                            <Radio size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Platform Settings Tab */}
            {activeTab === 'settings' && (
              <SettingsManager />
            )}
          </div>
        </div>

        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.1); }
          }
          
          input:focus, textarea:focus, select:focus {
            border-color: #8b5cf6 !important;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
          }
          
          button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          
          @media (max-width: 768px) {
            .admin-panel {
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              border-radius: 0 !important;
            }
            
            .admin-sidebar {
              width: 100% !important;
              border-right: none !important;
              border-bottom: 1px solid rgba(139, 92, 246, 0.2) !important;
            }
            
            .admin-content {
              padding: 16px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default AdminDashboard;
