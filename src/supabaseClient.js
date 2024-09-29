import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vkrvkriysxfrfhmkojjg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrcnZrcml5c3hmcmZobWtvampnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyMDE4NTEsImV4cCI6MjA0MDc3Nzg1MX0.6qeEJI_lQSnWDzyHqTM3E0pNb6_5pCIpxn8Da5CbtAg";

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);