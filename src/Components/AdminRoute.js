import React from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import AdminPage from './AdminPage';
import AccessDenied from './AccessDenied';

const AdminRoute = ({ onClose }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <AccessDenied onClose={onClose} />;
  }

  return <AdminPage onClose={onClose} />;
};

export default AdminRoute;
