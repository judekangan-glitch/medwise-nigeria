import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing! App will run in local-only mode. 🛡️')
}

// Ensure the client doesn't crash on invalid input during dev
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      auth: { onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }), getSession: async () => ({ data: { session: null } }) },
      from: () => ({ upsert: async () => ({ error: null }), select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) })
    };
