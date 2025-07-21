import React, { useState } from 'react';
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
  Star
} from 'lucide-react';
import { useAuth } from './AuthContext';
import styles from './Styles';

const AuthScreen = ({ onClose, isOverlay = false }) => {
  const { signIn, signUp, signInWithMagicLink, signInWithOAuth, loading } = useAuth();
  
  const [isLoginMode, setIsLoginMode] = useState(true);
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
            onClose();
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

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setSuccessMessage('');
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Insurance Professional',
      company: ''
    });
  };

  return (
    <div style={{
      ...styles.authContainer,
      ...(isOverlay ? styles.authOverlayContainer : {})
    }}>
      {/* Background Animation */}
      <div style={styles.authBackground}>
        <div style={styles.authBgPattern}></div>
        <div style={styles.authBgGradient}></div>
      </div>

      {/* Close Button for Overlay */}
      {isOverlay && onClose && (
        <button 
          onClick={onClose}
          style={styles.authCloseButton}
          className="close-button"
        >
          <X size={24} />
        </button>
      )}

      {/* Auth Content */}
      <div style={styles.authContent}>
        {/* Left Side - Branding with Live Preview */}
        <div style={styles.authBranding}>
          <div style={styles.brandingContent}>
            <div style={styles.authLogo}>
              <div style={styles.authLogoIcon}>
                <Tv color="white" size={32} />
                <div style={styles.authLogoDot}></div>
              </div>
              <h1 style={styles.authLogoText}>GAIPTV</h1>
            </div>

            <h2 style={styles.brandingTitle}>
              Your Gateway to Insurance Excellence
            </h2>
            <p style={styles.brandingSubtitle}>
              Access exclusive content, live events, and professional insights 
              from industry leaders in insurance and risk management.
            </p>

            {/* Live Preview Features */}
            <div style={{
              padding: '20px',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05))',
              borderRadius: '16px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              marginBottom: '30px'
            }}>
              <h3 style={{
                color: '#ef4444',
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></div>
                Live Now
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                Insurance AI Summit 2025
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                marginBottom: '12px'
              }}>
                12,847 professionals watching live
              </p>
              <button style={{
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
                gap: '6px'
              }}>
                <Play size={12} />
                Join Live Stream
              </button>
            </div>

            {/* Feature Highlights */}
            <div style={styles.featuresList}>
              <div style={styles.featureItem}>
                <Star size={20} color="#f59e0b" />
                <span>Premium Industry Content</span>
              </div>
              <div style={styles.featureItem}>
                <Zap size={20} color="#ef4444" />
                <span>Live Events & Real-time Updates</span>
              </div>
              <div style={styles.featureItem}>
                <CheckCircle size={20} color="#22c55e" />
                <span>Professional Certifications</span>
              </div>
              <div style={styles.featureItem}>
                <Building2 size={20} color="#8b5cf6" />
                <span>Enterprise-grade Security</span>
              </div>
            </div>

            {/* Testimonial */}
            <div style={{
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              marginTop: '20px'
            }}>
              <p style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '14px',
                fontStyle: 'italic',
                marginBottom: '8px'
              }}>
                "GAIPTV has transformed how our team stays updated with industry trends."
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px'
              }}>
                - Sarah Chen, Risk Manager at Global Insurance
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div style={styles.authForm}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h3 style={styles.formTitle}>
                {isLoginMode ? 'Welcome Back' : 'Join GAIPTV'}
              </h3>
              <p style={styles.formSubtitle}>
                {isLoginMode 
                  ? 'Sign in to access premium content and live events'
                  : 'Create your account and start your professional journey'
                }
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div style={{
                padding: '12px 16px',
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                color: '#22c55e',
                fontSize: '14px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={16} />
                {successMessage}
              </div>
            )}

            {/* OAuth Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              marginBottom: '24px'
            }}>
              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={isSubmitting || loading}
                style={{
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {isSubmitting ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }
                }}
              >
                {isSubmitting ? (
                  <Loader size={16} className="animate-spin" />
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
              marginBottom: '24px',
              gap: '16px'
            }}>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255, 255, 255, 0.2)'
              }}></div>
              <span style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                or continue with email
              </span>
              <div style={{
                flex: 1,
                height: '1px',
                background: 'rgba(255, 255, 255, 0.2)'
              }}></div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Name Field (Signup only) */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Full Name</label>
                  <div style={styles.inputContainer}>
                    <User size={20} style={styles.inputIcon} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      style={{
                        ...styles.input,
                        ...(errors.name ? styles.inputError : {})
                      }}
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  {errors.name && (
                    <span style={styles.errorText}>{errors.name}</span>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Email Address</label>
                <div style={styles.inputContainer}>
                  <Mail size={20} style={styles.inputIcon} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    style={{
                      ...styles.input,
                      ...(errors.email ? styles.inputError : {})
                    }}
                    disabled={isSubmitting || loading}
                  />
                </div>
                {errors.email && (
                  <span style={styles.errorText}>{errors.email}</span>
                )}
              </div>

              {/* Role Field (Signup only) */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Professional Role</label>
                  <div style={styles.inputContainer}>
                    <Building2 size={20} style={styles.inputIcon} />
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      style={styles.input}
                      disabled={isSubmitting || loading}
                    >
                      <option value="Insurance Professional">Insurance Professional</option>
                      <option value="Risk Manager">Risk Manager</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                      <option value="Insurance Agent">Insurance Agent</option>
                      <option value="Underwriter">Underwriter</option>
                      <option value="Claims Adjuster">Claims Adjuster</option>
                      <option value="Insurance Broker">Insurance Broker</option>
                      <option value="Actuary">Actuary</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Company Field (Signup only) */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Company (Optional)</label>
                  <div style={styles.inputContainer}>
                    <Building2 size={20} style={styles.inputIcon} />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      style={styles.input}
                      disabled={isSubmitting || loading}
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Password</label>
                <div style={styles.inputContainer}>
                  <Lock size={20} style={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    style={{
                      ...styles.input,
                      ...(errors.password ? styles.inputError : {})
                    }}
                    disabled={isSubmitting || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.passwordToggle}
                    disabled={isSubmitting || loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span style={styles.errorText}>{errors.password}</span>
                )}
              </div>

              {/* Confirm Password Field (Signup only) */}
              {!isLoginMode && (
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Confirm Password</label>
                  <div style={styles.inputContainer}>
                    <Lock size={20} style={styles.inputIcon} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      style={{
                        ...styles.input,
                        ...(errors.confirmPassword ? styles.inputError : {})
                      }}
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span style={styles.errorText}>{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#ef4444',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={16} />
                  {errors.general}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting || loading ? styles.submitButtonLoading : {})
                }}
                className="submit-button"
              >
                {isSubmitting || loading ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <>
                    <span>{isLoginMode ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight size={18} />
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
                    padding: '12px 24px',
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
                    marginTop: '12px',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  <Zap size={16} />
                  Send Magic Link
                </button>
              )}

              {/* Mode Toggle */}
              <div style={styles.modeToggle}>
                <span style={styles.modeToggleText}>
                  {isLoginMode 
                    ? "Don't have an account? " 
                    : "Already have an account? "
                  }
                </span>
                <button
                  type="button"
                  onClick={toggleMode}
                  style={styles.modeToggleButton}
                  className="mode-toggle-button"
                  disabled={isSubmitting || loading}
                >
                  {isLoginMode ? 'Sign Up' : 'Sign In'}
                </button>
              </div>

              {/* Forgot Password (Login only) */}
              {isLoginMode && (
                <button
                  type="button"
                  style={styles.forgotPassword}
                  className="forgot-password"
                  disabled={isSubmitting || loading}
                >
                  Forgot your password?
                </button>
              )}
            </form>

            {/* Terms and Privacy */}
            {!isLoginMode && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                lineHeight: '1.4'
              }}>
                By creating an account, you agree to our{' '}
                <a href="#" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: '#8b5cf6', textDecoration: 'none' }}>
                  Privacy Policy
                </a>
              </div>
            )}
          </div>
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
          zIndex: 10
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <Loader size={32} className="animate-spin" style={{ color: '#8b5cf6' }} />
            <span style={{ color: 'white', fontSize: '14px' }}>
              Setting up your account...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
