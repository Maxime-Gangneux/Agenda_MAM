import supabase from '../utils/connexion.js';

async function insertHoraire(infos) {
    const { data, error } = await supabase
        .from('horaires_garde')
        .insert([
            {   id_enfant: infos.id_enfant ? infos.id_enfant : "",
                date: infos.date ? infos.date : "",
                heure_debut: infos.heure_debut ? infos.heure_debut : "",
                heure_fin: infos.heure_fin ? infos.heure_fin : ""}
        ]);

    if (error) console.error('Erreur:', error);
    else console.log('Ajout réussi:', data);
}

export default insertHoraire;
