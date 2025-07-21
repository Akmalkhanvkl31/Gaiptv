import { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContext';

export const useAdminAuth = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      // Check various admin indicators
      const adminChecks = [
        user.user_metadata?.role === 'Admin',
        user.user_metadata?.is_admin === true,
        user.email?.includes('admin'),
        user.email?.endsWith('@gaiptv.com'), // Your admin domain
        // Add other admin checks as needed
      ];

      const hasAdminAccess = adminChecks.some(check => check === true);
      setIsAdmin(hasAdminAccess);
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
};
