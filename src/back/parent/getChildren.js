import supabase from '../utils/connexion.js';

async function getChildrenByParentId(parentId) {
    const { data, error } = await supabase
        .from('parent_enfant')
        .select('enfants(*)') // jointure vers la table enfants
        .eq('id_parent', parentId);

    if (error) {
        console.error('Erreur lors de la récupération des enfants :', error);
        return [];
    }

    // Chaque item a la forme { enfants: { ...infosEnfant } }, donc on peut extraire directement
    return data.map(entry => entry.enfants);
}

export default getChildrenByParentId;
