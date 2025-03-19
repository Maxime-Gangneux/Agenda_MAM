import { useEffect } from 'react';
import supabase from './connexion.js';

const Abonnement = (table, onUpdate) => {
  useEffect(() => {

    const handleUpdate = () => {
      console.log(`${table} changé`);
      onUpdate();
    };

    const subscription = supabase
      .channel('realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table }, handleUpdate)
      .subscribe();

    console.log(`Abonnement réussi à la table ${table}`);

    return () => {
      subscription.unsubscribe();
    };
  }, [table, onUpdate]);
};

export default Abonnement;
