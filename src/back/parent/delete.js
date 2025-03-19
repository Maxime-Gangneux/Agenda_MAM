import supabase from '../utils/connexion.js';

async function deleteParent(id) {
    const {error } = await supabase
        .from('parents')
        .delete()
        .eq("id", id);

    if (error) console.error('Erreur:', error);
    else console.log('supression réussite:');
}

export default deleteParent;
