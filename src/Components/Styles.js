const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    padding: '20px 0',
    width: '100%',
  },
  videoCard: {
    position: 'relative',
    backgroundColor: '#111827',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '360px',
  },
  videoCardActive: {
    boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.5)',
  },
  videoThumbnail: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  playOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 5,
  },
  playButton: {
    width: '48px',
    height: '48px',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: '50%',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  duration: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
  },
  nowPlaying: {
    position: 'absolute',
    top: '8px',
    left: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '8px',
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    color: '#8b5cf6',
    fontSize: '10px',
    fontWeight: '600',
  },
  nowPlayingDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#8b5cf6',
    borderRadius: '50%',
  },
  nowPlayingText: {},
  cardContent: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '8px',
    lineHeight: '1.3',
  },
  cardDescription: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '12px',
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    marginBottom: '12px',
  },
  uploadDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  category: {
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  noResults: {
    textAlign: 'center',
    padding: '40px 20px',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  // Responsive Additions
  '@media screen and (max-width: 768px)': {
    videoCard: {
      minHeight: '300px',
    },
    cardTitle: {
      fontSize: '14px',
    },
    cardDescription: {
      fontSize: '12px',
    },
    cardMeta: {
      fontSize: '11px',
    },
    duration: {
      fontSize: '10px',
    },
  }
};

export default styles;