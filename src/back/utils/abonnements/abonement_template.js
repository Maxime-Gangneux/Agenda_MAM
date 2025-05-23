import { useEffect} from "react";
import supabase from "../connexion.js";

const AbonnementTemplate = ({onUpdate}) => {
    useEffect(() => {
        const handleUpdate = () => {
          onUpdate();
        };
      
        const subscription = supabase
          .channel('realtime_template')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'template_horaire' }, handleUpdate)
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      }, []);
}
export default AbonnementTemplate;
  
