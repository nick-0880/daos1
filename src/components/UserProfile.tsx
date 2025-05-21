import React from 'react';
import { useAuth } from './SimpleAuthProvider';

export default function UserProfile() {
  const { user, logout, isLoading } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px',
      backgroundColor: '#FFF',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 100
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#8B5CF6',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '18px',
        marginBottom: '10px'
      }}>
        {user.email ? user.email[0].toUpperCase() : 'W'}
      </div>
      
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        {user.email || user.address?.slice(0, 6) + '...' + user.address?.slice(-4)}
      </div>
      
      <button
        onClick={logout}
        disabled={isLoading}
        style={{
          backgroundColor: '#F3F4F6',
          color: '#374151',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Logout
      </button>
    </div>
  );
} 