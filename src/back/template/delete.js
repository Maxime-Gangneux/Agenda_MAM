import supabase from '../utils/connexion.js';

async function deleteTemplate(id) {
  const { data, error } = await supabase
    .from('template_horaire')
    .delete()
    .eq('id', id);

  if (error) console.error('Erreur de suppression:', error);
}

export default deleteTemplate;
