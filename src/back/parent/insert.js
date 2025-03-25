import supabase from '../utils/connexion.js';

async function insertparent(infos) {
    const { data, error } = await supabase
        .from('parents')
        .insert([
            {   nom: infos.nom ? infos.nom : "",
                prenom: infos.prenom ? infos.prenom : "",
                email: infos.email ? infos.email : "",
                telephone: infos.telephone ? infos.telephone : "",
                password: infos.password ? infos.password : "",
            }
        ]);

    if (error) console.error('Erreur:', error);
    else console.log('Ajout réussi:', data);
}

export default insertparent;
