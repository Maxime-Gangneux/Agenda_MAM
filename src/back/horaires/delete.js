import supabase from '../utils/connexion.js';

async function deleteHoraire(id) {
    const {error } = await supabase
        .from('horaires_garde')
        .delete()
        .eq("id", id);

    if (error) console.error('Erreur:', error);
    else console.log('supression réussite:');
}

export default deleteHoraire;
