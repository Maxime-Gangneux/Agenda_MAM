import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementParents = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_parents')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, handleUpdate)
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementParents;
  
