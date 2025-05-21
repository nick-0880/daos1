/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly BASE_URL: string;
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
    readonly VITE_PRIVY_APP_ID: string;
    readonly VITE_TEMPO: string;
    [key: string]: string | undefined;
  };
} 