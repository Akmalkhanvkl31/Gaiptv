import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Components/AuthContext';
import Header from './Components/Header';
import LivePlayer from './Components/LivePlayer';
import VideoGrid from './Components/VideoGrid';
import Sidebar from './Components/Sidebar';
import MiniPlayer from './Components/MiniPlayer';
import NewsPopup from './Components/NewsPopup';
import AdBanner from './Components/AdBanner';
import ShimmerLoading from './Components/ShimmerLoading';
import mockData from './Components/mockData';
import './MainApplication.css';
import cssAnimations from './Components/cssAnimations';

const MainApplication = () => {
    const {
        user,
        profile,
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
    const [miniPlayerClosed, setMiniPlayerClosed] = useState(false);
    const [lastClosedVideo, setLastClosedVideo] = useState(null);

    // UI state
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsPosition, setNewsPosition] = useState({ x: 0, y: 0 });

    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [activeLiveStream, setActiveLiveStream] = useState(null);
    const [liveStreamPaused, setLiveStreamPaused] = useState(false);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [savedVideoIds, setSavedVideoIds] = useState(new Set());
    const [scrollBasedMiniPlayer, setScrollBasedMiniPlayer] = useState(false);

    const playerRef = useRef(null);
    const autoplayAttempted = useRef(false);
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

        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleUserInteraction);
            });
            window.removeEventListener('resize', handleResize);
        };
    }, [handleUserInteraction]);

    useEffect(() => {
        const initializeApp = async () => {
            if (user) {
                try {
                    const savedResult = await getSavedVideos();
                    if (savedResult.success && savedResult.data) {
                        setSavedVideoIds(new Set(savedResult.data.map(item => item.video_id)));
                    }
                } catch (error) {
                    console.error('Failed to load saved videos:', error);
                }
            }

            if (mockData.liveStreams.length > 0) {
                const firstLiveStream = mockData.liveStreams[0];
                setCurrentVideo(firstLiveStream);
                setActiveLiveStream(firstLiveStream);
                setAutoplayEnabled(true);
                autoplayAttempted.current = true;
            }
        };
        initializeApp();
    }, [user, getSavedVideos]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isPlayerVisible = entry.isIntersecting;
                if (activeLiveStream && window.scrollY > 150) {
                    if (!isPlayerVisible) {
                        setScrollBasedMiniPlayer(true);
                        setMiniPlayerVideo(activeLiveStream);
                        setShowMiniPlayer(true);
                    } else {
                        setScrollBasedMiniPlayer(false);
                        setShowMiniPlayer(false);
                        setMiniPlayerVideo(null);
                    }
                }
            },
            { threshold: 0.3 }
        );

        if (playerRef.current) {
            observer.observe(playerRef.current);
        }

        return () => {
            if (playerRef.current) {
                observer.unobserve(playerRef.current);
            }
        };
    }, [activeLiveStream]);

    const handleVideoSelect = async (video) => {
        handleUserInteraction();
        setScrollBasedMiniPlayer(false);

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
            }
            setCurrentVideo(video);
        }

        if (user && !video.isLive) {
            try {
                await updateWatchProgress(video.id, 0, 0);
            } catch (error) {
                console.error('Failed to track video selection:', error);
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
        if (miniPlayerVideo?.isLive) {
            handleVideoSelect(miniPlayerVideo);
            if (playerRef.current) {
                playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleCloseMiniPlayer = () => {
        setShowMiniPlayer(false);
        setLastClosedVideo(miniPlayerVideo);
        setMiniPlayerVideo(null);
        setScrollBasedMiniPlayer(false);
        setActiveLiveStream(null);
        setLiveStreamPaused(true);
        setMiniPlayerClosed(true);
    };

    const handleReopenMiniPlayer = () => {
        if (lastClosedVideo) {
            setMiniPlayerVideo(lastClosedVideo);
            setActiveLiveStream(lastClosedVideo);
            setShowMiniPlayer(true);
            setMiniPlayerClosed(false);
            setLiveStreamPaused(false);
            setAutoplayEnabled(true);
        }
    };

    const handleMinimizePlayer = () => {
        if (currentVideo?.isLive) {
            setMiniPlayerVideo(currentVideo);
            setShowMiniPlayer(true);
            setScrollBasedMiniPlayer(false);
            setCurrentVideo(null);
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
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const allVideos = [...mockData.liveStreams, ...mockData.featuredVideos];

    return (
        <div className="main-application">
            <style>{cssAnimations}</style>
            
            <Header
                onSearch={handleSearch}
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                user={user}
                profile={profile}
                onLogout={handleLogout}
                onShowAuth={() => navigate('/auth')}
                onShowAbout={() => navigate('/about')}
                isGuestMode={false}
                currentVideo={currentVideo}
                activeLiveStream={activeLiveStream}
                onLiveStreamToggle={handleLiveStreamToggle}
                liveStreamPaused={liveStreamPaused}
            />

            <div className="main-content">
                <div className="content-area">
                    <div 
                        ref={playerRef} 
                        className={`player-container ${activeLiveStream ? 'live' : 'vod'}`}
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
                            <div className="loading-player">
                                <ShimmerLoading type="player" />
                            </div>
                        )}

                    </div>

                    <AdBanner 
                        user={user}
                        position="below-player"
                    />

                    <div className="video-grid-container">
                        <div className="section-header">
                            <h2 className="section-title">
                                {selectedCategory === 'All' ? 'Featured Videos' : selectedCategory}
                            </h2>
                            {mockData.liveStreams.length > 0 && (
                                <div className="live-indicator-main">
                                    <div className="dot"></div>
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

                {!isMobile && (
                    <div className="sidebar-container">
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
                )}
            </div>

            {showMiniPlayer && miniPlayerVideo && miniPlayerVideo.isLive && !liveStreamPaused && (
                <MiniPlayer video={miniPlayerVideo} onClose={handleCloseMiniPlayer} onMaximize={handleMaximizeMiniPlayer} autoplay={true} muted={scrollBasedMiniPlayer} isScrollBased={scrollBasedMiniPlayer} position="bottom-right" isActiveStream={miniPlayerVideo.id === activeLiveStream?.id} />
            )}

            {miniPlayerClosed && (
                <button
                    onClick={handleReopenMiniPlayer}
                    className="reopen-mini-player-button"
                    title="Reopen Mini Player"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 3-6.5 6.5a.9.9 0 0 0 0 1.3L15 17.5V21l-10-10L15 3z"/></svg>
                </button>
            )}

            {selectedNews && <NewsPopup newsItem={selectedNews} onClose={handleCloseNews} position={newsPosition} />}
        </div>
    );
};

export default MainApplication;
