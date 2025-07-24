import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Award, 
  Globe, 
  Play, 
  BookOpen, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Star,
  Target,
  Zap,
  Heart,
  Building2,
  GraduationCap,
  BarChart3
} from 'lucide-react';

const About = ({ user }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const stats = [
    { icon: Users, value: '50K+', label: 'Insurance Professionals', color: '#8b5cf6' },
    { icon: Play, value: '2,500+', label: 'Educational Videos', color: '#3b82f6' },
    { icon: Globe, value: '120+', label: 'Countries Served', color: '#10b981' },
    { icon: Clock, value: '24/7', label: 'Live Support', color: '#f59e0b' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Industry Compliance',
      description: 'Stay current with regulatory changes and compliance requirements across all insurance sectors.',
      color: '#ef4444'
    },
    {
      icon: GraduationCap,
      title: 'Professional Development',
      description: 'Advance your career with certified courses and continuing education credits.',
      color: '#8b5cf6'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Access real-time market analysis, trends, and industry forecasts from leading experts.',
      color: '#10b981'
    },
    {
      icon: Building2,
      title: 'Corporate Training',
      description: 'Scale your team\'s knowledge with enterprise-grade training solutions and analytics.',
      color: '#3b82f6'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      experience: '15+ years in InsurTech',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=8b5cf6&color=fff&size=120',
      specialties: ['Digital Transformation', 'Risk Management', 'Strategic Leadership']
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      experience: '12+ years in EdTech',
      image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=3b82f6&color=fff&size=120',
      specialties: ['Platform Architecture', 'AI/ML', 'Video Streaming']
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of Content',
      experience: '20+ years in Insurance Education',
      image: 'https://ui-avatars.com/api/?name=Emily+Watson&background=10b981&color=fff&size=120',
      specialties: ['Curriculum Development', 'Regulatory Compliance', 'Industry Research']
    },
    {
      name: 'James Park',
      role: 'VP of Partnerships',
      experience: '10+ years in Insurance',
      image: 'https://ui-avatars.com/api/?name=James+Park&background=f59e0b&color=fff&size=120',
      specialties: ['Strategic Partnerships', 'Business Development', 'Client Relations']
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we deliver.'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Transparent, ethical practices guide all our business decisions.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously evolve to meet the changing needs of our industry.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building connections and fostering collaboration across the insurance ecosystem.'
    }
  ];

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'features', label: 'Features', icon: Star },
    { id: 'team', label: 'Our Team', icon: Users },
    { id: 'values', label: 'Our Values', icon: Heart },
    { id: 'contact', label: 'Contact', icon: Globe }
  ];

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.3s ease-in-out'
    },
    modal: {
      width: '100%',
      maxWidth: '1200px',
      height: '90vh',
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.95), rgba(26, 26, 46, 0.95))',
      borderRadius: '24px',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)',
      display: 'flex',
      overflow: 'hidden',
      transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
      transition: 'transform 0.3s ease-in-out'
    },
    sidebar: {
      width: '280px',
      background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
      borderRight: '1px solid rgba(139, 92, 246, 0.2)',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    content: {
      flex: 1,
      padding: '32px',
      overflowY: 'auto',
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.6), rgba(26, 26, 46, 0.4))'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '32px',
      paddingBottom: '20px',
      borderBottom: '1px solid rgba(139, 92, 246, 0.2)'
    },
    title: {
      fontSize: '32px',
      fontWeight: '700',
      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    closeButton: {
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      borderRadius: '12px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    navItem: {
      padding: '16px 20px',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px',
      fontWeight: '500'
    },
    navItemActive: {
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.1))',
      border: '1px solid rgba(139, 92, 246, 0.3)',
      color: 'white'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '48px'
    },
    statCard: {
      padding: '24px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    statValue: {
      fontSize: '32px',
      fontWeight: '700',
      color: 'white',
      marginBottom: '8px',
      display: 'block'
    },
    statLabel: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontWeight: '500'
    },
    featureGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    },
    featureCard: {
      padding: '32px 24px',
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
      borderRadius: '20px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      transition: 'all 0.3s ease'
    },
    featureIcon: {
      width: '48px',
      height: '48px',
      marginBottom: '20px',
      padding: '12px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '12px'
    },
    featureDescription: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.6'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '48px'
    },
    teamCard: {
      padding: '32px 24px',
      background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(26, 26, 46, 0.6))',
      borderRadius: '20px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    teamImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      margin: '0 auto 20px auto',
      border: '3px solid rgba(139, 92, 246, 0.3)'
    },
    teamName: {
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    teamRole: {
      fontSize: '14px',
      color: '#8b5cf6',
      marginBottom: '4px',
      fontWeight: '500'
    },
    teamExperience: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      marginBottom: '16px'
    },
    specialties: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '8px'
    },
    specialty: {
      padding: '4px 8px',
      background: 'rgba(139, 92, 246, 0.2)',
      borderRadius: '12px',
      fontSize: '11px',
      color: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(139, 92, 246, 0.3)'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '48px'
    },
    valueCard: {
      padding: '24px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      textAlign: 'center'
    },
    valueIcon: {
      width: '40px',
      height: '40px',
      margin: '0 auto 16px auto',
      padding: '8px',
      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    valueTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '12px'
    },
    valueDescription: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: '1.5'
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    description: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: '1.7',
      marginBottom: '32px'
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px'
    },
    contactCard: {
      padding: '24px',
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.05))',
      borderRadius: '16px',
      border: '1px solid rgba(139, 92, 246, 0.2)',
      textAlign: 'center'
    },
    contactTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    contactInfo: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)'
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div>
            <div style={styles.header}>
              <h1 style={styles.title}>About GAIPTV</h1>
              <button onClick={handleClose} style={styles.closeButton}>
                ✕
              </button>
            </div>
            
            <p style={styles.description}>
              GAIPTV is the premier professional broadcasting platform designed specifically for the insurance industry. 
              We empower insurance professionals worldwide with cutting-edge educational content, live streaming capabilities, 
              and industry insights that drive professional growth and business success.
            </p>

            <div style={styles.statsGrid}>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} style={styles.statCard}>
                    <div style={{
                      ...styles.featureIcon,
                      background: `linear-gradient(135deg, ${stat.color}40, ${stat.color}20)`,
                      margin: '0 auto 16px auto'
                    }}>
                      <IconComponent size={24} color={stat.color} />
                    </div>
                    <span style={styles.statValue}>{stat.value}</span>
                    <span style={styles.statLabel}>{stat.label}</span>
                  </div>
                );
              })}
            </div>

            <h2 style={styles.sectionTitle}>
              <Target size={24} />
              Our Mission
            </h2>
            <p style={styles.description}>
              To revolutionize professional development in the insurance industry by providing accessible, 
              high-quality educational content and fostering a global community of insurance professionals 
              committed to excellence and continuous learning.
            </p>
          </div>
        );

      case 'features':
        return (
          <div>
            <h2 style={styles.sectionTitle}>
              <Star size={24} />
              Platform Features
            </h2>
            
            <div style={styles.featureGrid}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} style={styles.featureCard}>
                    <div style={{
                      ...styles.featureIcon,
                      background: `linear-gradient(135deg, ${feature.color}40, ${feature.color}20)`
                    }}>
                      <IconComponent size={24} color={feature.color} />
                    </div>
                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                    <p style={styles.featureDescription}>{feature.description}</p>
                  </div>
                );
              })}
            </div>

            <h3 style={{ ...styles.sectionTitle, fontSize: '24px', marginTop: '40px' }}>
              <BarChart3 size={20} />
              Advanced Analytics
            </h3>
            <p style={styles.description}>
              Track your learning progress, measure engagement, and identify knowledge gaps with our 
              comprehensive analytics dashboard designed for both individual professionals and enterprise teams.
            </p>
          </div>
        );

      case 'team':
        return (
          <div>
            <h2 style={styles.sectionTitle}>
              <Users size={24} />
              Meet Our Team
            </h2>
            
            <p style={styles.description}>
              Our diverse team of industry experts, technologists, and educators are united by a shared 
              passion for advancing the insurance profession through innovative learning solutions.
            </p>

            <div style={styles.teamGrid}>
              {team.map((member, index) => (
                <div key={index} style={styles.teamCard}>
                  <img src={member.image} alt={member.name} style={styles.teamImage} />
                  <h3 style={styles.teamName}>{member.name}</h3>
                  <p style={styles.teamRole}>{member.role}</p>
                  <p style={styles.teamExperience}>{member.experience}</p>
                  <div style={styles.specialties}>
                    {member.specialties.map((specialty, idx) => (
                      <span key={idx} style={styles.specialty}>{specialty}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'values':
        return (
          <div>
            <h2 style={styles.sectionTitle}>
              <Heart size={24} />
              Our Core Values
            </h2>
            
            <p style={styles.description}>
              These fundamental principles guide every decision we make and every solution we build. 
              They represent our commitment to the insurance community and our vision for the future of professional education.
            </p>

            <div style={styles.valuesGrid}>
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} style={styles.valueCard}>
                    <div style={styles.valueIcon}>
                      <IconComponent size={24} color="white" />
                    </div>
                    <h3 style={styles.valueTitle}>{value.title}</h3>
                    <p style={styles.valueDescription}>{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h2 style={styles.sectionTitle}>
              <Globe size={24} />
              Get In Touch
            </h2>
            
            <p style={styles.description}>
              Ready to transform your professional development journey? We'd love to hear from you. 
              Whether you're an individual professional or representing an organization, we're here to help.
            </p>

            <div style={styles.contactGrid}>
              <div style={styles.contactCard}>
                <h3 style={styles.contactTitle}>Sales & Partnerships</h3>
                <p style={styles.contactInfo}>
                  partnerships@gaiptv.com<br />
                  +1 (555) 123-4567
                </p>
              </div>
              <div style={styles.contactCard}>
                <h3 style={styles.contactTitle}>Technical Support</h3>
                <p style={styles.contactInfo}>
                  support@gaiptv.com<br />
                  24/7 Live Chat Available
                </p>
              </div>
              <div style={styles.contactCard}>
                <h3 style={styles.contactTitle}>Content & Education</h3>
                <p style={styles.contactInfo}>
                  content@gaiptv.com<br />
                  Subject Matter Experts
                </p>
              </div>
              <div style={styles.contactCard}>
                <h3 style={styles.contactTitle}>Corporate Office</h3>
                <p style={styles.contactInfo}>
                  123 Insurance Plaza<br />
                  New York, NY 10001
                </p>
              </div>
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <h3 style={{ ...styles.sectionTitle, justifyContent: 'center', fontSize: '20px' }}>
                <CheckCircle size={20} />
                Ready to Get Started?
              </h3>
              <p style={styles.description}>
                Join thousands of insurance professionals who trust GAIPTV for their continuing education and professional development needs.
              </p>
              <button
                style={{
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
                }}
                onClick={() => window.open('mailto:info@gaiptv.com?subject=Getting Started with GAIPTV')}
              >
                Contact Us Today
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Sidebar Navigation */}
        <div style={styles.sidebar}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              GAIPTV
            </h2>
            <p style={{
              fontSize: '12px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '500'
            }}>
              Professional Broadcasting Platform
            </p>
          </div>

          {navigationSections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            return (
              <div
                key={section.id}
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {})
                }}
                onClick={() => setActiveSection(section.id)}
              >
                <IconComponent size={16} />
                <span>{section.label}</span>
              </div>
            );
          })}

          {user && (
            <div style={{
              marginTop: 'auto',
              padding: '16px',
              background: 'rgba(139, 92, 246, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              textAlign: 'center'
            }}>
              <img 
                src={user.avatar} 
                alt={user.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  marginBottom: '8px'
                }}
              />
              <p style={{
                fontSize: '12px',
                color: 'white',
                fontWeight: '500',
                marginBottom: '4px'
              }}>
                {user.name}
              </p>
              <p style={{
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                {user.subscription.plan} Member
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default About;
