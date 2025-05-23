import supabase from "../utils/connexion.js";

async function signup(email, firstName, lastName, password) {
    try {
        // Création de l'utilisateur avec l'authentification Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password
        });

        if (authError) {
            console.error("Erreur lors de la création de l'utilisateur:", authError);
            return { error: authError.message };
        }

        const userId = authData.user?.id;
        if (!userId) {
            return { error: "Utilisateur non créé correctement" };
        }

        // Insérer l'utilisateur dans la table 'users' avec un rôle "parent"
        const { error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: userId, // Utiliser l'ID généré par Supabase Auth
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    role: 'parent',
                    is_verified: true,
                }
            ]);

        if (insertError) {
            console.error("Erreur d'insertion dans la table users:", insertError);
            return { error: insertError.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Erreur lors du processus d'inscription:", error);
        return { error: error.message };
    }
}

export default signup;