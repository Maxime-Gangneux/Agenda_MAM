import supabase from '../utils/connexion.js';

async function verifyUser(id) {
    if (!id) {
        console.error("Erreur : Aucun ID spécifié pour la vérification.");
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('id', id)
        .select();

    if (error) console.error('Erreur:', error);
}

export default verifyUser;
