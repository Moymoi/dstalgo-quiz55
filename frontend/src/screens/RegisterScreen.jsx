import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearError } from '../store/slices/authSlice';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [userInfo, navigate]);

  useEffect(() => {
    return () => { dispatch(clearError()); };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    if (username.trim() && password.trim()) {
      dispatch(register({ username, password }));
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #3a3a5a',
    backgroundColor: '#252540',
    color: '#e0e0f0',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  };

  const displayError = localError || error;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#22223a',
          borderRadius: '16px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          border: '1px solid #2a2a4a',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔤</div>
          <h1 style={{ color: '#e0e0f0', fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>
            Create Account
          </h1>
          <p style={{ color: '#808098', fontSize: '14px', margin: 0 }}>Join The Acronym Decipherer</p>
        </div>
        {displayError && (
          <div
            style={{
              backgroundColor: '#3a1a1a',
              border: '1px solid #6b2a2a',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '20px',
              color: '#ff8080',
              fontSize: '14px',
            }}
          >
            {displayError}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#a0a0c0', fontSize: '14px', marginBottom: '6px' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#5b5bd6')}
              onBlur={(e) => (e.target.style.borderColor = '#3a3a5a')}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#a0a0c0', fontSize: '14px', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#5b5bd6')}
              onBlur={(e) => (e.target.style.borderColor = '#3a3a5a')}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', color: '#a0a0c0', fontSize: '14px', marginBottom: '6px' }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = '#5b5bd6')}
              onBlur={(e) => (e.target.style.borderColor = '#3a3a5a')}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: loading ? '#3a3a6a' : '#5b5bd6',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s ease',
            }}
          >
            {loading ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '24px', color: '#808098', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#8080ff', textDecoration: 'none', fontWeight: '600' }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
