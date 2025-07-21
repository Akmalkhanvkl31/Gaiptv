const styles = {
  // Base Styles
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
    color: 'white',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },

  // Loading Screen Styles
  loadingScreen: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  loadingContent: {
    textAlign: 'center',
    animation: 'fadeIn 0.8s ease-out'
  },
  loadingLogo: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '20px'
  },
  loadingTitle: {
    fontSize: '48px',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 10px 0'
  },
  loadingSubtitle: {
    color: '#a855f7',
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '30px'
  },
  loadingBar: {
    width: '300px',
    height: '4px',
    background: 'rgba(139, 92, 246, 0.2)',
    borderRadius: '2px',
    overflow: 'hidden',
    margin: '0 auto'
  },
  loadingProgress: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
    borderRadius: '2px',
    animation: 'loadingProgress 2s ease-in-out infinite'
  },

  // Authentication Styles
  authContainer: {
    minHeight: '100vh',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden'
  },
  authOverlayContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)'
  },
  authBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },
  authBgPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
    `,
    animation: 'bgAnimation 20s ease-in-out infinite'
  },
  authBgGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))'
  },
  authCloseButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '44px',
    height: '44px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '50%',
    color: '#ef4444',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    zIndex: 10,
    backdropFilter: 'blur(10px)'
  },
  authContent: {
    display: 'flex',
    width: '100%',
    position: 'relative',
    zIndex: 2
  },
  authBranding: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))'
  },
  brandingContent: {
    maxWidth: '500px',
    textAlign: 'center'
  },
  authLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '40px'
  },
  authLogoIcon: {
    position: 'relative',
    width: '60px',
    height: '60px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)'
  },
  authLogoDot: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    width: '16px',
    height: '16px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)'
  },
  authLogoText: {
    fontSize: '36px',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  },
  brandingTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '20px',
    lineHeight: '1.2'
  },
  brandingSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  featuresList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '40px',
    textAlign: 'left'
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '16px',
    fontWeight: '500'
  },
  skipButton: {
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backdropFilter: 'blur(10px)'
  },
  authForm: {
    flex: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
    backdropFilter: 'blur(20px)'
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px'
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  formTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px'
  },
  formSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.5'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  inputLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)'
  },
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    outline: 'none'
  },
  inputIcon: {
    position: 'absolute',
    left: '16px',
    color: 'rgba(139, 92, 246, 0.8)',
    zIndex: 1
  },
  inputError: {
    borderColor: '#ef4444',
    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
  },
  passwordToggle: {
    position: 'absolute',
    right: '16px',
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.3s ease'
  },
  errorText: {
    fontSize: '14px',
    color: '#ef4444',
    fontWeight: '500'
  },
  submitButton: {
    padding: '16px 24px',
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
    gap: '8px',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
    marginTop: '8px'
  },
  submitButtonLoading: {
    background: 'rgba(139, 92, 246, 0.6)',
    cursor: 'not-allowed'
  },
  loadingSpinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  modeToggle: {
    textAlign: 'center',
    marginTop: '24px'
  },
  modeToggleText: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  modeToggleButton: {
    background: 'none',
    border: 'none',
    color: '#8b5cf6',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'underline',
    transition: 'all 0.3s ease'
  },
  forgotPassword: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'underline',
    transition: 'all 0.3s ease',
    marginTop: '16px'
  },

  // Enhanced Header Styles
  header: {
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(26, 26, 46, 0.95))',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 40,
    boxShadow: '0 4px 30px rgba(139, 92, 246, 0.1)'
  },
  headerContent: {
    maxWidth: '100%',
    margin: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 24px',
    height: '60px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoIcon: {
    position: 'relative'
  },
  logoImage: {
    width: '40px',
    height: '40px',
    borderRadius: '8px'
  },
  logoBackground: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
  },
  liveDot: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '12px',
    height: '12px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0
  },
  logoSubtext: {
    color: '#a855f7',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    margin: 0,
    fontWeight: '500'
  },

  // Welcome Section Styles
  welcomeSection: {
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    animation: 'slideIn 0.6s ease-out'
  },
  welcomeContent: {
    flex: 1
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px'
  },
  welcomeSubtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.5'
  },
  userStats: {
    display: 'flex',
    gap: '32px'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    display: 'block',
    fontSize: '20px',
    fontWeight: '700',
    color: '#8b5cf6',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500'
  },

  // Guest Mode Styles
  guestBanner: {
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1))',
    borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
    padding: '12px 24px',
    animation: 'slideIn 0.6s ease-out'
  },
  guestBannerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1400px',
    margin: '0 auto'
  },
  guestBannerText: {
    flex: 1,
    color: 'white'
  },
  guestBannerButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  guestLoginButton: {
    padding: '8px 16px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  guestSignupButton: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
  },

  // Navigation Styles
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  navButton: {
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  },
  navButtonActive: {
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    color: 'white',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
  },
  navButtonInactive: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#d1d5db',
    backdropFilter: 'blur(10px)'
  },

  // Search Styles
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  searchInputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchInput: {
    padding: '12px 16px 12px 48px',
    borderRadius: '12px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    background: 'rgba(15, 15, 35, 0.8)',
    color: 'white',
    fontSize: '14px',
    width: '300px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  searchButton: {
    position: 'absolute',
    left: '12px',
    background: 'none',
    border: 'none',
    color: '#a855f7',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center'
  },

  // User Controls
  notificationButton: {
    position: 'relative',
    padding: '12px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
    border: 'none',
    borderRadius: '12px',
    color: '#d1d5db',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  notificationDot: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '8px',
    height: '8px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    boxShadow: '0 0 10px rgba(239, 68, 68, 0.6)'
  },
  profileContainer: {
    position: 'relative'
  },
  profileButton: {
    padding: '8px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
    border: 'none',
    borderRadius: '12px',
    color: '#d1d5db',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '8px',
    background: 'rgba(15, 15, 35, 0.95)',
    borderRadius: '12px',
    padding: '8px',
    minWidth: '200px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    zIndex: 50
  },
  dropdownItem: {
    width: '100%',
    padding: '12px 16px',
    background: 'none',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left'
  },

  // Main Content Layout - Enhanced for different screen sizes
  mainContent: {
    display: 'flex',
    gap: '24px',
    padding: '24px',
    maxWidth: '100%',
    margin: '0'
  },
  content: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sidebar: {
    width: '400px',
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
    borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
    borderRadius: '16px',
    height: '100%',
    overflow: 'auto',
    boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
    flexShrink: 0
  },

  // Enhanced Cinema Default & Theater Mode Player Styles
  videoPlayer: {
    position: 'relative',
    height: '65vh',
    width: '100%',
    background: '#000',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)'
  },

  cinemaPlayer: {
    position: 'relative',
    width: '100%',
    height: 'clamp(500px, 80vh, 1000px)',
    maxHeight: '1000px',
    background: '#000',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  theaterPlayer: {
    position: 'fixed',
    top: '60px',
    left: '0',
    right: '0',
    width: '100vw',
    height: 'clamp(200px, 25vh, 400px)',
    maxHeight: '400px',
    background: '#000',
    borderRadius: '0',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
    border: 'none',
    zIndex: 45,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  theaterPlayerControls: {
    position: 'fixed',
    top: '60px',
    left: '0',
    right: '0',
    zIndex: 46,
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(15, 15, 35, 0.95))',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(139, 92, 246, 0.3)',
    padding: '8px 24px',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  livePlayerContainer: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    background: '#000',
    transition: 'all 0.3s ease',
    width: '100%',
    height: '100%'
  },
  liveHeader: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
    padding: '20px',
    zIndex: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  liveBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)',
    padding: '8px 16px',
    borderRadius: '25px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'white',
    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
  },
  liveDotSmall: {
    width: '8px',
    height: '8px',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
  },
  liveControls: {
    display: 'flex',
    gap: '10px'
  },
  liveControlButton: {
    padding: '10px',
    background: 'rgba(0, 0, 0, 0.7)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  controlButtonActive: {
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
  },

  // Video Grid Styles
  videoGrid: {
    padding: '20px',
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.6), rgba(26, 26, 46, 0.4))',
    borderRadius: '16px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '15px'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  liveIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    boxShadow: '0 0 15px rgba(239, 68, 68, 0.2)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '15px'
  },

  // Video Card Styles
  videoCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    backdropFilter: 'blur(20px)',
    position: 'relative',
    transform: 'scale(1)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
  },
  videoCardActive: {
    boxShadow: '0 0 0 2px #8b5cf6, 0 25px 50px rgba(139, 92, 246, 0.4)',
    transform: 'translateY(-5px)'
  },
  videoThumbnail: {
    position: 'relative',
    aspectRatio: '16 / 9',
    backgroundColor: '#2a2a2a',
    overflow: 'hidden'
  },
  playOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8))',
    opacity: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  playButton: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  duration: {
    position: 'absolute',
    bottom: '12px',
    right: '12px',
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '6px 10px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    backdropFilter: 'blur(10px)'
  },
  nowPlaying: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
    padding: '6px 12px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '10px',
    fontWeight: '600',
    color: 'white',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
  },
  nowPlayingDot: {
    width: '6px',
    height: '6px',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  cardContent: {
    padding: '20px'
  },
  cardTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    marginBottom: '10px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.4'
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    marginBottom: '15px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: '1.5'
  },
  cardMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: '12px'
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  category: {
    padding: '6px 12px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
    color: '#a855f7',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '500',
    border: '1px solid rgba(139, 92, 246, 0.4)'
  },
  uploadDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '12px'
  },

  // Sidebar Styles
  sidebarContent: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
    borderRadius: '20px',
    padding: '25px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '25px'
  },
  sidebarTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    margin: 0
  },
  refreshButton: {
    padding: '8px',
    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.3))',
    border: 'none',
    borderRadius: '8px',
    color: '#a855f7',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  newsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '25px'
  },
  newsItem: {
    padding: '16px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
    borderRadius: '12px',
    border: '1px solid rgba(139, 92, 246, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  newsHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  newsDateContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  newsBadge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600'
  },
  newsBadgeBreaking: {
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.3))',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.4)'
  },
  newsBadgeUpdate: {
    background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(59, 130, 246, 0.3))',
    color: '#60a5fa',
    border: '1px solid rgba(96, 165, 250, 0.4)'
  },
  newsBadgeDefault: {
    background: 'linear-gradient(135deg, rgba(156, 163, 175, 0.3), rgba(107, 114, 128, 0.3))',
    color: '#ff5c00',
    border: '1px solid rgba(156, 163, 175, 0.4)'
  },
  newsTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  newsContent: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    lineHeight: '1.5'
  },
  viewAllButton: {
    width: '100%',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)',
    border: 'none',
    borderRadius: '12px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
  },

  // Enhanced Mini Player Styles with Theater Mode Support
  miniPlayer: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(15, 15, 35, 0.9))',
    border: '1px solid rgba(139, 92, 246, 0.4)',
    borderRadius: '16px',
    boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3), 0 0 60px rgba(139, 92, 246, 0.1)',
    zIndex: 50,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(20px)'
  },
  miniPlayerTheater: {
    bottom: '80px', // Higher position when theater mode is active
    right: '20px',
    zIndex: 44 // Below theater player
  },
  miniPlayerControls: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '8px',
    zIndex: 10
  },
  miniPlayerButton: {
    padding: '8px',
    background: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    color: 'white'
  },
  miniPlayerContent: {
    aspectRatio: '16 / 9',
    borderRadius: '16px',
    overflow: 'hidden'
  },

  // Media Player Styles
  mediaPlayerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#000',
    borderRadius: '16px',
    overflow: 'hidden'
  },
  mediaControls: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  controlButton: {
    padding: '8px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressContainer: {
    flex: 1,
    height: '6px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '3px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
    borderRadius: '3px',
    transition: 'width 0.1s ease'
  },
  timeDisplay: {
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    minWidth: '80px',
    textAlign: 'center'
  },

  // Loading and Shimmer Styles
  loading: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    flexDirection: 'column',
    gap: '15px'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(139, 92, 246, 0.3)',
    borderTop: '3px solid #8b5cf6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  shimmerCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(139, 92, 246, 0.05))',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative'
  },
  shimmerThumbnail: {
    height: '180px',
    background: 'linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.3) 50%, rgba(139,92,246,0.1) 100%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite'
  },
  shimmerContent: {
    padding: '20px'
  },
  shimmerTitle: {
    height: '16px',
    background: 'linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.2) 50%, rgba(139,92,246,0.1) 100%)',
    backgroundSize: '200% 100%',
    borderRadius: '4px',
    marginBottom: '10px',
    animation: 'shimmer 1.5s infinite'
  },
  shimmerDescription: {
    height: '12px',
    background: 'linear-gradient(90deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.15) 50%, rgba(139,92,246,0.08) 100%)',
    backgroundSize: '200% 100%',
    borderRadius: '4px',
    marginBottom: '8px',
    animation: 'shimmer 1.5s infinite'
  },
  noResults: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'rgba(255, 255, 255, 0.6)'
  },

  // Popup Styles
  popup: {
    position: 'fixed',
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(26, 26, 46, 0.95))',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)',
    zIndex: 100,
    maxWidth: '500px',
    width: '90%'
  },
  popupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px'
  },
  popupTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '12px',
    lineHeight: '1.4'
  },
  popupContent: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '16px'
  },
  closeButton: {
    padding: '8px',
    background: 'rgba(239, 68, 68, 0.2)',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    borderRadius: '50%',
    color: '#ef4444',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  // Enhanced Responsive Design for Cinema & Theater Modes
  '@media (max-width: 1600px)': {
    cinemaPlayer: {
      height: 'clamp(450px, 70vh, 800px)'
    },
    sidebar: {
      width: '380px'
    }
  },

  '@media (max-width: 1400px)': {
    cinemaPlayer: {
      height: 'clamp(400px, 60vh, 700px)'
    },
    sidebar: {
      width: '350px'
    },
    searchInput: {
      width: '250px'
    }
  },

  '@media (max-width: 1200px)': {
    mainContent: {
      flexDirection: 'column',
      height: 'auto'
    },
    cinemaPlayer: {
      height: 'clamp(350px, 50vh, 600px)'
    },
    theaterPlayer: {
      height: 'clamp(180px, 20vh, 300px)'
    },
    sidebar: {
      width: '100%',
      height: 'auto'
    },
    videoGrid: {
      height: 'auto',
      minHeight: '400px'
    },
    grid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '12px'
    }
  },

  '@media (max-width: 768px)': {
    headerContent: {
      padding: '12px 16px',
      flexWrap: 'wrap',
      gap: '12px'
    },
    nav: {
      display: 'none'
    },
    searchInput: {
      width: '180px'
    },
    mainContent: {
      padding: '16px',
      gap: '16px'
    },
    cinemaPlayer: {
      height: 'clamp(200px, 35vh, 450px)',
      borderRadius: '12px'
    },
    theaterPlayer: {
      height: 'clamp(150px, 18vh, 250px)',
      top: '60px'
    },
    theaterPlayerControls: {
      padding: '6px 16px'
    },
    grid: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '12px'
    },
    welcomeSection: {
      flexDirection: 'column',
      gap: '16px',
      textAlign: 'center'
    },
    userStats: {
      gap: '20px'
    },
    authBranding: {
      display: 'none'
    },
    authContent: {
      display: 'block'
    },
    authForm: {
      padding: '40px 20px'
    },
    miniPlayer: {
      width: 'clamp(250px, 80vw, 320px) !important',
      bottom: '16px',
      right: '16px'
    },
    miniPlayerTheater: {
      bottom: '200px' // Higher for mobile theater mode
    }
  },

  '@media (max-width: 480px)': {
    mainContent: {
      padding: '12px'
    },
    cinemaPlayer: {
      height: 'clamp(180px, 30vh, 350px)',
      borderRadius: '8px'
    },
    theaterPlayer: {
      height: 'clamp(130px, 15vh, 200px)'
    },
    grid: {
      gridTemplateColumns: '1fr',
      gap: '10px'
    },
    sidebar: {
      padding: '16px'
    },
    sidebarContent: {
      padding: '16px'
    },
    headerContent: {
      padding: '8px 12px'
    },
    searchInput: {
      width: '150px'
    },
    logoText: {
      fontSize: '16px'
    },
    miniPlayer: {
      width: 'clamp(200px, 85vw, 280px) !important',
      bottom: '12px',
      right: '12px'
    },
    welcomeTitle: {
      fontSize: '20px'
    },
    welcomeSubtitle: {
      fontSize: '14px'
    }
  },

  // Theater Mode Specific Adjustments
  '@media (max-width: 768px)': {
    '.theater-mode .sidebar': {
      marginTop: 'clamp(200px, 25vh, 320px)'
    },
    '.theater-mode .content-section': {
      paddingTop: 'clamp(200px, 25vh, 320px)'
    }
  },

  // Player Size Specific Styles
  playerSizeCompact: {
    height: 'clamp(200px, 30vh, 350px)',
    maxHeight: '350px'
  },

  playerSizeStandard: {
    height: 'clamp(280px, 45vh, 550px)',
    maxHeight: '550px'
  },

  playerSizeCinema: {
    height: 'clamp(500px, 80vh, 1000px)',
    maxHeight: '1000px'
  },

  playerSizeFullwidth: {
    height: 'clamp(350px, 60vh, 700px)',
    width: '100vw',
    marginLeft: '-24px',
    marginRight: '-24px',
    borderRadius: '0'
  },

  // Mini Player Size Variants
  miniPlayerCompact: {
    width: 'clamp(200px, 18vw, 280px)',
    aspectRatio: '16/9'
  },

  miniPlayerStandard: {
    width: 'clamp(280px, 23vw, 380px)',
    aspectRatio: '16/9'
  },

  miniPlayerCinema: {
    width: 'clamp(350px, 28vw, 450px)',
    aspectRatio: '16/9'
  },

  miniPlayerFullwidth: {
    width: 'clamp(320px, 25vw, 400px)',
    aspectRatio: '16/9'
  }
};

export default styles;
