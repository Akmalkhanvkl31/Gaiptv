import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminLogin = () => {
  const { signIn, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terminalText, setTerminalText] = useState('');
  const [borderColor, setBorderColor] = useState('#3b82f6');
  const audioRef = useRef({ context: null, oscillator: null, gain: null, interval: null });

  const bootSequence = [
    'INITIALIZING SECURE ADMIN PORTAL...',
    'LOADING ENCRYPTION MODULES...',
    'ESTABLISHING SECURE CONNECTION...',
    'VERIFYING ADMIN PRIVILEGES...',
    'SYSTEM READY > AWAITING CREDENTIALS'
  ];

  const stopAlarm = () => {
    if (audioRef.current.interval) {
      clearInterval(audioRef.current.interval);
    }
    if (audioRef.current.oscillator) {
      audioRef.current.oscillator.stop();
    }
    if (audioRef.current.context) {
      audioRef.current.context.close();
    }
    audioRef.current = { context: null, oscillator: null, gain: null, interval: null };
  };

  useEffect(() => {
    let index = 0;
    const bootInterval = setInterval(() => {
      if (index < bootSequence.length) {
        setTerminalText(prev => prev + bootSequence[index] + '\n');
        index++;
      } else {
        clearInterval(bootInterval);
      }
    }, 500);

    return () => {
      clearInterval(bootInterval);
      stopAlarm();
    };
  }, []);

  const playAlarm = async () => {
    stopAlarm(); // Stop any existing alarm

    const context = new (window.AudioContext || window.webkitAudioContext)();
    
    // Resume context if it's in a suspended state (for autoplay policies)
    if (context.state === 'suspended') {
      await context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(523, context.currentTime); // C5 note, very audible
    gain.gain.setValueAtTime(0.3, context.currentTime);

    oscillator.start();

    // For maximum reliability, we will use a continuous tone without pulsation.
    // The interval is not needed, so we clear it from the ref.
    if (audioRef.current.interval) {
      clearInterval(audioRef.current.interval);
    }

    audioRef.current = { context, oscillator, gain, interval: null };

    // Stop the alarm after 5 seconds
    setTimeout(() => {
      stopAlarm();
    }, 5000);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setTerminalText(prev => prev + '> ERROR: EMAIL AND PASSWORD REQUIRED\n');
      return;
    }

    setTerminalText(prev => prev + '\n> AUTHENTICATING ADMIN CREDENTIALS...\n');
    
    const result = await signIn(email, password);

    if (result.success) {
      // The onAuthStateChange listener in AuthContext will handle navigation.
      // We just need to show a success message here.
      stopAlarm();
      setBorderColor('#10b981'); // Green for success
      setTerminalText(prev => prev + '> AUTHENTICATION SUCCESSFUL\n> VERIFYING ADMIN PRIVILEGES...\n');
    } else {
      // Handle sign-in failure.
      playAlarm();
      setBorderColor('#ef4444'); // Red for error
      setTerminalText(prev => prev + `> AUTH ERROR: ACCESS DENIED. ${result.error || 'Invalid credentials.'}\n`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #111827 0%, #0f172a 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Courier New, monospace',
      padding: '20px'
    }}>
      {/* Matrix-style background animation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.1,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2361dafb' fill-opacity='0.3'%3E%3Ctext x='10' y='30' font-family='monospace' font-size='12'%3E01%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        animation: 'matrix 20s linear infinite',
        pointerEvents: 'none'
      }} />

      <div style={{
        width: '500px',
        background: '#1f2937',
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        boxShadow: `0 0 30px ${borderColor}, inset 0 0 20px rgba(0, 0, 0, 0.5)`,
        overflow: 'hidden',
        position: 'relative',
        transition: 'border-color 0.5s ease, box-shadow 0.5s ease'
      }}>
        {/* Terminal Header */}
        <div style={{
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
          padding: '8px 15px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 'bold' }}>
            ADMIN_PORTAL.exe
          </span>
          <div style={{ fontSize: '12px', color: '#ffffff' }}>
            [{new Date().toLocaleTimeString()}]
          </div>
        </div>

        {/* Terminal Output */}
        <div style={{
          background: '#111827',
          padding: '15px',
          height: '120px',
          overflowY: 'auto',
          borderBottom: '1px solid #374151'
        }}>
          <pre style={{
            color: '#61dafb',
            fontSize: '11px',
            margin: 0,
            whiteSpace: 'pre-wrap',
            textShadow: '0 0 5px #61dafb'
          }}>
            {terminalText}
            <span style={{ animation: 'blink 1s infinite' }}>█</span>
          </pre>
        </div>

        {/* Form Area */}
        <div style={{ padding: '25px', background: '#1f2937' }}>
          <h2 style={{
            color: '#61dafb',
            textAlign: 'center',
            margin: '0 0 25px 0',
            fontSize: '18px',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 0 10px #61dafb'
          }}>
            &gt; ADMIN LOGIN REQUIRED &lt;
          </h2>

          <div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                color: '#61dafb',
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                &gt; EMAIL_ADDRESS:
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#111827',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: 'Courier New, monospace',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 10px rgba(97, 218, 251, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <div style={{
                color: '#61dafb',
                display: 'block',
                marginBottom: '8px',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                &gt; PASSWORD_HASH:
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#111827',
                  border: '1px solid #3b82f6',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontFamily: 'Courier New, monospace',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#61dafb';
                  e.target.style.boxShadow = '0 0 10px rgba(97, 218, 251, 0.5), inset 0 0 10px rgba(0, 0, 0, 0.5)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = 'inset 0 0 10px rgba(0, 0, 0, 0.5)';
                }}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                background: loading ? '#374151' : 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                fontSize: '14px',
                fontFamily: 'Courier New, monospace',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading ? 'none' : '0 0 20px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? '&gt; AUTHENTICATING...' : '&gt; INITIATE ADMIN LOGIN'}
            </button>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div style={{
          background: '#111827',
          padding: '8px 15px',
          borderTop: '1px solid #374151',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '10px',
          color: '#61dafb'
        }}>
          <span>STATUS: {loading ? 'AUTHENTICATING' : 'STANDBY'}</span>
          <span>ENCRYPTION: AES-256</span>
          <span>CONN: SECURE</span>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes matrix {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
