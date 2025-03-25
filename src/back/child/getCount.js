import supabase from '../utils/connexion.js';

async function getCount() {
    const { count, error } = await supabase
        .from('enfants')
        .select("*", { count: "exact", head: true });

    if (error) {
        console.error('Erreur:', error);
        return 0;
    } else {
        return count;
    }
}

export default getCount;
