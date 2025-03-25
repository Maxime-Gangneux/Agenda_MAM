import supabase from "../utils/connexion.js";

async function getUser() {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
        return null;
    }

    return user;
}
export default getUser;