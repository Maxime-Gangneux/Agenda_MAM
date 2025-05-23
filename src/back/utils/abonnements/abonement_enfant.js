import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementEnfants = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_enfants')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'enfants' }, handleUpdate)
          .subscribe();
          
        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementEnfants;
  
