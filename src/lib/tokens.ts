import { supabase } from './supabase';
import type { Database } from '../types/supabase';

type Token = Database['public']['Tables']['tokens']['Row'];
type TokenInsert = Database['public']['Tables']['tokens']['Insert'];
type TokenUpdate = Database['public']['Tables']['tokens']['Update'];

/**
 * Fetches all tokens from the database with optional filters
 * @param options - Optional query parameters
 */
export async function getTokens(options?: {
  featured?: boolean;
  limit?: number;
  search?: string;
  sortBy?: 'price' | 'market_cap' | 'change_24h' | 'volume_24h';
  sortDirection?: 'asc' | 'desc';
}) {
  try {
    let query = supabase.from('tokens').select('*');

    // Apply filters
    if (options?.featured !== undefined) {
      query = query.eq('is_featured', options.featured);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,symbol.ilike.%${options.search}%`);
    }

    // Apply sorting
    if (options?.sortBy) {
      query = query.order(options.sortBy, { ascending: options.sortDirection === 'asc' });
    } else {
      query = query.order('market_cap', { ascending: false });
    }

    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return { data: null, success: false, error };
  }
}

/**
 * Fetches a single token by ID
 * @param id - The token ID
 */
export async function getTokenById(id: string) {
  try {
    const { data, error } = await supabase
      .from('tokens')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error(`Error fetching token ${id}:`, error);
    return { data: null, success: false, error };
  }
}

/**
 * Creates a new token
 * @param token - The token data to insert
 * @param creatorAddress - The wallet address of the token creator
 */
export async function createToken(token: Omit<TokenInsert, 'creator_address'>, creatorAddress: string) {
  try {
    const { data, error } = await supabase
      .from('tokens')
      .insert({
        ...token,
        creator_address: creatorAddress,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error('Error creating token:', error);
    return { data: null, success: false, error };
  }
}

/**
 * Updates an existing token
 * @param id - The token ID to update
 * @param updates - The token data to update
 * @param creatorAddress - The wallet address of the token creator (for validation)
 */
export async function updateToken(id: string, updates: TokenUpdate, creatorAddress: string) {
  try {
    // First, verify this user is the creator of the token
    const { data: token } = await supabase
      .from('tokens')
      .select('creator_address')
      .eq('id', id)
      .single();

    if (!token || token.creator_address !== creatorAddress) {
      throw new Error('Unauthorized: You are not the creator of this token');
    }

    const { data, error } = await supabase
      .from('tokens')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, success: true };
  } catch (error) {
    console.error(`Error updating token ${id}:`, error);
    return { data: null, success: false, error };
  }
}

/**
 * Records a token purchase
 * @param tokenId - The token being purchased
 * @param buyerAddress - The wallet address of the buyer
 * @param amount - The amount of tokens purchased
 * @param pricePerToken - The price per token
 * @param txHash - Optional transaction hash from the blockchain
 */
export async function recordTokenPurchase(
  tokenId: string,
  buyerAddress: string,
  amount: number,
  pricePerToken: number,
  txHash?: string
) {
  try {
    // 1. Get the token to make sure it exists
    const { data: token, error: tokenError } = await supabase
      .from('tokens')
      .select('*')
      .eq('id', tokenId)
      .single();

    if (tokenError) throw tokenError;

    // 2. Record the transaction
    const { error: recordError } = await supabase.from('transactions').insert({
      user_address: buyerAddress,
      token_id: tokenId,
      transaction_type: 'buy',
      amount,
      price_per_token: pricePerToken,
      total_value_usd: amount * pricePerToken,
      tx_hash: txHash,
    });

    if (recordError) throw recordError;

    // 3. Update or create the holding
    const { data: existingHolding } = await supabase
      .from('holdings')
      .select('*')
      .eq('user_address', buyerAddress)
      .eq('token_id', tokenId)
      .maybeSingle();

    if (existingHolding) {
      // Update existing holding
      const newAmount = existingHolding.amount + amount;
      const newPurchaseValue = (existingHolding.purchase_value_usd || 0) + (amount * pricePerToken);
      
      const { error: updateError } = await supabase
        .from('holdings')
        .update({
          amount: newAmount,
          purchase_value_usd: newPurchaseValue,
        })
        .eq('id', existingHolding.id);

      if (updateError) throw updateError;
    } else {
      // Create new holding
      const { error: insertError } = await supabase.from('holdings').insert({
        user_address: buyerAddress,
        token_id: tokenId,
        amount,
        purchase_value_usd: amount * pricePerToken,
      });

      if (insertError) throw insertError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error recording token purchase:', error);
    return { success: false, error };
  }
} 