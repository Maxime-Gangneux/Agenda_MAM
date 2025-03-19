import supabase from '../utils/connexion.js';

async function getChildById(id) {
    const { data, error } = await supabase
        .from('enfants')
        .select("*")
        .eq("id", id)

    if (error) {
        console.error('Erreur:', error);
        return [];
    } else {
        return data;
    }
}

export default getChildById;
