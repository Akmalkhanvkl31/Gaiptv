import React, { useState, useEffect } from 'react';
import './styles/AdminDashboard.css';
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
      <h3 className="settings-manager-title">
        Platform Settings
      </h3>
      <div className="settings-manager-placeholder">
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
      <div className="admin-closed-container">
        <h2>Admin Dashboard Closed</h2>
        <button 
          onClick={() => setShowAdmin(true)}
          className="reopen-admin-button"
        >
          Reopen Admin Panel
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="access-denied-overlay">
        <div className="access-denied-box">
          <Shield size={48} color="#ef4444" className="access-denied-icon" />
          <h3 className="access-denied-title">
            Access Denied
          </h3>
          <p className="access-denied-message">
            Administrator privileges required to access this page.
          </p>
          <button className="go-back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Admin Panel */}
      <div className="admin-dashboard-container">
        {/* Header */}
        <div className="admin-dashboard-header">
          <div className="admin-dashboard-header-title-container">
            <div className="admin-dashboard-header-icon">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="admin-dashboard-header-title">
                GAIPTV Admin Dashboard
              </h2>
              <p className="admin-dashboard-header-subtitle">
                Content Management & Platform Analytics
              </p>
            </div>
          </div>
          
          <button className="admin-dashboard-close-button">
            <X size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="admin-dashboard-content-area">
          {/* Sidebar Navigation */}
          <div className="admin-dashboard-sidebar">
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
                className={`admin-dashboard-sidebar-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={18} style={{ color: tab.color }} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="admin-dashboard-main-content">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div>
                <div className="tab-header">
                  <h3 className="tab-title">
                    Platform Overview
                  </h3>
                  <button
                    onClick={loadDashboardData}
                    className="refresh-button"
                  >
                    <RefreshCw size={16} />
                    Refresh
                  </button>
                </div>
                
                {/* Stats Cards */}
                <div className="stats-grid">
                  {[
                    { label: 'Total Users', value: analytics.totalUsers?.toLocaleString(), icon: Users, color: '#3b82f6', trend: '+12.5%' },
                    { label: 'Active Users', value: analytics.activeUsers?.toLocaleString(), icon: UserCheck, color: '#22c55e', trend: '+8.3%' },
                    { label: 'Live Viewers', value: analytics.liveViewers?.toLocaleString(), icon: Radio, color: '#ef4444', trend: 'LIVE' },
                    { label: 'Total Videos', value: analytics.totalVideos?.toString(), icon: Video, color: '#8b5cf6', trend: '+5 this week' },
                    { label: 'Total Views', value: analytics.totalViews?.toLocaleString(), icon: Eye, color: '#06b6d4', trend: '+15.2%' },
                    { label: 'Revenue', value: `$${analytics.revenue?.toLocaleString()}`, icon: DollarSign, color: '#f59e0b', trend: '+23.8%' }
                  ].map((stat, index) => (
                    <div key={index} className="stat-card">
                      <div className="stat-card-header">
                        <stat.icon size={24} style={{ color: stat.color }} />
                        <span className="stat-card-trend" style={{ color: stat.color, background: `${stat.color}20` }}>
                          {stat.trend}
                        </span>
                      </div>
                      <div className="stat-card-value">
                        {stat.value}
                      </div>
                      <div className="stat-card-label">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="recent-activity-container">
                  <h4 className="recent-activity-title">
                    <Activity size={20} />
                    Recent Activity
                  </h4>
                  <div className="activity-list">
                    {analytics.recentActivities?.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-item-icon-container">
                          <div className="activity-item-icon" style={{
                            background: activity.type === 'video_upload' ? 'rgba(139, 92, 246, 0.2)' :
                                       activity.type === 'user_signup' ? 'rgba(34, 197, 94, 0.2)' :
                                       activity.type === 'live_event' ? 'rgba(239, 68, 68, 0.2)' :
                                       'rgba(59, 130, 246, 0.2)'
                          }}>
                            {activity.type === 'video_upload' && <Upload size={16} />}
                            {activity.type === 'user_signup' && <Users size={16} />}
                            {activity.type === 'live_event' && <Radio size={16} />}
                            {activity.type === 'news_publish' && <FileText size={16} />}
                          </div>
                          <div>
                            <div className="activity-item-description">
                              {activity.description}
                            </div>
                            <div className="activity-item-meta">
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
                <div className="video-management-header">
                  <h3 className="video-management-title">
                    Video Management
                  </h3>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="upload-video-button"
                  >
                    <Plus size={16} />
                    Upload Video
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="search-filter-container">
                  <div className="search-input-container">
                    <Search size={16} className="search-input-icon" />
                    <input
                      type="text"
                      placeholder="Search videos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select className="category-select">
                    <option value="all">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="compliance">Compliance</option>
                    <option value="live">Live Events</option>
                  </select>
                </div>

                {/* Video List */}
                <div className="video-list-container">
                  <div className="video-list-header">
                    <div>Video</div>
                    <div>Category</div>
                    <div>Views</div>
                    <div>Duration</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  {videos.map(video => (
                    <div key={video.id} className="video-list-item">
                      <div>
                        <div className="video-title">
                          {video.title}
                        </div>
                        <div className="video-id">
                          ID: {video.id}
                        </div>
                      </div>
                      <div className="video-category">
                        {video.category}
                      </div>
                      <div className="video-views">
                        {video.views.toLocaleString()}
                      </div>
                      <div className="video-duration">
                        {video.duration}
                      </div>
                      <div>
                        <span className={`video-status ${video.isLive ? 'live' : 'published'}`}>
                          {video.isLive ? 'LIVE' : video.status}
                        </span>
                      </div>
                      <div className="video-actions">
                        <button className="action-button edit-button">
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem('video', video.id)}
                          className="action-button delete-button"
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
                <h3 className="upload-content-title">
                  Upload New Content
                </h3>
                
                <div className="upload-grid">
                  {/* Video Upload */}
                  <div className="upload-form-container">
                    <div className="upload-form-header">
                      <Video size={24} style={{ color: '#8b5cf6' }} />
                      <h4 className="upload-form-title">
                        Upload Video
                      </h4>
                    </div>
                    
                    <form onSubmit={handleVideoSubmit}>
                      <div className="form-group">
                        <label className="form-label">
                          Video Title *
                        </label>
                        <input
                          type="text"
                          value={newVideo.title}
                          onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                          placeholder="Enter video title..."
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Description
                        </label>
                        <textarea
                          value={newVideo.description}
                          onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                          placeholder="Enter video description..."
                          rows={4}
                          className="form-textarea"
                        />
                      </div>

                      <div className="form-grid">
                        <div>
                          <label className="form-label">
                            Category
                          </label>
                          <select
                            value={newVideo.category}
                            onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                            className="form-select"
                          >
                            <option value="Technology" style={{ background: '#1f2937' }}>Technology</option>
                            <option value="Compliance" style={{ background: '#1f2937' }}>Compliance</option>
                            <option value="Strategy" style={{ background: '#1f2937' }}>Strategy</option>
                            <option value="Risk Management" style={{ background: '#1f2937' }}>Risk Management</option>
                            <option value="Live Events" style={{ background: '#1f2937' }}>Live Events</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={newVideo.duration}
                            onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                            placeholder="e.g., 45:30"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Speaker/Presenter
                        </label>
                        <input
                          type="text"
                          value={newVideo.speaker}
                          onChange={(e) => setNewVideo({...newVideo, speaker: e.target.value})}
                          placeholder="Enter speaker name and title..."
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Video URL *
                        </label>
                        <input
                          type="url"
                          value={newVideo.videoUrl}
                          onChange={(e) => setNewVideo({...newVideo, videoUrl: e.target.value})}
                          placeholder="https://player.vimeo.com/video/..."
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-checkbox-label">
                          <input
                            type="checkbox"
                            checked={newVideo.isLive}
                            onChange={(e) => setNewVideo({...newVideo, isLive: e.target.checked})}
                            className="form-checkbox"
                          />
                          <span className="form-checkbox-text">
                            Live Stream
                          </span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="submit-button upload-video-submit"
                      >
                        {loading ? (
                          <>
                            <div className="loading-spinner" />
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
                  <div className="upload-form-container">
                    <div className="upload-form-header">
                      <FileText size={24} style={{ color: '#f59e0b' }} />
                      <h4 className="upload-form-title">
                        Publish News
                      </h4>
                    </div>

                    <form onSubmit={handleNewsSubmit}>
                      <div className="form-group">
                        <label className="form-label">
                          News Title *
                        </label>
                        <input
                          type="text"
                          value={newNews.title}
                          onChange={(e) => setNewNews({...newNews, title: e.target.value})}
                          placeholder="Enter news headline..."
                          required
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          News Type
                        </label>
                        <select
                          value={newNews.type}
                          onChange={(e) => setNewNews({...newNews, type: e.target.value})}
                          className="form-select"
                        >
                          <option value="regular" style={{ background: '#1f2937' }}>Regular News</option>
                          <option value="update" style={{ background: '#1f2937' }}>Important Update</option>
                          <option value="breaking" style={{ background: '#1f2937' }}>Breaking News</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Content *
                        </label>
                        <textarea
                          value={newNews.content}
                          onChange={(e) => setNewNews({...newNews, content: e.target.value})}
                          placeholder="Enter news content..."
                          rows={8}
                          required
                          className="form-textarea"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="submit-button publish-news-submit"
                      >
                        {loading ? (
                          <>
                            <div className="loading-spinner" />
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
                <div className="analytics-header">
                  <h3 className="analytics-title">
                    Platform Analytics
                  </h3>
                  <div className="analytics-controls">
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      className="date-range-select"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                    <button className="export-button">
                      <Download size={16} />
                      Export
                    </button>
                  </div>
                </div>

                {/* Analytics Charts */}
                <div className="analytics-grid">
                  {/* Main Chart */}
                  <div className="chart-container">
                    <h4 className="chart-title">
                      User Activity Trends
                    </h4>
                    <div className="chart-placeholder">
                      Chart visualization would go here
                      <br />
                      (Integrate with Chart.js or similar)
                    </div>
                  </div>

                  {/* Top Categories */}
                  <div className="top-categories-container">
                    <h4 className="top-categories-title">
                      Top Categories
                    </h4>
                    <div className="category-list">
                      {analytics.topCategories?.map((category, index) => (
                        <div key={category.name} className="category-item">
                          <div>
                            <div className="category-name">
                              {category.name}
                            </div>
                            <div className="category-views">
                              {category.views.toLocaleString()} views
                            </div>
                          </div>
                          <div className="category-growth" style={{ color: category.growth > 10 ? '#22c55e' : '#f59e0b' }}>
                            +{category.growth}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="performance-metrics-grid">
                  {[
                    { label: 'Avg Watch Time', value: `${analytics.avgWatchTime} min`, icon: Clock, color: '#3b82f6' },
                    { label: 'Completion Rate', value: '78%', icon: CheckCircle, color: '#22c55e' },
                    { label: 'User Retention', value: '85%', icon: Users, color: '#8b5cf6' },
                    { label: 'Daily Active Users', value: '2,847', icon: Activity, color: '#f59e0b' }
                  ].map((metric, index) => (
                    <div key={index} className="metric-card">
                      <metric.icon size={32} className="metric-icon" style={{ color: metric.color }} />
                      <div className="metric-value">
                        {metric.value}
                      </div>
                      <div className="metric-label">
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
                <div className="user-management-header">
                  <h3 className="user-management-title">
                    User Management
                  </h3>
                  <div className="user-management-actions">
                    <button className="send-newsletter-button">
                      <Mail size={16} />
                      Send Newsletter
                    </button>
                    <button className="export-button">
                      <Download size={16} />
                      Export Users
                    </button>
                  </div>
                </div>

                {/* User Statistics */}
                <div className="user-stats-grid">
                  {[
                    { label: 'Total Users', value: analytics.totalUsers?.toLocaleString(), color: '#3b82f6' },
                    { label: 'Active Today', value: analytics.newUsersToday?.toString(), color: '#22c55e' },
                    { label: 'Premium Users', value: '2,847', color: '#f59e0b' },
                    { label: 'New This Week', value: '847', color: '#8b5cf6' }
                  ].map((stat, index) => (
                    <div key={index} className="user-stat-card">
                      <div className="user-stat-value" style={{ color: stat.color }}>
                        {stat.value}
                      </div>
                      <div className="user-stat-label">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* User List */}
                <div className="user-list-container">
                  <div className="user-list-header">
                    <div>User</div>
                    <div>Role</div>
                    <div>Status</div>
                    <div>Watch Time</div>
                    <div>Last Active</div>
                    <div>Actions</div>
                  </div>
                  {users.map(user => (
                    <div key={user.id} className="user-list-item">
                      <div>
                        <div className="user-name">
                          {user.name}
                        </div>
                        <div className="user-email">
                          {user.email}
                        </div>
                      </div>
                      <div className="user-role">
                        {user.role}
                      </div>
                      <div>
                        <span className={`user-status ${user.status}`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="user-watch-time">
                        {user.totalWatchTime}h
                      </div>
                      <div className="user-last-active">
                        {user.lastActive}
                      </div>
                      <div className="user-actions">
                        <button className="action-button edit-button">
                          <Edit size={14} />
                        </button>
                        <button className="action-button mail-button">
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
                <div className="news-management-header">
                  <h3 className="news-management-title">
                    News Management
                  </h3>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="publish-news-button"
                  >
                    <Plus size={16} />
                    Publish News
                  </button>
                </div>

                {/* News List */}
                <div className="news-list-container">
                  <div className="news-list-header">
                    <div>Article</div>
                    <div>Type</div>
                    <div>Views</div>
                    <div>Status</div>
                    <div>Published</div>
                    <div>Actions</div>
                  </div>
                  {news.map(article => (
                    <div key={article.id} className="news-list-item">
                      <div>
                        <div className="article-title">
                          {article.title}
                        </div>
                        <div className="article-id">
                          ID: {article.id}
                        </div>
                      </div>
                      <div>
                        <span className={`article-type ${article.type}`}>
                          {article.type}
                        </span>
                      </div>
                      <div className="article-views">
                        {article.views.toLocaleString()}
                      </div>
                      <div>
                        <span className="article-status">
                          {article.status}
                        </span>
                      </div>
                      <div className="article-published-at">
                        {article.publishedAt}
                      </div>
                      <div className="video-actions">
                        <button className="action-button edit-button">
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem('news', article.id)}
                          className="action-button delete-button"
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
                <div className="live-events-header">
                  <h3 className="live-events-title">
                    Live Events Management
                  </h3>
                  <button className="start-live-stream-button">
                    <Radio size={16} />
                    Start Live Stream
                  </button>
                </div>

                {/* Current Live Events */}
                <div className="current-live-container">
                  <h4 className="current-live-title">
                    <div className="live-indicator"></div>
                    Currently Live
                  </h4>
                  
                  <div className="live-event-item">
                    <div>
                      <div className="live-event-title">
                        Insurance AI Summit 2025
                      </div>
                      <div className="live-event-description">
                        Live coverage of the annual insurance innovation summit
                      </div>
                    </div>
                    <div className="live-event-stats">
                      <div className="live-event-stat">
                        <Eye size={16} />
                        12,847 viewers
                      </div>
                      <div className="live-event-stat">
                        <Clock size={16} />
                        2h 15m
                      </div>
                    </div>
                    <div className="live-event-actions">
                      <button className="manage-live-button">
                        Manage
                      </button>
                      <button className="end-stream-button">
                        End Stream
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scheduled Events */}
                <div className="scheduled-events-container">
                  <h4 className="scheduled-events-title">
                    <Calendar size={16} />
                    Scheduled Events
                  </h4>

                  <div className="scheduled-event-list">
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
                      <div key={index} className="scheduled-event-item">
                        <div>
                          <div className="scheduled-event-title">
                            {event.title}
                          </div>
                          <div className="scheduled-event-date">
                            {event.date}
                          </div>
                        </div>
                        <div className="scheduled-event-registrations">
                          {event.registrations} registered
                        </div>
                        <div>
                          <span className={`scheduled-event-status ${event.status}`}>
                            {event.status}
                          </span>
                        </div>
                        <div className="scheduled-event-actions">
                          <button className="action-button edit-button">
                            <Edit size={14} />
                          </button>
                          <button className="action-button go-live-button">
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

      </div>
    </>
  );
};

export default AdminDashboard;
