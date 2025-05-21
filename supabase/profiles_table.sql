-- DIRECT SIMPLE SCRIPT TO CREATE PROFILES TABLE
-- Run this in your Supabase SQL Editor

-- Create profiles table with correct column types
DROP TABLE IF EXISTS public.profiles;

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  privy_id TEXT,
  user_address TEXT,
  email TEXT,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_profiles_user_address ON public.profiles(user_address);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_privy_id ON public.profiles(privy_id);

-- Add comment
COMMENT ON TABLE public.profiles IS 'User profiles for the application';

-- Disable Row Level Security temporarily for testing
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- After testing is complete, enable RLS and add appropriate policies
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
-- CREATE POLICY "Allow insert for anyone" ON public.profiles FOR INSERT WITH CHECK (true);

-- Insert a test record
INSERT INTO public.profiles (id, privy_id, user_address, email, display_name)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'test-privy-id', '0xTestAddress', 'test@example.com', 'Test User'); 