import supabase from '../utils/connexion.js';

async function getParentById(id) {
    const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq("id", id)
        .eq("role", "parent")

    if (error) {
        console.error('Erreur:', error);
        return [];
    } else {
        return data;
    }
}

export default getParentById;
