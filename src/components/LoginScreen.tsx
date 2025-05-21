import React, { useState } from 'react';
import { useAuth } from './SimpleAuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const { login, loginWithWallet, isLoading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '100px auto', 
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#8B5CF6' }}>Login</h1>

      {error && (
        <div style={{ 
          padding: '0.75rem', 
          borderRadius: '4px', 
          backgroundColor: '#FEE2E2', 
          color: '#DC2626',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label 
            htmlFor="email" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: 'bold' 
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={{ 
              width: '100%', 
              padding: '0.75rem',
              borderRadius: '4px',
              border: '1px solid #D1D5DB',
              fontSize: '1rem'
            }}
            required
          />
        </div>

        <button 
          type="submit"
          disabled={isLoading} 
          style={{ 
            width: '100%',
            backgroundColor: '#8B5CF6',
            color: 'white',
            padding: '0.75rem',
            borderRadius: '4px',
            border: 'none',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            marginBottom: '1rem'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login with Email'}
        </button>
      </form>

      <div style={{ textAlign: 'center', margin: '1.5rem 0', color: '#6B7280' }}>or</div>

      <button 
        onClick={loginWithWallet}
        disabled={isLoading}
        style={{ 
          width: '100%',
          backgroundColor: '#4B5563',
          color: 'white',
          padding: '0.75rem',
          borderRadius: '4px',
          border: 'none',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  );
} 