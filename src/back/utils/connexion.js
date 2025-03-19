import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glpkdirtdltarpihfolo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscGtkaXJ0ZGx0YXJwaWhmb2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MjE3OTksImV4cCI6MjA1NjQ5Nzc5OX0.NidzHePi3g84fNUYuQY7zsrmNLRhLNoGLAm77BG_Flc';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
