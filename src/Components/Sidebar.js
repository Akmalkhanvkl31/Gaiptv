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
import styles from './Styles';

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
        return styles.newsBadgeBreaking;
      case 'update':
        return styles.newsBadgeUpdate;
      default:
        return styles.newsBadgeDefault;
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
    <div style={styles.sidebar}>
      <div style={styles.sidebarContent}>
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
              { id: 'learning', label: 'Learning', icon: BookOpen },
              { id: 'events', label: 'Events', icon: Calendar }
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

        {/* News Tab Content */}
        {(!user || activeTab === 'news') && (
          <>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>
                <TrendingUp size={20} />
                <span>News & Updates</span>
              </h3>
              <button style={styles.refreshButton} className="refresh-button">
                <RefreshCw size={16} />
              </button>
            </div>

            <div style={styles.newsContainer}>
              {news.map(newsItem => (
                <div 
                  key={newsItem.id} 
                  style={{
                    ...styles.newsItem,
                    ...(hoveredNewsId === newsItem.id ? { 
                      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                      transform: 'translateX(5px)',
                      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)'
                    } : {})
                  }}
                  onMouseEnter={() => setHoveredNewsId(newsItem.id)}
                  onMouseLeave={() => setHoveredNewsId(null)}
                  onClick={(e) => onNewsClick && onNewsClick(newsItem, e)}
                  className="news-item"
                >
                  <div style={styles.newsHeader}>
                    <div style={styles.newsDateContainer}>
                      {getNewsIcon(newsItem.type)}
                      <span style={{
                        ...styles.newsBadge,
                        ...getBadgeStyle(newsItem.type)
                      }}>
                        {newsItem.date}
                      </span>
                    </div>
                  </div>

                  <h4 style={styles.newsTitle}>{newsItem.title}</h4>
                  <p style={styles.newsContent}>{newsItem.content}</p>
                </div>
              ))}
            </div>

            <button style={styles.viewAllButton} className="view-all-button">
              <span>View All Updates</span>
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Learning Tab Content */}
        {user && activeTab === 'learning' && (
          <div>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>
                <BookOpen size={20} />
                <span>Learning Progress</span>
              </h3>
            </div>

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
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white'
                }}>
                  Weekly Goal
                </span>
                <span style={{
                  fontSize: '12px',
                  color: '#8b5cf6',
                  fontWeight: '600'
                }}>
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
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#22c55e',
                  marginBottom: '4px'
                }}>
                  {userLearningData.streak}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Day Streak
                </div>
              </div>
              <div style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#f59e0b',
                  marginBottom: '4px'
                }}>
                  {userLearningData.certificates}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Certificates
                </div>
              </div>
            </div>

            {/* Recent Achievement */}
            {userLearningData.recentAchievements.length > 0 && (
              <div style={{
                padding: '12px',
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))',
                borderRadius: '10px',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                marginBottom: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <Award size={16} color="#f59e0b" />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#f59e0b'
                  }}>
                    New Achievement!
                  </span>
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '2px'
                }}>
                  {userLearningData.recentAchievements[0].title}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  {userLearningData.recentAchievements[0].description}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Events Tab Content */}
        {user && activeTab === 'events' && (
          <div>
            <div style={styles.sidebarHeader}>
              <h3 style={styles.sidebarTitle}>
                <Calendar size={20} />
                <span>Upcoming Events</span>
              </h3>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '20px'
            }}>
              {userLearningData.upcomingEvents.map(event => (
                <div
                  key={event.id}
                  style={{
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '10px',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  className="interactive-hover"
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '6px'
                  }}>
                    <div style={{
                      padding: '4px',
                      background: event.type === 'webinar' 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(139, 92, 246, 0.2)',
                      borderRadius: '4px'
                    }}>
                      {event.type === 'webinar' ? (
                        <Users size={12} color="#3b82f6" />
                      ) : (
                        <Target size={12} color="#8b5cf6" />
                      )}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      color: event.type === 'webinar' ? '#3b82f6' : '#8b5cf6',
                      fontWeight: '600',
                      textTransform: 'uppercase'
                    }}>
                      {event.type}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '4px'
                  }}>
                    {event.title}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Clock size={10} />
                    {event.date}
                  </div>
                </div>
              ))}
            </div>

            <button style={{
              ...styles.viewAllButton,
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              marginBottom: '20px'
            }}>
              <span>View Calendar</span>
              <Calendar size={16} />
            </button>
          </div>
        )}

        {/* Platform Stats (always visible) */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
          borderRadius: '16px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
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
            <Zap size={16} style={{ color: '#a855f7' }} />
            Platform Stats
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Live Viewers</span>
              <span style={{ 
                color: '#22c55e', 
                fontWeight: '600',
                textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
              }}>12,847</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Total Videos</span>
              <span style={{ color: 'white', fontWeight: '600' }}>127</span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px'
            }}>
              <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Today's Views</span>
              <span style={{ 
                color: '#60a5fa', 
                fontWeight: '600',
                textShadow: '0 0 10px rgba(96, 165, 250, 0.5)'
              }}>25.3K</span>
            </div>
            {user && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Your Progress</span>
                <span style={{ 
                  color: '#8b5cf6', 
                  fontWeight: '600',
                  textShadow: '0 0 10px rgba(139, 92, 246, 0.5)'
                }}>
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