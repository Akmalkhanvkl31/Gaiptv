import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Tv, 
  X,
  Building2,
  CheckCircle,
  ArrowRight,
  Play,
  AlertCircle,
  Loader,
  Zap,
  Star,
  Shield,
  Globe,
  Users,
  Award
} from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthScreen = ({ onClose, isOverlay = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, signInWithMagicLink, signInWithOAuth, loading } = useAuth();
  
  // Get initial mode from URL params
  const urlParams = new URLSearchParams(location.search);
  const initialMode = urlParams.get('form') === 'signup' ? false : true;
  
  const [isLoginMode, setIsLoginMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Insurance Professional',
    company: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      if (isLoginMode) {
        const result = await signIn(formData.email, formData.password);
        if (!result.success) {
          setErrors({ general: result.error });
        } else {
          setSuccessMessage('Welcome back! Redirecting...');
          setTimeout(() => {
            if (isOverlay && onClose) {
              onClose();
            } else {
              navigate('/home');
            }
          }, 1500);
        }
      } else {
        const userData = {
          name: formData.name,
          role: formData.role,
          company: formData.company
        };
        
        const result = await signUp(formData.email, formData.password, userData);
        if (!result.success) {
          setErrors({ general: result.error });
        } else {
          setSuccessMessage('Account created! Please check your email to verify your account.');
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    if (!formData.email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const result = await signInWithMagicLink(formData.email);
      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: 'Failed to send magic link' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setIsSubmitting(true);
    try {
      const result = await signInWithOAuth(provider);
      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (error) {
      setErrors({ general: `Failed to sign in with ${provider}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      } else {
        navigate('/');
      }
    }, 300);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setSuccessMessage('');
    setFormData({
      name: '',
      email: formData.email, // Keep email when switching modes
      password: '',
      confirmPassword: '',
      role: 'Insurance Professional',
      company: ''
    });

    // Update URL without page reload
    const newUrl = isLoginMode 
      ? `${location.pathname}?form=signup`
      : `${location.pathname}?form=signin`;
    window.history.pushState(null, '', newUrl);
  };

  const containerStyle = {
    position: isOverlay ? 'fixed' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e, #0f172a)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    zIndex: isOverlay ? 1000 : 'auto',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.4s ease-in-out',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const modalStyle = {
    width: '100%',
    maxWidth: '1200px',
    minHeight: isOverlay ? '90vh' : 'auto',
    background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.98), rgba(26, 26, 46, 0.95))',
    borderRadius: isOverlay ? '24px' : '0',
    border: isOverlay ? '1px solid rgba(139, 92, 246, 0.3)' : 'none',
    backdropFilter: 'blur(20px)',
    boxShadow: isOverlay ? '0 0 50px rgba(139, 92, 246, 0.3)' : 'none',
    display: 'flex',
    overflow: 'hidden',
    transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
    transition: 'transform 0.4s ease-in-out',
    position: 'relative'
  };

  return (
    <div style={containerStyle}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
        `,
        opacity: 0.6,
        animation: 'backgroundShift 20s ease-in-out infinite'
      }}></div>

      <div style={modalStyle}>
        {/* Close Button */}
        {isOverlay && onClose && (
          <button 
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '50%',
              color: '#ef4444',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.3)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <X size={20} />
          </button>
        )}

        {/* Left Side - Branding */}
        <div style={{
          flex: 1,
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>

          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: '100px',
            height: '100px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite reverse'
          }}></div>

          {/* Logo */}
          <div style={{
            marginBottom: '40px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.2s',
            opacity: isVisible ? 1 : 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)',
                animation: 'logoGlow 3s ease-in-out infinite alternate'
              }}>
                <Tv size={32} color="white" />
              </div>
              <div>
                <h1 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: 0
                }}>
                  GAIPTV
                </h1>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Professional Broadcasting Platform
                </p>
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div style={{
            marginBottom: '32px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.3s',
            opacity: isVisible ? 1 : 0
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '16px',
              lineHeight: '1.2'
            }}>
              {isLoginMode 
                ? 'Welcome Back to Your Professional Network' 
                : 'Join the Future of Insurance Professional Development'
              }
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              {isLoginMode
                ? 'Continue your professional journey with premium content, live events, and industry insights.'
                : 'Connect with 50,000+ insurance professionals, access exclusive content, and advance your career.'
              }
            </p>
          </div>

          {/* Live Event Banner */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            marginBottom: '32px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.4s',
            opacity: isVisible ? 1 : 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }}></div>
              <span style={{
                color: '#ef4444',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                Live Now
              </span>
            </div>
            <h4 style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Insurance AI Summit 2025
            </h4>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              marginBottom: '12px'
            }}>
              12,847 professionals watching live expert discussions
            </p>
            <button
              onClick={() => !isLoginMode && toggleMode()}
              style={{
                padding: '8px 16px',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '8px',
                color: '#ef4444',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              <Play size={12} />
              {isLoginMode ? 'Sign In to Watch' : 'Join Live Stream'}
            </button>
          </div>

          {/* Feature Highlights */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.5s',
            opacity: isVisible ? 1 : 0
          }}>
            {[
              { icon: Star, text: 'Premium Industry Content', color: '#f59e0b' },
              { icon: Users, text: 'Global Professional Network', color: '#3b82f6' },
              { icon: Award, text: 'Professional Certifications', color: '#22c55e' },
              { icon: Shield, text: 'Enterprise-grade Security', color: '#8b5cf6' }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `transform 0.6s ease-out ${0.6 + index * 0.1}s`,
                  opacity: isVisible ? 1 : 0
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: `${feature.color}20`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${feature.color}40`
                }}>
                  <feature.icon size={16} color={feature.color} />
                </div>
                <span style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            marginTop: '40px',
            padding: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.7s',
            opacity: isVisible ? 1 : 0
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '14px',
              fontStyle: 'italic',
              marginBottom: '12px',
              lineHeight: '1.5'
            }}>
              "GAIPTV has transformed how our team stays updated with industry trends. The live events and expert insights are invaluable for our professional development."
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <img
                src="https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff&size=32"
                alt="Sarah Chen"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid rgba(139, 92, 246, 0.4)'
                }}
              />
              <div>
                <div style={{
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  Sarah Chen
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '11px'
                }}>
                  Risk Manager, Global Insurance
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div style={{
          flex: 1,
          padding: '60px 40px',
          background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.9), rgba(26, 26, 46, 0.8))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Form Header */}
          <div style={{
            marginBottom: '32px',
            textAlign: 'center',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.3s',
            opacity: isVisible ? 1 : 0
          }}>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '8px'
            }}>
              {isLoginMode ? 'Welcome Back' : 'Create Your Account'}
            </h3>
            <p style={{
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.7)'
            }}>
              {isLoginMode 
                ? 'Sign in to access your professional dashboard'
                : 'Join thousands of insurance professionals'
              }
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div style={{
              padding: '16px 20px',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              color: '#22c55e',
              fontSize: '14px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.5s ease-out'
            }}>
              <CheckCircle size={20} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* OAuth Buttons */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '32px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.4s',
            opacity: isVisible ? 1 : 0
          }}>
            <button
              onClick={() => handleOAuthLogin('google')}
              disabled={isSubmitting || loading}
              style={{
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                opacity: isSubmitting ? 0.7 : 1,
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isSubmitting ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Continue with Google
            </button>

            <button
              onClick={() => handleOAuthLogin('github')}
              disabled={isSubmitting || loading}
              style={{
                padding: '14px 20px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                opacity: isSubmitting ? 0.7 : 1,
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isSubmitting ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
            gap: '16px',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.5s',
            opacity: isVisible ? 1 : 0
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
            }}></div>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '12px',
              fontWeight: '500',
              padding: '0 12px',
              background: 'rgba(15, 15, 35, 0.8)',
              whiteSpace: 'nowrap'
            }}>
              or continue with email
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
            }}></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'transform 0.6s ease-out 0.6s',
            opacity: isVisible ? 1 : 0
          }}>
            {/* Name Field (Signup only) */}
            {!isLoginMode && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Full Name *
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <User size={20} style={{
                    position: 'absolute',
                    left: '16px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 2
                  }} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: `1px solid ${errors.name ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    disabled={isSubmitting || loading}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.name ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                {errors.name && (
                  <span style={{
                    color: '#ef4444',
                    fontSize: '12px',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <AlertCircle size={12} />
                    {errors.name}
                  </span>
                )}
              </div>
            )}

            {/* Email Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Email Address *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Mail size={20} style={{
                  position: 'absolute',
                  left: '16px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  zIndex: 2
                }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.email ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  disabled={isSubmitting || loading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              {errors.email && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '12px',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <AlertCircle size={12} />
                  {errors.email}
                </span>
              )}
            </div>

            {/* Role Field (Signup only) */}
            {!isLoginMode && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Professional Role
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Building2 size={20} style={{
                    position: 'absolute',
                    left: '16px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 2
                  }} />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)'
                    }}
                    disabled={isSubmitting || loading}
                  >
                    <option value="Insurance Professional" style={{ background: '#1f2937' }}>Insurance Professional</option>
                    <option value="Risk Manager" style={{ background: '#1f2937' }}>Risk Manager</option>
                    <option value="Compliance Officer" style={{ background: '#1f2937' }}>Compliance Officer</option>
                    <option value="Insurance Agent" style={{ background: '#1f2937' }}>Insurance Agent</option>
                    <option value="Underwriter" style={{ background: '#1f2937' }}>Underwriter</option>
                    <option value="Claims Adjuster" style={{ background: '#1f2937' }}>Claims Adjuster</option>
                    <option value="Insurance Broker" style={{ background: '#1f2937' }}>Insurance Broker</option>
                    <option value="Actuary" style={{ background: '#1f2937' }}>Actuary</option>
                    <option value="Other" style={{ background: '#1f2937' }}>Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Company Field (Signup only) */}
            {!isLoginMode && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Company <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>(Optional)</span>
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Building2 size={20} style={{
                    position: 'absolute',
                    left: '16px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 2
                  }} />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    disabled={isSubmitting || loading}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Password Field */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Password *
              </label>
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Lock size={20} style={{
                  position: 'absolute',
                  left: '16px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  zIndex: 2
                }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 48px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: `1px solid ${errors.password ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  disabled={isSubmitting || loading}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    zIndex: 2
                  }}
                  disabled={isSubmitting || loading}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.5)';
                    e.target.style.background = 'none';
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <span style={{
                  color: '#ef4444',
                  fontSize: '12px',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <AlertCircle size={12} />
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password Field (Signup only) */}
            {!isLoginMode && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Confirm Password *
                </label>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Lock size={20} style={{
                    position: 'absolute',
                    left: '16px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 2
                  }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: `1px solid ${errors.confirmPassword ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    disabled={isSubmitting || loading}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#8b5cf6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = errors.confirmPassword ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                {errors.confirmPassword && (
                  <span style={{
                    color: '#ef4444',
                    fontSize: '12px',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <AlertCircle size={12} />
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            )}

            {/* General Error */}
            {errors.general && (
              <div style={{
                padding: '16px 20px',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                color: '#ef4444',
                fontSize: '14px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'slideIn 0.5s ease-out'
              }}>
                <AlertCircle size={20} />
                <span>{errors.general}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: isSubmitting || loading 
                  ? 'rgba(139, 92, 246, 0.5)' 
                  : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSubmitting || loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '20px',
                boxShadow: isSubmitting || loading ? 'none' : '0 8px 25px rgba(139, 92, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting && !loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 35px rgba(139, 92, 246, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && !loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
                }
              }}
            >
              {isSubmitting || loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>{isLoginMode ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{isLoginMode ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            {/* Magic Link Option for Login */}
            {isLoginMode && (
              <button
                type="button"
                onClick={handleMagicLink}
                disabled={isSubmitting || loading}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '24px',
                  opacity: isSubmitting ? 0.7 : 1,
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                <Zap size={16} />
                Send Magic Link Instead
              </button>
            )}

            {/* Mode Toggle */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px'
              }}>
                {isLoginMode 
                  ? "Don't have an account? " 
                  : "Already have an account? "
                }
              </span>
              <button
                type="button"
                onClick={toggleMode}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#8b5cf6',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'underline',
                  textDecorationColor: 'transparent'
                }}
                disabled={isSubmitting || loading}
                onMouseEnter={(e) => {
                  e.target.style.color = '#a855f7';
                  e.target.style.textDecorationColor = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#8b5cf6';
                  e.target.style.textDecorationColor = 'transparent';
                }}
              >
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </button>
            </div>

            {/* Forgot Password (Login only) */}
            {isLoginMode && (
              <div style={{ textAlign: 'center' }}>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  disabled={isSubmitting || loading}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#8b5cf6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'rgba(255, 255, 255, 0.6)';
                  }}
                >
                  Forgot your password?
                </button>
              </div>
            )}
          </form>

          {/* Terms and Privacy */}
          {!isLoginMode && (
            <div style={{
              marginTop: '24px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              lineHeight: '1.5',
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'transform 0.6s ease-out 0.8s',
              opacity: isVisible ? 1 : 0
            }}>
              By creating an account, you agree to our{' '}
              <a href="#" style={{ 
                color: '#8b5cf6', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" style={{ 
                color: '#8b5cf6', 
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#a855f7'}
              onMouseLeave={(e) => e.target.style.color = '#8b5cf6'}
              >
                Privacy Policy
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '40px',
            background: 'rgba(15, 15, 35, 0.9)',
            borderRadius: '20px',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <Loader size={40} className="animate-spin" style={{ color: '#8b5cf6' }} />
            <span style={{ 
              color: 'white', 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              Setting up your account...
            </span>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes logoGlow {
          0%, 100% { box-shadow: 0 8px 25px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 8px 35px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes backgroundShift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        
        select option {
          background: #1f2937 !important;
          color: white !important;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .auth-modal {
            flex-direction: column !important;
            max-width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
            height: 100vh !important;
          }
          
          .auth-branding,
          .auth-form {
            flex: none !important;
            padding: 30px 20px !important;
          }
          
          .auth-branding {
            min-height: 300px !important;
          }
        }
        
        @media (max-width: 480px) {
          .auth-branding,
          .auth-form {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthScreen;