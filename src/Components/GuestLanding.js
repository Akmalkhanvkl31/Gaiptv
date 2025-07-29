import React, { useState, useEffect } from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdBanner from './AdBanner';
import LivePlayer from './LivePlayer';
import styles from './Styles';

const GuestLanding = ({ liveStreams, featuredVideos, news }) => {
  const [selectedLiveStream, setSelectedLiveStream] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const navigate = useNavigate();  // ✅ for routing

  useEffect(() => {
    if (liveStreams && liveStreams.length > 0) {
      setSelectedLiveStream(liveStreams[0]);
    }
  }, [liveStreams]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
      color: 'white',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Hero Section */}
      <div style={{ padding: '60px 24px' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left side content */}
          <div>
            <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '700', marginBottom: '20px' }}>
              Professional Insurance Broadcasting
            </h1>
            <p style={{ fontSize: '20px', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '32px' }}>
              Join thousands of insurance professionals watching live events,
              accessing premium content, and staying ahead of industry trends.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <button
                onClick={() => navigate('/auth?form=signup')}  // ✅ Signup redirect
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Get Started Free <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right side - Video Player */}
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: '#000',
            borderRadius: '20px',
            overflow: 'hidden'
          }}>
            {selectedLiveStream && (
              <LivePlayer video={selectedLiveStream} autoplay={true} />
            )}
            {showOverlay && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                textAlign: 'center'
              }}>
                <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Access Exclusive Content</h2>
                <p style={{ fontSize: '16px', marginBottom: '30px' }}>Sign in or create an account to continue watching.</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <button 
                    onClick={() => navigate('/auth?form=signin')}  // ✅ Signin redirect
                    style={{ ...styles.button, background: '#8b5cf6' }}
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => navigate('/auth?form=signup')}
                    style={{ ...styles.button, background: 'transparent', border: '1px solid #8b5cf6' }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* More sections like AdBanner, Featured, News, etc. */}
      {/* <AdBanner /> */}
    </div>
  );
};

export default GuestLanding;
