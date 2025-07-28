import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './Components/AuthContext';
import MainApplication from './MainApplication';
import GuestLanding from './Components/GuestLanding';
import mockData from './Components/mockData';
import AuthScreen from './Components/AuthScreen';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';
import AdminRoute from './Components/AdminRoute';
import About from './Components/About/About';

const App = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth?form=signup');
  };

  const handleSignIn = () => {
    navigate('/auth?form=signin');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/auth" element={<AuthScreen onSignUp={handleSignUp} />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route 
        path="/admin" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to="/home" />
          ) : (
            <GuestLanding 
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
              liveStreams={mockData.liveStreams} 
              featuredVideos={mockData.featuredVideos}
              news={mockData.news}
            />
          )
        } 
      />
      <Route 
        path="/home" 
        element={user ? <MainApplication /> : <Navigate to="/auth" />} 
      />
    </Routes>
  );
};

export default App;
