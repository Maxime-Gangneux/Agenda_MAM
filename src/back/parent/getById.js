import supabase from '../utils/connexion.js';

async function getParentById(id) {
    const { data, error } = await supabase
        .from('parents')
        .select("*")
        .eq("id", id)

    if (error) {
        console.error('Erreur:', error);
        return [];
    } else {
        return data;
    }
}

export default getParentById;
