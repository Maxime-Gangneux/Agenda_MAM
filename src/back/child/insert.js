import supabase from '../utils/connexion.js';

async function insertChild(infos) {

    function generateLightRandomColor() {
        const minValue = 128; // Valeur minimale pour chaque composant RGB (plus élevé = plus clair)
        
        // Générer des valeurs RGB dans la plage [minValue, 255]
        const r = Math.floor(Math.random() * (256 - minValue) + minValue);
        const g = Math.floor(Math.random() * (256 - minValue) + minValue);
        const b = Math.floor(Math.random() * (256 - minValue) + minValue);
      
        // Convertir en couleur hexadécimale
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    const { data, error } = await supabase
        .from('enfants')
        .insert([
            {   nom: infos.nom ? infos.nom : "",
                prenom: infos.prenom ? infos.prenom : "",
                date_naissance: infos.date_naissance ? infos.date_naissance : "",
                genre: infos.genre ? infos.genre : "",
                color: generateLightRandomColor()}
        ]);

    if (error) console.error('Erreur:', error);
    else console.log('Ajout réussi:', data);
}

export default insertChild;
