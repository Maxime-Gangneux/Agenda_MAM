import supabase from '../utils/connexion.js';

async function updateChild(id, infos) {
    if (!id) {
        console.error("Erreur : Aucun ID spécifié pour la mise à jour.");
        return;
    }

    const { data, error } = await supabase
        .from('enfants')
        .update({
            nom: infos.nom ? infos.nom : undefined,
            prenom: infos.prenom ? infos.prenom : undefined,
            date_naissance: infos.date_naissance ? infos.date_naissance : undefined,
            genre: infos.genre ? infos.genre : undefined
        })
        .eq('id', id);

    if (error) console.error('Erreur:', error);
    else console.log('Mise à jour réussie:', data);
}

export default updateChild;