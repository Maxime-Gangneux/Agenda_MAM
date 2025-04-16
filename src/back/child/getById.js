import supabase from '../utils/connexion.js';

async function getChildById(id) {
    console.log("ID reçu :", id);

    const { data, error } = await supabase
        .from('enfants')
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error('Erreur:', error);
        return error;
    }

    return data;
}

export default getChildById;
