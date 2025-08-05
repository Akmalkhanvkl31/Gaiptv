import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './Components/AuthContext';
import MainApplication from './MainApplication';
import GuestLanding from './Components/GuestLanding';
import mockData from './Components/mockData';
import AuthScreen from './Components/AuthScreen';
import AdminLogin from './Components/AdminLogin';
import AdminDashboard from './Components/AdminDashboard';  
import AdminRoute from './Components/AdminRoute';
import About from './Components/About/About';
import AccessDenied from './Components/AccessDenied';
import MainScreen from './Components/MainScreen';
import AdminPage from './Components/AdminPage';


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignUp = () => {
    navigate('/auth?form=signup');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* Guest landing with sign in/up handlers */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/home" />
          ) : (
            <GuestLanding
              liveStreams={mockData.liveStreams}
              featuredVideos={mockData.featuredVideos}
              news={mockData.news}
              onSignIn={handleSignIn}
              onSignUp={handleSignUp}
            />
          )
        }
      />

      {/* Auth page */}
      <Route path="/auth" element={<AuthScreen />} />

      {/* About page */}
      <Route path="/about" element={<About />} />

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin route */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard /> {/* Or use AdminPage if you want */}
          </AdminRoute>
        }
      />

      {/* Access Denied page */}
      <Route path="/access-denied" element={<AccessDenied />} />

      {/* Main app for logged in users */}
      <Route
        path="/home"
        element={user ? <MainApplication /> : <Navigate to="/auth" />}
      />

      <Route path="/main" element={<MainScreen />} />

      {/* Catch all unmatched routes - optional */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
