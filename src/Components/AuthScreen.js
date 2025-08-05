import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import './styles/AuthScreen.css';

const AuthScreen = ({ onSignUp, onClose, isOverlay = false }) => {
  const { signIn, signUp, signInWithMagicLink, signInWithOAuth, loading } = useAuth();
  const navigate = useNavigate();
  
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
      if (formData.password !== formData.confirmPassword) {
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

    if (isLoginMode) {
      try {
        const result = await signIn(formData.email, formData.password);
        if (result.success) {
          if (result.role === 'admin') {
            // Admin redirection is handled by AuthContext, just close the modal
            if (onClose) onClose();
          } else {
            setSuccessMessage('Welcome back! Redirecting...');
            setTimeout(() => {
              if (onClose) onClose();
              navigate('/main');
            }, 1500);
          }
        } else {
          setErrors({ general: result.error });
        }
      } catch (error) {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Sign Up
      try {
        const result = await signUp(formData.email, formData.password, {
          name: formData.name,
          company: formData.company,
          role: formData.role,
        });
        if (result.success) {
          setSuccessMessage('Account created! Please check your email to verify.');
          setTimeout(() => {
            if (onClose) onClose();
            setIsLoginMode(true);
          }, 2000);
        } else {
          setErrors({ general: result.error });
        }
      } catch (error) {
        setErrors({ general: 'An unexpected error occurred. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
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

  return (
    <div className={`auth-container ${isOverlay ? 'auth-overlay-container' : ''}`}>
      {/* Background Animation */}
      <div className="auth-background">
        <div className="auth-bg-pattern"></div>
        <div className="auth-bg-gradient"></div>
      </div>

      {/* Close Button for Overlay */}
      {isOverlay && onClose && (
        <button 
          onClick={onClose}
          className="auth-close-button"
        >
          <X size={24} />
        </button>
      )}

      {/* Auth Content */}
      <div className="auth-content">
        {/* Left Side - Branding with Live Preview */}
        <div className="auth-branding">
          <div className="branding-content">
            <div className="auth-logo">
              <div className="auth-logo-icon">
                <Tv color="white" size={32} />
                <div className="auth-logo-dot"></div>
              </div>
              <h1 className="auth-logo-text">GAIPTV</h1>
            </div>

            <h2 className="branding-title">
              Your Gateway to Insurance Excellence
            </h2>
            <p className="branding-subtitle">
              Access exclusive content, live events, and professional insights 
              from industry leaders in insurance and risk management.
            </p>

            {/* Live Preview Features */}
            <div className="live-preview">
              <h3 className="live-preview-title">
                <div className="live-dot"></div>
                Live Now
              </h3>
              <p className="live-preview-event">
                Insurance AI Summit 2025
              </p>
              <p className="live-preview-viewers">
                12,847 professionals watching live
              </p>
              <button className="join-live-button">
                <Play size={12} />
                Join Live Stream
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="features-list">
              <div className="feature-item">
                <Star size={20} color="#f59e0b" />
                <span>Premium Industry Content</span>
              </div>
              <div className="feature-item">
                <Zap size={20} color="#ef4444" />
                <span>Live Events & Real-time Updates</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={20} color="#22c55e" />
                <span>Professional Certifications</span>
              </div>
              <div className="feature-item">
                <Building2 size={20} color="#8b5cf6" />
                <span>Enterprise-grade Security</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="testimonial">
              <p className="testimonial-text">
                "GAIPTV has transformed how our team stays updated with industry trends."
              </p>
              <p className="testimonial-author">
                - Sarah Chen, Risk Manager at Global Insurance
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="auth-form">
          <div className="form-container">
            <div className="form-header">
              <h3 className="form-title">
                {isLoginMode ? 'Welcome Back' : 'Create Your Account'}
              </h3>
              <p className="form-subtitle">
                {isLoginMode ? 'Sign in to access premium content and live events' : 'Join the leading platform for insurance professionals'}
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="success-message">
                <CheckCircle size={16} />
                {successMessage}
              </div>
            )}

            {/* OAuth Buttons */}
            <div className="oauth-buttons">
              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={isSubmitting || loading}
                className="oauth-button"
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
                className="oauth-button"
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
            <div className="divider">
              <div className="divider-line"></div>
              <span>or continue with email</span>
              <div className="divider-line"></div>
            </div>

            <form onSubmit={handleSubmit} className="form">
              {/* Name Field (Sign Up Only) */}
              {!isLoginMode && (
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <div className="input-container">
                    <User size={20} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`input ${errors.name ? 'input-error' : ''}`}
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  {errors.name && (
                    <span className="error-text">{errors.name}</span>
                  )}
                </div>
              )}

              {/* Email Field */}
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <div className="input-container">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`input ${errors.email ? 'input-error' : ''}`}
                    disabled={isSubmitting || loading}
                  />
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>

              {/* Password Field */}
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-container">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className={`input ${errors.password ? 'input-error' : ''}`}
                    disabled={isSubmitting || loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                    disabled={isSubmitting || loading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLoginMode && (
                <div className="input-group">
                  <label className="input-label">Confirm Password</label>
                  <div className="input-container">
                    <Lock size={20} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword}</span>
                  )}
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  {errors.general}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`submit-button ${isSubmitting || loading ? 'loading' : ''}`}
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
                className="magic-link-button"
              >
                <Zap size={16} />
                Send Magic Link
              </button>
              )}

              {/* Toggle between Login and Sign Up */}
              <div className="toggle-auth-mode">
                <button
                  type="button"
                  onClick={() => setIsLoginMode(!isLoginMode)}
                  disabled={isSubmitting || loading}
                >
                  {isLoginMode
                    ? "Don't have an account? Sign Up"
                    : 'Already have an account? Sign In'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <Loader size={32} className="animate-spin" />
            <span>Setting up your account...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
