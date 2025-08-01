import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Components/AuthContext';
import MainApplication from './MainApplication';
import GuestLanding from './Components/GuestLanding';
import MainScreen from './Components/MainScreen';
import mockData from './Components/mockData';
import AuthScreen from './Components/AuthScreen';
import About from './Components/About/About';
import AdminPage from './Components/AdminPage';
import AdminLogin from './Components/AdminLogin';
import AdminRoute from './Components/AdminRoute';
import AccessDenied from './Components/AccessDenied';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignUp = () => {
    navigate('/auth');
  };

  return (
    <Routes>
      <Route path="/" element={user ? <MainApplication /> : <GuestLanding onSignIn={handleSignIn} onSignUp={handleSignUp} liveStreams={mockData.liveStreams} featuredVideos={mockData.featuredVideos} news={mockData.news} />} />
      <Route path="/auth" element={<AuthScreen />} />
      <Route path="/about" element={<About />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      } />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/access-denied" element={<AccessDenied />} />
    </Routes>
  );
}

export default App;
