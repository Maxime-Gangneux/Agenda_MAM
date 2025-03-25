import supabase from "../utils/connexion.js";

async function login(email, password) {
    try {
        // Connexion de l'utilisateur avec Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (authError) {
            console.error("Erreur lors de la connexion:", authError);
            return { error: authError.message };
        }

        const userId = authData.user?.id;
        if (!userId) {
            return { error: "Utilisateur non trouvé" };
        }

        // Récupérer les infos de l'utilisateur depuis la table 'users'
        const { data: userInfo, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        if (userError) {
            console.error("Erreur lors de la récupération des infos utilisateur:", userError);
            return { error: userError.message };
        }

        return {
            success: true,
            token: authData.session.access_token,
            user: userInfo
        };
    } catch (error) {
        console.error("Erreur lors du processus de connexion:", error);
        return { error: error.message };
    }
}

export default login;
