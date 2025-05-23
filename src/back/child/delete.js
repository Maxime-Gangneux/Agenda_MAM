import supabase from '../utils/connexion.js';

async function deleteChild(id) {
    const {error } = await supabase
        .from('enfants')
        .delete()
        .eq("id", id);

    if (error) console.error('Erreur:', error);
}

export default deleteChild;
