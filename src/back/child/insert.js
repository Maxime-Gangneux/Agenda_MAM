import supabase from '../utils/connexion.js';

async function insertChild(infos) {
    const { data, error } = await supabase
        .from('enfants')
        .insert([
            {   nom: infos.nom ? infos.nom : "",
                prenom: infos.prenom ? infos.prenom : "",
                date_naissance: infos.date_naissance ? infos.date_naissance : "",
                genre: infos.genre ? infos.genre : ""}
        ]);

    if (error) console.error('Erreur:', error);
    else console.log('Ajout réussi:', data);
}

export default insertChild;
