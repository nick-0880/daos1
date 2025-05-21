import { supabase } from './supabase';

/**
 * Creates or updates a user profile in Supabase when a user authenticates with Privy
 * @param userId - The UUID of the user from Privy
 * @param userIdentifier - The wallet address or email of the user
 * @param displayName - Optional display name for the user
 * @param avatarUrl - Optional avatar URL for the user
 */
export async function syncUserWithSupabase(
  userId: string,
  userIdentifier: string,
  displayName?: string,
  avatarUrl?: string
) {
  try {
    // Determine if this is an email or wallet address
    const isEmail = userIdentifier.includes('@');
    const queryField = isEmail ? 'email' : 'user_address';

    // Check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq(queryField, userIdentifier)
      .maybeSingle();
    
    if (checkError) {
      console.error('Error checking for existing profile:', checkError);
      return { success: false, error: checkError };
    }

    if (existingProfile) {
      // Update existing profile
      const updateData = {
        privy_id: userId,
        display_name: displayName,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      };
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq(queryField, userIdentifier);
      
      if (updateError) {
        console.error('Error updating profile:', updateError);
        return { success: false, error: updateError };
      }
      
      return { success: true };
    } else {
      // Create new profile with a properly formatted UUID
      const profileId = crypto.randomUUID();
      
      const newProfile = {
        id: profileId,
        user_address: isEmail ? null : userIdentifier,
        email: isEmail ? userIdentifier : null,
        privy_id: userId,
        display_name: displayName,
        avatar_url: avatarUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { error: insertError } = await supabase
        .from('profiles')
        .insert(newProfile);
      
      if (insertError) {
        console.error('Error creating profile:', insertError);
        return { success: false, error: insertError };
      }
      
      return { success: true };
    }
  } catch (error) {
    console.error('Error in syncUserWithSupabase:', error);
    return { success: false, error };
  }
}

/**
 * Fetches a user's profile from Supabase by wallet address or email
 * @param identifier - The wallet address or email to look up
 */
export async function getUserProfile(identifier: string) {
  try {
    // Determine if this is an email or wallet address
    const isEmail = identifier.includes('@');
    const queryField = isEmail ? 'email' : 'user_address';

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq(queryField, identifier)
      .maybeSingle();

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { data: null, success: false, error };
  }
}

// The following functions are removed because they reference tables 
// that aren't included in our simplified schema focused on authentication only

/* 
// Uncomment and add these tables to your schema when needed

export async function getUserHoldings(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from('holdings')
      .select(`
        *,
        tokens (*)
      `)
      .eq('user_address', walletAddress);

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Error fetching user holdings:', error);
    return { data: null, success: false, error };
  }
}

export async function getUserTransactions(walletAddress: string) {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        tokens (id, name, symbol, image_url)
      `)
      .eq('user_address', walletAddress)
      .order('transaction_date', { ascending: false });

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    return { data: null, success: false, error };
  }
}
*/ 