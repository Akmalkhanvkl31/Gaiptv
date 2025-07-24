import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
