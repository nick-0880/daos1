import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import Button from './button';

export default function ConnectWalletButton() {
  const { login, logout, authenticated, ready, user } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);

  const handleWalletAction = async () => {
    setIsLoading(true);
    try {
      if (authenticated) {
        await logout();
      } else {
        await login();
      }
    } catch (error) {
      console.error('Error with wallet action:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Find a wallet address to display if user is authenticated
  const displayAddress = React.useMemo(() => {
    if (!authenticated || !user) return null;
    
    const wallet = user.linkedAccounts?.find(account => account.type === 'wallet');
    if (wallet?.address) {
      return `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;
    }
    
    return null;
  }, [authenticated, user]);

  // Label for the button based on authentication state and loading
  const buttonLabel = isLoading 
    ? 'Loading...'
    : authenticated 
      ? displayAddress || 'Disconnect'
      : 'Connect Wallet';

  // If Privy is still initializing
  if (!ready) {
    return <Button isLoading variant="primary" disabled>Loading...</Button>;
  }
  
  return (
    <Button
      onClick={handleWalletAction}
      isLoading={isLoading}
      variant="primary"
      leftIcon={authenticated ? '🟢' : undefined}
    >
      {buttonLabel}
    </Button>
  );
} 