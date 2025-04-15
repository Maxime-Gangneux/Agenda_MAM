import supabase from '../utils/connexion.js';

async function getParent() {
    const { data, error } = await supabase
        .from('users')
        .select("*")
        .eq("role", "parent")

    if (error) {
        console.error('Erreur:', error);
        return [];
    } else {
        return data;
    }
}

export default getParent;
