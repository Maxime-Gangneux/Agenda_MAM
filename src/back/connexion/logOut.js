import supabase from "../utils/connexion.js";

async function logout() {
    await supabase.auth.signOut();
    localStorage.removeItem("userInfo");
}
export default logout;