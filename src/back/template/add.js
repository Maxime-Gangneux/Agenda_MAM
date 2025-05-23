import supabase from '../utils/connexion.js';

async function insertTemplate(infos) {
  const { data, error } = await supabase
    .from('template_horaire')
    .insert([
      {
        id_user: infos.id_user || null,
        id_enfant: infos.id_enfant || null,
        titre: infos.titre || null,
        heure_debut: infos.heure_debut,
        heure_fin: infos.heure_fin,
      }
    ]);

  if (error) {
    console.error('Erreur:', error);
    throw new Error('Erreur lors de l\'insertion dans la base de données');
  }
}

export default insertTemplate;
