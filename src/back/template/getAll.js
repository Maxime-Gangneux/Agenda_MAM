import supabase from '../utils/connexion.js';

async function getTemplates(userId) {
  const { data, error } = await supabase
    .from('template_horaire')
    .select('*')
    .eq('id_user', userId)
    .order('heure_debut', { ascending: true });

  if (error) {
    console.error('Erreur lors de la récupération des templates:', error);
    return [];
  }

  return data;
}

export default getTemplates;
