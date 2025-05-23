import supabase from '../utils/connexion.js';

async function updateTemplate(id, infos) {
  const { data, error } = await supabase
    .from('template_horaire')
    .update({
      id_user: infos.id_user || null,
      id_enfant: infos.id_enfant || null,
      titre: infos.titre || null,
      heure_debut: infos.heure_debut,
      heure_fin: infos.heure_fin,
    })
    .eq('id', id);

  if (error) console.error('Erreur de mise à jour:', error);
}

export default updateTemplate;
