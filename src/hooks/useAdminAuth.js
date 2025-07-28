import { useState, useEffect } from 'react';
import { useAuth } from '../Components/AuthContext';

export const useAdminAuth = () => {
  const { profile, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      setIsAdmin(profile?.role === 'admin');
      setLoading(false);
    }
  }, [profile, authLoading]);

  return { isAdmin, loading: authLoading || loading };
};
