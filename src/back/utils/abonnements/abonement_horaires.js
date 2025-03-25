import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementHoraires = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          console.log("horaires_garde changé");
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_horaires')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'horaires_garde' }, handleUpdate)
          .subscribe();
      
        console.log("Abonnement réussi à la table horaires_garde");
        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementHoraires;
  
