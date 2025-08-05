import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './Components/Header';
import LivePlayer from './Components/LivePlayer';
import VideoGrid from './Components/VideoGrid';
import Sidebar from './Components/Sidebar';
import MiniPlayer from './Components/MiniPlayer';
import mockData from './Components/mockData';
import styles from './Components/Styles';
import cssAnimations from './Components/cssAnimations';

const MainApplication = () => {
    const {
        user,
        signOut,
        saveVideo,
        getSavedVideos,
        updateWatchProgress
    } = useAuth();

    // Core state
    const [currentVideo, setCurrentVideo] = useState(null);
    const [miniPlayerVideo, setMiniPlayerVideo] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [showMiniPlayer, setShowMiniPlayer] = useState(false);

    // UI state
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsPosition, setNewsPosition] = useState({ x: 0, y: 0 });

    // Enhanced scroll-based mini player state
    const [scrollY, setScrollY] = useState(0);
    const [playerInView, setPlayerInView] = useState(true);
    const [scrollBasedMiniPlayer, setScrollBasedMiniPlayer] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastScrollDirection, setLastScrollDirection] = useState(null);

    // State for managing active live stream
    const [activeLiveStream, setActiveLiveStream] = useState(null);
    const [liveStreamPaused, setLiveStreamPaused] = useState(false);
    const [miniPlayerTriggered, setMiniPlayerTriggered] = useState(false);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);

    // User data state
    const [savedVideoIds, setSavedVideoIds] = useState(new Set());

    // Refs for scroll detection
    const playerRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const lastScrollY = useRef(0);
    const autoplayAttempted = useRef(false);
    const scrollThreshold = 150;
    const playerVisibilityThreshold = 0.3;

    const navigate = useNavigate();

    // Handle user interaction for autoplay
    const handleUserInteraction = useCallback(() => {
        if (!hasUserInteracted) {
            setHasUserInteracted(true);
            setSoundEnabled(true);
            console.log('🎵 User interaction detected - enabling sound');

            if (activeLiveStream && !autoplayAttempted.current) {
                console.log('🔴 Starting autoplay after user interaction');
                autoplayAttempted.current = true;
            }
        }
    }, [hasUserInteracted, activeLiveStream]);

    useEffect(() => {
        const events = ['click', 'keydown', 'scroll', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, handleUserInteraction, { once: true, passive: true });
        });
        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
        };
    }, [handleUserInteraction]);

    useEffect(() => {
        const initializeUserData = async () => {
            if (user) {
                console.log('User authenticated:', user.email);
                try {
                    const savedResult = await getSavedVideos();
                    if (savedResult.success && savedResult.data) {
                        setSavedVideoIds(new Set(savedResult.data.map(item => item.video_id)));
                    }
                } catch (error) {
                    console.error('Failed to load saved videos:', error);
                }

                if (mockData.liveStreams.length > 0) {
                    const firstLiveStream = mockData.liveStreams[0];
                    setCurrentVideo(firstLiveStream);
                    setActiveLiveStream(firstLiveStream);
                    setAutoplayEnabled(true);
                    console.log('🔴 AUTO-STARTING LIVE STREAM:', firstLiveStream.title);
                    autoplayAttempted.current = true;
                }
            }
        };
        initializeUserData();
    }, [user, getSavedVideos]);

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
        
        setScrollY(currentScrollY);
        setIsScrolling(true);
        setLastScrollDirection(scrollDirection);

        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        if (playerRef.current) {
            const rect = playerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const playerHeight = rect.height;
            const visibilityRatio = Math.max(0, visibleHeight) / playerHeight;
            
            const isPlayerVisible = visibilityRatio >= playerVisibilityThreshold;
            setPlayerInView(isPlayerVisible);

            if (activeLiveStream && !miniPlayerTriggered) {
                if (scrollDirection === 'down' && currentScrollY > scrollThreshold && !isPlayerVisible) {
                    console.log('🔴 Auto-triggering mini player for live stream');
                    setScrollBasedMiniPlayer(true);
                    setMiniPlayerVideo(activeLiveStream);
                    setShowMiniPlayer(true);
                    setMiniPlayerTriggered(true);
                }
            } 
            
            if (scrollBasedMiniPlayer && scrollDirection === 'up' && isPlayerVisible) {
                console.log('🔴 Hiding mini player - player back in view');
                setScrollBasedMiniPlayer(false);
                setShowMiniPlayer(false);
                setMiniPlayerVideo(null);
                setMiniPlayerTriggered(false);
            }
        }

        scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, 100);

        lastScrollY.current = currentScrollY;
    }, [activeLiveStream, scrollBasedMiniPlayer, scrollThreshold, playerVisibilityThreshold, miniPlayerTriggered]);

    const throttledScrollHandler = useCallback(() => {
        requestAnimationFrame(handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        const options = { passive: true };
        window.addEventListener('scroll', throttledScrollHandler, options);
        return () => {
            window.removeEventListener('scroll', throttledScrollHandler);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [throttledScrollHandler]);

    const handleVideoSelect = async (video) => {
        console.log('🎥 Video selected:', video.title, 'isLive:', video.isLive);
        handleUserInteraction();
        setScrollBasedMiniPlayer(false);
        setMiniPlayerTriggered(false);
        
        if (video.isLive) {
            setCurrentVideo(video);
            setActiveLiveStream(video);
            setShowMiniPlayer(false);
            setMiniPlayerVideo(null);
            setLiveStreamPaused(false);
            setAutoplayEnabled(true);
            setSoundEnabled(hasUserInteracted);
        } else {
            if (activeLiveStream) {
                setMiniPlayerVideo(activeLiveStream);
                setShowMiniPlayer(true);
                setCurrentVideo(video);
                setLiveStreamPaused(false);
            } else {
                setCurrentVideo(video);
                setShowMiniPlayer(false);
                setMiniPlayerVideo(null);
            }
            
            if (user) {
                try {
                    await updateWatchProgress(video.id, 0, 0);
                } catch (error) {
                    console.error('Failed to track video selection:', error);
                }
            }
        }

        if (playerRef.current) {
            playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleVideoSave = async (videoId) => {
        if (!user) return;
        try {
            const result = await saveVideo(videoId);
            if (result.success) {
                setSavedVideoIds(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(videoId)) newSet.delete(videoId);
                    else newSet.add(videoId);
                    return newSet;
                });
            }
        } catch (error) {
            console.error('Failed to save/unsave video:', error);
        }
    };

    const handleMaximizeMiniPlayer = () => {
        if (miniPlayerVideo && miniPlayerVideo.isLive) {
            setCurrentVideo(miniPlayerVideo);
            setActiveLiveStream(miniPlayerVideo);
            setMiniPlayerVideo(null);
            setShowMiniPlayer(false);
            setScrollBasedMiniPlayer(false);
            setMiniPlayerTriggered(false);
            setLiveStreamPaused(false);
            setAutoplayEnabled(true);
            setSoundEnabled(hasUserInteracted);
            
            if (playerRef.current) {
                playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleCloseMiniPlayer = () => {
        setShowMiniPlayer(false);
        setMiniPlayerVideo(null);
        setScrollBasedMiniPlayer(false);
        setMiniPlayerTriggered(false);
        setActiveLiveStream(null);
        setLiveStreamPaused(true);
    };

    const handleMinimizePlayer = () => {
        if (currentVideo && currentVideo.isLive) {
            setMiniPlayerVideo(currentVideo);
            setActiveLiveStream(currentVideo);
            setShowMiniPlayer(true);
            setScrollBasedMiniPlayer(false);
            setMiniPlayerTriggered(true);
            setCurrentVideo(null);
            setLiveStreamPaused(false);
        }
    };

    const handleSoundToggle = () => {
        const newSoundState = !soundEnabled;
        setSoundEnabled(newSoundState);
        if (newSoundState) handleUserInteraction();
    };

    const handleLiveStreamToggle = () => {
        if (activeLiveStream) {
            if (liveStreamPaused) {
                setMiniPlayerVideo(activeLiveStream);
                setShowMiniPlayer(true);
                setLiveStreamPaused(false);
                setAutoplayEnabled(true);
            } else {
                setShowMiniPlayer(false);
                setMiniPlayerVideo(null);
                setLiveStreamPaused(true);
                setAutoplayEnabled(false);
            }
        }
    };

    const handleSearch = (query) => setSearchQuery(query);
    const handleCategoryChange = (category) => setSelectedCategory(category);

    const handleNewsClick = (newsItem, event) => {
        const rect = event.target.getBoundingClientRect();
        setNewsPosition({ x: rect.left, y: rect.top });
        setSelectedNews(newsItem);
    };

    const handleCloseNews = () => setSelectedNews(null);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/guest');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const allVideos = [...mockData.liveStreams, ...mockData.featuredVideos];

    return (
        <div style={styles.container}>
            <style>{cssAnimations}</style>
            
            <Header
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                user={user}
                onLogout={handleLogout}
                onShowAuth={() => navigate('/auth')}
                onShowAbout={() => navigate('/about')}
                isGuestMode={false}
                currentVideo={currentVideo}
                activeLiveStream={activeLiveStream}
                onLiveStreamToggle={handleLiveStreamToggle}
                liveStreamPaused={liveStreamPaused}
            />

            {user?.user_metadata?.role === 'Admin' && (
                <button onClick={() => navigate('/admin')} style={{ position: 'fixed', bottom: '20px', right: '20px', padding: '12px 24px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', zIndex: 1001, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                    Admin Panel
                </button>
            )}

            <div style={{
                display: 'flex',
                gap: '24px',
                padding: '24px',
                maxWidth: '100%',
                margin: '0',
                minHeight: 'calc(100vh - 64px)',
                transition: 'all 0.5s ease'
            }}>
                <div style={{
                    flex: '1',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    overflow: 'hidden'
                }}>
                    <div 
                        ref={playerRef} 
                        style={{
                            position: 'relative',
                            width: '100%',
                            background: '#000',
                            overflow: 'hidden',
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            borderRadius: '20px',
                            boxShadow: activeLiveStream ? 
                                '0 0 50px rgba(239, 68, 68, 0.4), 0 0 100px rgba(239, 68, 68, 0.2)' :
                                '0 0 50px rgba(139, 92, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2)',
                            border: activeLiveStream ? 
                                '2px solid rgba(239, 68, 68, 0.4)' :
                                '1px solid rgba(139, 92, 246, 0.3)',
                            marginTop: '24px',
                            height: 'clamp(500px, 75vh, 900px)'
                        }}
                    >
                        {currentVideo ? (
                            <LivePlayer 
                                video={currentVideo} 
                                isMainPlayer={true}
                                autoplay={autoplayEnabled}
                                muted={!soundEnabled}
                                onMuteToggle={handleSoundToggle}
                                onMinimize={currentVideo && currentVideo.isLive ? handleMinimizePlayer : null}
                                showControls={true}
                                playerSize="cinema"
                            />
                        ) : (
                            <div style={styles.loading}>
                                <ShimmerLoading type="player" />
                            </div>
                        )}

                        {currentVideo?.isLive && autoplayEnabled && (
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.8))',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                fontWeight: '700',
                                color: 'white',
                                zIndex: 15,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)'
                            }}>
                                <div style={{
                                    width: '6px',
                                    height: '6px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    animation: 'pulse 1s infinite'
                                }}></div>
                                <span>AUTO-PLAY LIVE</span>
                                {soundEnabled && <span>🔊</span>}
                            </div>
                        )}
                    </div>

                    <AdBanner 
                        user={user}
                        position="below-player"
                    />

                    <div style={styles.videoGrid}>
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>
                                {selectedCategory === 'All' ? 'Featured Videos' : selectedCategory}
                            </h2>
                            {mockData.liveStreams.length > 0 && (
                                <div style={styles.liveIndicator}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        background: '#ef4444',
                                        borderRadius: '50%',
                                        animation: 'pulse 2s infinite'
                                    }}></div>
                                    <span>Live Now: {mockData.liveStreams[0].title}</span>
                                </div>
                            )}
                        </div>

                        <VideoGrid
                            videos={allVideos}
                            currentVideo={currentVideo}
                            onVideoSelect={handleVideoSelect}
                            searchQuery={searchQuery}
                            selectedCategory={selectedCategory}
                            onCategoryChange={handleCategoryChange}
                            user={user}
                            activeLiveStream={activeLiveStream}
                            savedVideoIds={savedVideoIds}
                            onVideoSave={handleVideoSave}
                        />
                    </div>
                </div>

                <div style={{
                    width: '400px',
                    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.9))',
                    borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '16px',
                    height: '100%',
                    overflow: 'auto',
                    boxShadow: '0 0 30px rgba(139, 92, 246, 0.1)',
                    flexShrink: 0,
                    transition: 'all 0.5s ease'
                }}>
                    <Sidebar
                        news={mockData.news}
                        onNewsClick={handleNewsClick}
                        user={user}
                        activeLiveStream={activeLiveStream}
                    />
                    
                    <AdBanner 
                        user={user}
                        position="sidebar"
                    />
                </div>
            </div>

            {showMiniPlayer && miniPlayerVideo && miniPlayerVideo.isLive && !liveStreamPaused && (
                <MiniPlayer video={miniPlayerVideo} onClose={handleCloseMiniPlayer} onMaximize={handleMaximizeMiniPlayer} autoplay={true} muted={scrollBasedMiniPlayer} isScrollBased={scrollBasedMiniPlayer} position="bottom-right" isActiveStream={miniPlayerVideo.id === activeLiveStream?.id} />
            )}
            {selectedNews && <NewsPopup newsItem={selectedNews} onClose={handleCloseNews} position={newsPosition} />}
        </div>
    );
};

export default MainApplication;
