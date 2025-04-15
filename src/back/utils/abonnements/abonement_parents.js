import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementParents = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          console.log("parents changé");
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_parents')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, handleUpdate)
          .subscribe();
      
        console.log("Abonnement réussi à la table parents");
        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementParents;
  
