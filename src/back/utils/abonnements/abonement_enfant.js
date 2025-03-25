import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementEnfants = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          console.log("enfants changé");
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_enfants')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'enfants' }, handleUpdate)
          .subscribe();
      
        console.log("Abonnement réussi à la table enfants");
        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementEnfants;
  
