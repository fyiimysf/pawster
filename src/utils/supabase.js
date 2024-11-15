import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);


// const supabase = createClient('https://vbjluyefvsofglojkskp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiamx1eWVmdnNvZmdsb2prc2twIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MjQ3ODksImV4cCI6MjA0NzEwMDc4OX0.jVQAI_sPD7trIF1Y_KR_ERI38osVtRzDVwIZKYDOe70')


export default supabase;