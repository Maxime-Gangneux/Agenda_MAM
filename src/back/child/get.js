import supabase from '../utils/connexion.js';

async function getChild() {
    const { data, error } = await supabase
        .from('enfants')
        .select("*");

    if (error) {
        console.error('Erreur:', error);
        return [];
    } else {
        return data;
    }
}

export default getChild;
