import supabase from '../utils/connexion.js';

async function insertChild(infos, id_parent) {
    function generateLightRandomColor() {
        const minValue = 128;
        const r = Math.floor(Math.random() * (256 - minValue) + minValue);
        const g = Math.floor(Math.random() * (256 - minValue) + minValue);
        const b = Math.floor(Math.random() * (256 - minValue) + minValue);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    const { data, error } = await supabase
        .from('enfants')
        .insert([{
            nom: infos.nom || "",
            prenom: infos.prenom || "",
            date_naissance: infos.date_naissance || "",
            genre: infos.genre || "",
            color: generateLightRandomColor()
        }])
        .select();

    if (error || !data || data.length === 0) {
        console.error("Erreur lors de l'insertion de l'enfant :", error);
        return;
    }

    const enfantId = data[0].id;

    const { error: relError } = await supabase
        .from("parent_enfant")
        .insert([{
            id_enfant: enfantId,
            id_parent: id_parent
        }]);

    if (relError) {
        console.error("Erreur lors de l'association parent/enfant :", relError);
        return;
    }

    console.log('Ajout réussi:', data);
}

export default insertChild;
