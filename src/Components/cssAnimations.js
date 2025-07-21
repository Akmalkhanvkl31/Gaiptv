const cssAnimations = `
  /* CORE ANIMATIONS - ENHANCED */
  @keyframes pulse {
    0%, 100% { 
      opacity: 1; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.7; 
      transform: scale(1.05);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }

  @keyframes loadingProgress {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  @keyframes bgAnimation {
    0%, 100% {
      transform: scale(1) rotate(0deg);
      opacity: 0.3;
    }
    33% {
      transform: scale(1.1) rotate(120deg);
      opacity: 0.5;
    }
    66% {
      transform: scale(0.9) rotate(240deg);
      opacity: 0.4;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
    }
    50% {
      box-shadow: 0 0 40px rgba(139, 92, 246, 0.8);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes typewriter {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

  @keyframes blink {
    from, to {
      border-color: transparent;
    }
    50% {
      border-color: #8b5cf6;
    }
  }

  /* PROFESSIONAL MINI PLAYER ANIMATIONS */
  @keyframes miniPlayerSlide {
    from { 
      opacity: 0; 
      transform: translateX(100%) scale(0.8); 
    }
    to { 
      opacity: 1; 
      transform: translateX(0) scale(1); 
    }
  }

  @keyframes miniPlayerBounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes livePulse {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.1);
      box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
    }
  }

  @keyframes connectionBars {
    0%, 100% {
      height: 4px;
    }
    50% {
      height: 8px;
    }
  }

  /* ENHANCED COMPONENT ANIMATIONS */
  .video-card {
    animation: slideUp 0.6s ease-out;
  }
  
  .video-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(139, 92, 246, 0.25);
    border: 2px solid rgba(139, 92, 246, 0.4);
  }
  
  .video-card:hover .play-overlay {
    opacity: 1;
    transform: scale(1);
  }
  
  .video-card:hover .playButton {
    transform: scale(1.15);
  }
  
  .video-card:hover .video-thumbnail {
    transform: scale(1.05);
  }
  
  /* ENHANCED NAVIGATION ANIMATIONS */
  .nav-button {
    position: relative;
    overflow: hidden;
  }
  
  .nav-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transition: left 0.6s;
  }
  
  .nav-button:hover::before {
    left: 100%;
  }
  
  .nav-button:hover {
    background-color: rgba(139, 92, 246, 0.2) !important;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
  }
  
  /* ENHANCED SEARCH ANIMATIONS */
  .search-input {
    transition: all 0.4s ease;
  }
  
  .search-input:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
    transform: scale(1.02);
    background: rgba(15, 15, 35, 0.9);
  }
  
  /* ENHANCED NEWS ANIMATIONS */
  .news-item {
    transition: all 0.4s ease;
  }
  
  .news-item:hover {
    background-color: rgba(139, 92, 246, 0.1);
    transform: translateX(8px) translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.4);
  }
  
  /* ENHANCED BUTTON ANIMATIONS */
  .view-all-button {
    position: relative;
    overflow: hidden;
  }
  
  .view-all-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s;
  }
  
  .view-all-button:hover::before {
    left: 100%;
  }
  
  .view-all-button:hover {
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
  }
  
  /* PROFESSIONAL MINI PLAYER ANIMATIONS */
  .mini-player {
    animation: miniPlayerSlide 0.6s ease-out;
  }
  
  .mini-player:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 40px 80px rgba(239, 68, 68, 0.4);
  }

  .mini-player:hover .expand-hint {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  .mini-player .live-badge {
    animation: livePulse 2s infinite;
  }
  
  /* ENHANCED CONTROL ANIMATIONS */
  .control-button:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.15);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }
  
  .mini-player-button:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: scale(1.15);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  }
  
  /* ENHANCED LOADING ANIMATIONS */
  .loading-spinner {
    animation: spin 1s linear infinite;
  }
  
  .loading-content {
    animation: fadeIn 1.2s ease-out;
  }

  .loading-logo {
    animation: float 4s ease-in-out infinite;
  }

  .loading-title {
    animation: slideIn 1s ease-out;
    animation-delay: 0.3s;
    animation-fill-mode: both;
  }

  .loading-subtitle {
    animation: slideIn 1s ease-out;
    animation-delay: 0.5s;
    animation-fill-mode: both;
  }

  .loading-bar {
    animation: slideIn 1s ease-out;
    animation-delay: 0.7s;
    animation-fill-mode: both;
  }
  
  /* ENHANCED POPUP ANIMATIONS */
  .news-popup {
    animation: scaleIn 0.4s ease-out;
  }
  
  /* ENHANCED LAYOUT ANIMATIONS */
  .header {
    animation: slideIn 1s ease-out;
  }
  
  .sidebar-content {
    animation: slideInFromRight 1.2s ease-out;
  }
  
  .welcome-section {
    animation: slideUp 0.8s ease-out;
  }
  
  .welcome-title {
    animation: slideIn 0.6s ease-out;
    animation-delay: 0.2s;
    animation-fill-mode: both;
  }

  .welcome-subtitle {
    animation: slideIn 0.6s ease-out;
    animation-delay: 0.4s;
    animation-fill-mode: both;
  }

  .stat-item {
    animation: bounceIn 0.8s ease-out;
  }

  .stat-item:nth-child(1) { animation-delay: 0.3s; animation-fill-mode: both; }
  .stat-item:nth-child(2) { animation-delay: 0.4s; animation-fill-mode: both; }
  .stat-item:nth-child(3) { animation-delay: 0.5s; animation-fill-mode: both; }
  
  /* ENHANCED PLAYER ANIMATIONS */
  .live-player-container:hover {
    transform: scale(1.005);
    box-shadow: 0 40px 80px rgba(139, 92, 246, 0.25);
  }
  
  .media-controls {
    transition: opacity 0.4s ease;
  }
  
  .media-player-container:hover .media-controls {
    opacity: 1;
  }
  
  .progress-bar {
    transition: width 0.2s ease;
  }
  
  .progress-container:hover .progress-bar {
    box-shadow: 0 0 15px rgba(139, 92, 246, 0.6);
  }
  
  /* ENHANCED DROPDOWN ANIMATIONS */
  .dropdown {
    animation: fadeIn 0.3s ease-out;
  }
  
  .dropdown-item:hover {
    background-color: rgba(139, 92, 246, 0.15);
    transform: translateX(6px);
    border-radius: 8px;
  }
  
  /* ENHANCED NOTIFICATION ANIMATIONS */
  .notification-button:hover {
    transform: scale(1.1);
    background-color: rgba(139, 92, 246, 0.2);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }
  
  .profile-button:hover {
    transform: scale(1.05);
    background-color: rgba(139, 92, 246, 0.15);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.25);
  }
  
  .refresh-button:hover {
    transform: rotate(180deg);
    background-color: rgba(139, 92, 246, 0.4);
  }
  
  .close-button:hover {
    background-color: rgba(239, 68, 68, 0.4);
    transform: scale(1.15);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }
  
  /* ENHANCED LOGO ANIMATIONS */
  .logo-background {
    transition: all 0.4s ease;
  }
  
  .logo-background:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5);
  }
  
  /* ENHANCED CATEGORY ANIMATIONS */
  .category:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.4));
    transform: scale(1.08);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
  }
  
  .live-control-button:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.15);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
  }
  
  .search-button:hover {
    color: #8b5cf6;
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  }

  /* AUTHENTICATION ANIMATIONS */
  .auth-container {
    animation: fadeIn 1.2s ease-out;
  }

  .auth-logo {
    animation: bounceIn 1.4s ease-out;
  }

  .auth-form {
    animation: slideInFromRight 1s ease-out;
  }

  .auth-branding {
    animation: slideInFromLeft 1s ease-out;
  }

  .feature-item {
    animation: slideIn 0.8s ease-out;
  }

  .feature-item:nth-child(1) { animation-delay: 0.1s; animation-fill-mode: both; }
  .feature-item:nth-child(2) { animation-delay: 0.2s; animation-fill-mode: both; }
  .feature-item:nth-child(3) { animation-delay: 0.3s; animation-fill-mode: both; }
  .feature-item:nth-child(4) { animation-delay: 0.4s; animation-fill-mode: both; }

  .input-group {
    animation: slideIn 0.6s ease-out;
  }

  .input-group:nth-child(1) { animation-delay: 0.1s; animation-fill-mode: both; }
  .input-group:nth-child(2) { animation-delay: 0.2s; animation-fill-mode: both; }
  .input-group:nth-child(3) { animation-delay: 0.3s; animation-fill-mode: both; }
  .input-group:nth-child(4) { animation-delay: 0.4s; animation-fill-mode: both; }

  .submit-button {
    animation: slideIn 0.6s ease-out;
    animation-delay: 0.5s;
    animation-fill-mode: both;
  }

  .submit-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(139, 92, 246, 0.6);
  }

  .mode-toggle-button:hover {
    color: #a855f7;
    transform: scale(1.05);
  }

  .forgot-password:hover {
    color: #8b5cf6;
    transform: scale(1.02);
  }

  .skip-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
  }

  /* ENHANCED INPUT ANIMATIONS */
  .input-container input:focus + .input-icon {
    color: #8b5cf6;
    transform: scale(1.1);
  }

  .password-toggle:hover {
    color: white;
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }

  /* BACKGROUND PATTERN ANIMATION */
  .auth-bg-pattern {
    animation: bgAnimation 25s ease-in-out infinite;
  }

  /* TYPEWRITER EFFECT */
  .typewriter {
    overflow: hidden;
    border-right: 3px solid #8b5cf6;
    white-space: nowrap;
    animation: typewriter 4s steps(40, end), blink 0.75s step-end infinite;
  }

  /* STAGGERED GRID ANIMATIONS */
  .grid > div {
    animation: slideUp 0.8s ease-out;
  }

  .grid > div:nth-child(1) { animation-delay: 0.1s; animation-fill-mode: both; }
  .grid > div:nth-child(2) { animation-delay: 0.2s; animation-fill-mode: both; }
  .grid > div:nth-child(3) { animation-delay: 0.3s; animation-fill-mode: both; }
  .grid > div:nth-child(4) { animation-delay: 0.4s; animation-fill-mode: both; }
  .grid > div:nth-child(5) { animation-delay: 0.5s; animation-fill-mode: both; }
  .grid > div:nth-child(6) { animation-delay: 0.6s; animation-fill-mode: both; }
  .grid > div:nth-child(7) { animation-delay: 0.7s; animation-fill-mode: both; }
  .grid > div:nth-child(8) { animation-delay: 0.8s; animation-fill-mode: both; }

  /* ENHANCED HOVER EFFECTS */
  .interactive-hover {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .interactive-hover:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.25);
  }

  /* PROFESSIONAL MICRO-INTERACTIONS */
  .micro-bounce:hover {
    animation: bounceIn 0.8s ease-out;
  }

  .micro-pulse:hover {
    animation: pulse 1.5s ease-in-out;
  }

  .micro-glow:hover {
    animation: glow 2s ease-in-out infinite;
  }

  /* ADMIN PANEL ANIMATIONS */
  .admin-panel {
    animation: scaleIn 0.5s ease-out;
  }

  .admin-tab {
    transition: all 0.3s ease;
  }

  .admin-tab:hover {
    background: rgba(139, 92, 246, 0.15);
    transform: translateX(4px);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .upload-progress {
    animation: loadingProgress 2s ease-in-out infinite;
  }

  /* LIVE STREAM SPECIFIC ANIMATIONS */
  .live-indicator {
    animation: livePulse 2s infinite;
  }

  .live-viewer-count {
    animation: miniPlayerBounce 3s ease-in-out infinite;
  }

  .connection-bars > div:nth-child(1) {
    animation: connectionBars 1s ease-in-out infinite;
    animation-delay: 0s;
  }

  .connection-bars > div:nth-child(2) {
    animation: connectionBars 1s ease-in-out infinite;
    animation-delay: 0.1s;
  }

  .connection-bars > div:nth-child(3) {
    animation: connectionBars 1s ease-in-out infinite;
    animation-delay: 0.2s;
  }

  .connection-bars > div:nth-child(4) {
    animation: connectionBars 1s ease-in-out infinite;
    animation-delay: 0.3s;
  }

  /* RESPONSIVE ANIMATION ADJUSTMENTS */
  @media (max-width: 768px) {
    .auth-branding,
    .auth-form {
      animation: fadeIn 1s ease-out;
    }
    
    .video-card:hover {
      transform: translateY(-4px) scale(1.01);
    }
    
    .mini-player:hover {
      transform: translateY(-4px) scale(1.01);
    }

    .interactive-hover:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 480px) {
    .video-card:hover {
      transform: translateY(-2px);
    }
    
    .mini-player:hover {
      transform: translateY(-2px);
    }

    .nav-button:hover {
      transform: translateY(-1px);
    }
  }

  /* ACCESSIBILITY - REDUCE MOTION */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    .pulse,
    .spin,
    .float,
    .glow,
    .livePulse {
      animation: none !important;
    }
  }

  /* ENHANCED FOCUS STATES FOR ACCESSIBILITY */
  *:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* SMOOTH SCROLLING */
  html {
    scroll-behavior: smooth;
  }

  /* ENHANCED GLASSMORPHISM EFFECTS */
  .glass-effect {
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .glass-effect:hover {
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  /* GRADIENT TEXT EFFECTS */
  .gradient-text {
    background: linear-gradient(45deg, #8b5cf6, #3b82f6, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: glow 3s ease-in-out infinite alternate;
  }

  /* PROFESSIONAL LOADING STATES */
  .skeleton-loading {
    background: linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.2) 50%, rgba(139,92,246,0.1) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
  }

  /* ENHANCED SCROLL INDICATORS */
  .scroll-indicator {
    background: linear-gradient(to right, #8b5cf6, #3b82f6);
    height: 3px;
    position: fixed;
    top: 72px;
    left: 0;
    z-index: 1001;
    transition: width 0.1s ease;
  }
`;

export default cssAnimations;