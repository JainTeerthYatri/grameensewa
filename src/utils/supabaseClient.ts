import { createClient } from '@supabase/supabase-js';

// Retrieve Supabase configuration from localStorage or environment variables
const getStoredSupabaseConfig = () => {
  try {
    const savedUrl = localStorage.getItem('grammitra_supabase_url');
    const savedKey = localStorage.getItem('grammitra_supabase_key');
    if (savedUrl && savedKey) {
      return { url: savedUrl, key: savedKey };
    }
  } catch {
    // ignore
  }
  return {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key',
  };
};

const config = getStoredSupabaseConfig();

export const supabase = createClient(config.url, config.key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export const updateSupabaseCredentials = (url: string, key: string) => {
  localStorage.setItem('grammitra_supabase_url', url.trim());
  localStorage.setItem('grammitra_supabase_key', key.trim());
  window.location.reload();
};

export const isSupabaseConfigured = (): boolean => {
  const { url, key } = getStoredSupabaseConfig();
  return Boolean(
    url &&
    key &&
    url !== 'https://placeholder.supabase.co' &&
    !url.includes('placeholder')
  );
};
