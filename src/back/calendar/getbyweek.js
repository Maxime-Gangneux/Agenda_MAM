import supabase from '../utils/connexion.js';

async function getByWeek(startweek, endweek) {
    const { data, error } = await supabase
        .from('horaires_garde')
        .select("*")
        .gte("date", startweek.toISOString().split('T')[0])
        .lte("date", endweek.toISOString().split('T')[0]);

    if (error) {
        console.error('Erreur:', error);
        return [];
    }
    return data;
}

export default getByWeek;
