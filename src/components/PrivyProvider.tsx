import React, { useEffect, useState } from 'react';
import { PrivyProvider as PrivyAuthProvider, usePrivy } from '@privy-io/react-auth';
import { syncUserWithSupabase } from '../lib/auth';

// Simple wrapper to sync Privy users to Supabase
const PrivySyncWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const [authError, setAuthError] = useState<string | null>(null);

  // Handle auth errors
  useEffect(() => {
    const handleAuthErrors = () => {
      // Clear any previous errors
      setAuthError(null);
      
      // Check if we're authenticated but have no user data (potential token issue)
      if (authenticated && !user && ready) {
        console.error("Authentication issue detected: authenticated but no user data");
        setAuthError("Authentication token issue detected");
        
        // Try to logout and re-login to reset the auth state
        setTimeout(async () => {
          try {
            console.log("Attempting to logout and reset auth state");
            await logout();
          } catch (error) {
            console.error("Error during logout:", error);
          }
        }, 1000);
      }
    };
    
    handleAuthErrors();
  }, [authenticated, user, ready, logout]);

  // Sync user with Supabase when authentication state changes
  useEffect(() => {
    const syncUser = async () => {
      if (!ready || !authenticated || !user) return;

      try {
        // If there's an auth error, don't try to sync
        if (authError) return;
      
        // Get wallet address if available
        const wallet = user.linkedAccounts?.find(account => account.type === 'wallet');
        const walletAddress = wallet?.address || '';

        // Get email if available
        const emailAccount = user.linkedAccounts?.find(account => account.type === 'email');
        const emailAddress = emailAccount ? 
          (emailAccount as any).email || '' : '';
        
        // Skip if no identifier is available
        if (!walletAddress && !emailAddress) return;
        
        // Use wallet address as primary identifier if available, otherwise use email
        const primaryIdentifier = walletAddress || emailAddress;
        
        // Get display name
        const displayName = emailAddress || walletAddress?.slice(0, 6);
        
        // Sync user to Supabase
        const result = await syncUserWithSupabase(
          user.id,
          primaryIdentifier,
          displayName,
          ''  // No avatar for now
        );
        
        if (!result.success) {
          console.error("Error syncing with Supabase:", result.error);
        }
      } catch (error) {
        console.error('Error syncing user to Supabase:', error);
      }
    };

    syncUser();
  }, [ready, authenticated, user, authError]);

  // Show error message if there's an auth error
  if (authError) {
    return (
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        padding: '10px', 
        background: '#f44336', 
        color: 'white', 
        textAlign: 'center',
        zIndex: 9999 
      }}>
        Authentication error: {authError}. Please try logging in again.
      </div>
    );
  }

  return <>{children}</>;
};

interface PrivyProviderProps {
  children: React.ReactNode;
}

export default function PrivyProvider({ children }: PrivyProviderProps) {
  // Log environment values in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Environment check:');
      console.log('PRIVY_APP_ID:', import.meta.env.VITE_PRIVY_APP_ID || 'Not set');
    }
  }, []);

  return (
    <PrivyAuthProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'dark',
          accentColor: '#8B5CF6',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        }
      }}
    >
      <PrivySyncWrapper>
        {children}
      </PrivySyncWrapper>
    </PrivyAuthProvider>
  );
} 