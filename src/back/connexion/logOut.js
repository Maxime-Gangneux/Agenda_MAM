import supabase from "../utils/connexion.js";

async function logout() {
    await supabase.auth.signOut();
    console.log("Déconnexion réussie !");
}
export default logout;