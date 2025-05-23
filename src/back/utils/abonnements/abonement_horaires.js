import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementHoraires = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_horaires')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'horaires_garde' }, handleUpdate)
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementHoraires;
  
