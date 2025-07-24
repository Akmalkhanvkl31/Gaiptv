import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { error } = await signIn({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate('/admin');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <div style={{ padding: '40px', borderRadius: '10px', backgroundColor: '#2a2a2a', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
        <h2 style={{ color: 'white', textAlign: 'center' }}>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#333', color: 'white' }}
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#f59e0b', color: 'white', cursor: 'pointer' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
