import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://glpkdirtdltarpihfolo.supabase.co", // Remplace par ton URL Supabase
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscGtkaXJ0ZGx0YXJwaWhmb2xvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5MjE3OTksImV4cCI6MjA1NjQ5Nzc5OX0.NidzHePi3g84fNUYuQY7zsrmNLRhLNoGLAm77BG_Flc", // Remplace par ta clé publique
    {
        auth: {
            persistSession: true, // Active la persistance automatique de la session
            autoRefreshToken: true, // Rafraîchit le token automatiquement
            detectSessionInUrl: true, // Détecte les sessions dans l'URL après un login
        },
    }
);

export default supabase;
