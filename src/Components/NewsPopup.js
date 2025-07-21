import React from 'react';
import { X, AlertCircle, TrendingUp, Clock, ExternalLink } from 'lucide-react';
import styles from './Styles';

const NewsPopup = ({ newsItem, onClose, position }) => {
  if (!newsItem) return null;

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

  const getPriorityColor = (type) => {
    switch (type) {
      case 'breaking':
        return '#f87171';
      case 'update':
        return '#60a5fa';
      default:
        return '#9ca3a';
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99,
          backdropFilter: 'blur(5px)'
        }}
        onClick={onClose}
      />
      
      {/* Popup Modal */}
      <div 
        style={{
          ...styles.popup,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '500px',
          width: '90%'
        }}
        className="news-popup"
      >
        {/* Header */}
        <div style={styles.popupHeader}>
          <div style={styles.newsDateContainer}>
            {getNewsIcon(newsItem.type)}
            <span style={{
              ...styles.newsBadge, 
              ...getBadgeStyle(newsItem.type)
            }}>
              {newsItem.type.toUpperCase()}
            </span>
            <span style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginLeft: '8px'
            }}>
              {newsItem.date}
            </span>
          </div>
          <button 
            onClick={onClose} 
            style={styles.closeButton}
            className="close-button"
          >
            <X size={16} />
          </button>
        </div>

        {/* Priority Indicator */}
        <div style={{
          height: '3px',
          background: `linear-gradient(90deg, ${getPriorityColor(newsItem.type)}, transparent)`,
          borderRadius: '2px',
          marginBottom: '20px'
        }} />

        {/* Title */}
        <h4 style={styles.popupTitle}>{newsItem.title}</h4>
        
        {/* Content */}
        <p style={styles.popupContent}>{newsItem.content}</p>

        {/* Extended Content (simulated) */}
        <div style={{
          marginTop: '16px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '12px'
          }}>
            This development is expected to have significant implications across multiple sectors. 
            Industry experts are closely monitoring the situation and providing continuous updates 
            as more information becomes available.
          </p>
          <p style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '13px',
            lineHeight: '1.5'
          }}>
            Stay tuned to GAIPTV for the latest updates and comprehensive coverage of this 
            developing story. Our team of professional journalists is working around the clock 
            to bring you accurate and timely information.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '12px',
          alignItems: 'center'
        }}>
          <button style={{
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.3s ease'
          }}>
            <ExternalLink size={14} />
            Read Full Article
          </button>
          
          <button style={{
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}>
            Share
          </button>
        </div>

        {/* Source Information */}
        <div style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            Source: GAIPTV News Team
          </span>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            Updated: {newsItem.date}
          </span>
        </div>
      </div>
    </>
  );
};

export default NewsPopup;