import supabase from '../utils/connexion.js';

async function insertHoraire(infos) {
    const { id_enfant, date, heure_debut, heure_fin } = infos;

    // Convertir la date au format ISO 8601 sans heure
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Date sans l'heure

    // Vérifier s'il existe déjà un horaire pour cet enfant à la même date
    const { data: existingHoraire, error: fetchError } = await supabase
        .from('horaires_garde')
        .select('*')
        .eq('id_enfant', id_enfant)
        .eq('date', formattedDate);  // On ne compare plus avec l'heure

    if (fetchError) {
        console.error('Erreur de récupération des horaires:', fetchError);
        return;
    }

    // Si un horaire existe, on le supprime avant d'ajouter le nouveau
    if (existingHoraire.length > 0) {  // Vérifier s'il y a des résultats
        const { error: deleteError } = await supabase
            .from('horaires_garde')
            .delete()
            .eq('id_enfant', id_enfant)
            .eq('date', formattedDate);

        if (deleteError) {
            console.error('Erreur de suppression:', deleteError);
            return;
        }
    }

    // Ajouter le nouvel horaire
    const { data, error } = await supabase
        .from('horaires_garde')
        .insert([{
            id_enfant: id_enfant,
            date: formattedDate, // Utilisation du format complet ISO pour la date sans l'heure
            heure_debut: heure_debut,
            heure_fin: heure_fin
        }]);

    if (error) {
        console.error('Erreur d\'ajout:', error);}
}

export default insertHoraire;
