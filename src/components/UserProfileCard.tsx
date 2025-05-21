import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getUserProfile } from '../lib/auth';

// Define types for Privy user objects
type PrivyWallet = {
  type: string;
  address: string;
};

type PrivyUser = {
  id: string;
  name?: string;
  avatar?: string;
  linkedAccounts?: any[];
};

export default function UserProfileCard() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Variables with default values
  let user: PrivyUser | null = null;
  let authenticated = false;

  // Safely try to use Privy
  try {
    const { usePrivy } = require('@privy-io/react-auth');
    ({ user, authenticated } = usePrivy());
  } catch (e) {
    setError('Privy authentication is not configured properly');
  }

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authenticated || !user) return;
      
      // Find the user's wallet
      const wallet = user.linkedAccounts?.find(
        (account: any) => account.type === 'wallet'
      ) as PrivyWallet | undefined;
      
      if (!wallet?.address) return;
      
      setLoading(true);
      try {
        // Fetch the user's profile from Supabase
        const { data, success } = await getUserProfile(wallet.address);
        if (success && data) {
          setProfile(data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Could not fetch profile data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [authenticated, user]);

  if (error) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Profile Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-400">{error}</p>
          <p className="text-gray-400 mt-2">
            Please make sure Privy and Supabase are configured correctly.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!authenticated || !user) {
    return (
      <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Not Connected</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">
            Connect your wallet to view your profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Get the first letter of the display name or use fallback
  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Format wallet address
  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const wallet = user.linkedAccounts?.find(
    (account: any) => account.type === 'wallet'
  ) as PrivyWallet | undefined;

  const walletAddress = wallet?.address;

  return (
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-white">Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center text-gray-400">Loading profile...</p>
        ) : (
          <>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 bg-purple-600">
                <AvatarImage 
                  src={profile?.avatar_url || user?.avatar} 
                  alt="Profile picture" 
                />
                <AvatarFallback className="bg-purple-700 text-white">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-medium text-white">
                  {profile?.display_name || user?.name || 'Anonymous User'}
                </p>
                {walletAddress && (
                  <p className="text-sm text-gray-400">
                    {formatWalletAddress(walletAddress)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">User ID:</span>
                <span className="text-gray-300">{profile?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined:</span>
                <span className="text-gray-300">
                  {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
} 