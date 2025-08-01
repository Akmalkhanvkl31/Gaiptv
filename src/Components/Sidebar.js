import React, { useState } from 'react';
import { 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  RefreshCw, 
  ChevronRight,
  BookOpen,
  Target,
  Award,
  Calendar,
  Users,
  Zap
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ news, onNewsClick, user }) => {
  const [hoveredNewsId, setHoveredNewsId] = useState(null);
  const [activeTab, setActiveTab] = useState('news');

  const getNewsIcon = (type) => {
    switch (type) {
      case 'breaking':
        return <AlertCircle size={16} style={{ color: '#f87171' }} />;
      case 'update':
        return <TrendingUp size={16} style={{ color: '#60a5fa' }} />;
      default:
        return <Clock size={16} style={{ color: '#9ca3af' }} />;
    }
  };

  const getBadgeStyle = (type) => {
    switch (type) {
      case 'breaking':
        return 'news-badge-breaking';
      case 'update':
        return 'news-badge-update';
      default:
        return 'news-badge-default';
    }
  };

  // Mock user learning data
  const userLearningData = user ? {
    weeklyGoal: 5,
    completed: 3,
    streak: 7,
    certificates: 2,
    upcomingEvents: [
      {
        id: 1,
        title: 'AI Ethics in Insurance',
        date: 'Tomorrow, 2:00 PM',
        type: 'webinar'
      },
      {
        id: 2,
        title: 'Risk Assessment Workshop',
        date: 'Friday, 10:00 AM',
        type: 'workshop'
      }
    ],
    recentAchievements: [
      {
        id: 1,
        title: 'Compliance Expert',
        description: 'Completed 10 compliance courses',
        earned: '2 days ago'
      }
    ]
  } : null;

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Tab Navigation for Authenticated Users */}
        {user && (
          <div className="tab-navigation">
            {[
              { id: 'news', label: 'News', icon: TrendingUp },
              { id: 'learning', label: 'Learning', icon: BookOpen },
              { id: 'events', label: 'Events', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* News Tab Content */}
        {(!user || activeTab === 'news') && (
          <>
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
                  className="news-item"
                  onMouseEnter={() => setHoveredNewsId(newsItem.id)}
                  onMouseLeave={() => setHoveredNewsId(null)}
                  onClick={(e) => onNewsClick && onNewsClick(newsItem, e)}
                >
                  <div className="news-header">
                    <div className="news-date-container">
                      {getNewsIcon(newsItem.type)}
                      <span className={`news-badge ${getBadgeStyle(newsItem.type)}`}>
                        {newsItem.date}
                      </span>
                    </div>
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
          </>
        )}

        {/* Learning Tab Content */}
        {user && activeTab === 'learning' && (
          <div>
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <BookOpen size={20} />
                <span>Learning Progress</span>
              </h3>
            </div>

            {/* Weekly Goal */}
            <div className="weekly-goal">
              <div className="weekly-goal-header">
                <span>Weekly Goal</span>
                <span>{userLearningData.completed}/{userLearningData.weeklyGoal}</span>
              </div>
              <div className="progress-bar-container">
                <div 
                  className="progress-bar"
                  style={{ width: `${(userLearningData.completed / userLearningData.weeklyGoal) * 100}%` }} 
                />
              </div>
            </div>

            {/* Learning Stats */}
            <div className="learning-stats">
              <div className="stat-item">
                <div className="stat-value streak">{userLearningData.streak}</div>
                <div className="stat-label">Day Streak</div>
              </div>
              <div className="stat-item">
                <div className="stat-value certificates">{userLearningData.certificates}</div>
                <div className="stat-label">Certificates</div>
              </div>
            </div>

            {/* Recent Achievement */}
            {userLearningData.recentAchievements.length > 0 && (
              <div className="recent-achievement">
                <div className="achievement-header">
                  <Award size={16} color="#f59e0b" />
                  <span>New Achievement!</span>
                </div>
                <div className="achievement-title">{userLearningData.recentAchievements[0].title}</div>
                <div className="achievement-description">{userLearningData.recentAchievements[0].description}</div>
              </div>
            )}
          </div>
        )}

        {/* Events Tab Content */}
        {user && activeTab === 'events' && (
          <div>
            <div className="sidebar-header">
              <h3 className="sidebar-title">
                <Calendar size={20} />
                <span>Upcoming Events</span>
              </h3>
            </div>

            <div className="events-container">
              {userLearningData.upcomingEvents.map(event => (
                <div key={event.id} className="event-item interactive-hover">
                  <div className="event-header">
                    <div className={`event-icon ${event.type}`}>
                      {event.type === 'webinar' ? (
                        <Users size={12} color="#3b82f6" />
                      ) : (
                        <Target size={12} color="#8b5cf6" />
                      )}
                    </div>
                    <span className={`event-type ${event.type}`}>{event.type}</span>
                  </div>
                  <div className="event-title">{event.title}</div>
                  <div className="event-date">
                    <Clock size={10} />
                    {event.date}
                  </div>
                </div>
              ))}
            </div>

            <button className="view-all-button calendar-button">
              <span>View Calendar</span>
              <Calendar size={16} />
            </button>
          </div>
        )}

        {/* Platform Stats (always visible) */}
        <div className="platform-stats">
          <h4>
            <Zap size={16} />
            Platform Stats
          </h4>
          <div className="stats-grid">
            <div className="stat-row">
              <span>Live Viewers</span>
              <span className="stat-value live">12,847</span>
            </div>
            <div className="stat-row">
              <span>Total Videos</span>
              <span className="stat-value">127</span>
            </div>
            <div className="stat-row">
              <span>Today's Views</span>
              <span className="stat-value views">25.3K</span>
            </div>
            {user && (
              <div className="stat-row progress-row">
                <span>Your Progress</span>
                <span className="stat-value progress">
                  {Math.round((userLearningData.completed / userLearningData.weeklyGoal) * 100)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
