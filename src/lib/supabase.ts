import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Missing Supabase credentials!
    Add these to your .env file:
    VITE_SUPABASE_URL=your-url
    VITE_SUPABASE_KEY=your-key
  `)
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)