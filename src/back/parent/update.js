import supabase from '../utils/connexion.js';

async function updateParent(id, infos) {
    if (!id) {
        console.error("Erreur : Aucun ID spécifié pour la mise à jour.");
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .update({
            last_name: infos.last_name ? infos.last_name : undefined,
            first_name: infos.first_name ? infos.first_name : undefined,
            email: infos.email ? infos.email : undefined,
            telephone: infos.telephone ? infos.telephone : undefined
        })
        .eq('id', id)
        .select()

    if (error) console.error('Erreur:', error);
}

export default updateParent;