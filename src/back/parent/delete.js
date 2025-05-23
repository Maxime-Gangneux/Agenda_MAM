import supabase from '../utils/connexion.js';

async function deleteParent(id) {
    const {error } = await supabase
        .from('users')
        .delete()
        .eq("id", id);

    if (error) console.error('Erreur:', error);
}

export default deleteParent;
