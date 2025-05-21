import React, { useState } from 'react';

export default function SimpleWalletButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = () => {
    setIsConnecting(true);
    
    // Mock wallet connection
    setTimeout(() => {
      const mockAddress = '0x' + Math.random().toString(16).slice(2, 10) + '...' + Math.random().toString(16).slice(2, 6);
      setAddress(mockAddress);
      setIsConnecting(false);
      // Store in local storage to persist through reloads
      localStorage.setItem('mock_wallet_address', mockAddress);
    }, 1000);
  };

  const disconnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setAddress(null);
      setIsConnecting(false);
      localStorage.removeItem('mock_wallet_address');
    }, 500);
  };

  // Check for existing connection on load
  React.useEffect(() => {
    const savedAddress = localStorage.getItem('mock_wallet_address');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  return (
    <button
      onClick={address ? disconnectWallet : connectWallet}
      disabled={isConnecting}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.75rem 1.25rem',
        backgroundColor: '#8B5CF6',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '0.5rem',
        border: 'none',
        cursor: isConnecting ? 'not-allowed' : 'pointer',
        minWidth: '160px',
        transition: 'all 0.2s ease',
        opacity: isConnecting ? 0.7 : 1,
      }}
    >
      {isConnecting ? (
        'Connecting...'
      ) : address ? (
        <span>
          <span style={{ marginRight: '8px' }}>🟢</span>
          {address}
        </span>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
} 