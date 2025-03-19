import React, { useEffect, useState } from 'react';
import getChild from '../../back/child/get.js';
import Abonnement from '../../back/utils/abonement.js';
import getChildByIdid from '../../back/child/getById.js';

const DisplayChild = () => {
    const [children, setChildren] = useState([]);
    const [childbyid, setchidbyid] = useState([]);

    const fetchChildren = async () => {
        const data = await getChild();
        const databyid = await getChildByIdid(4);
        setchidbyid(JSON.stringify(databyid));
        setChildren(data);
      };

    useEffect(() => {
        fetchChildren();
    }, []);

    Abonnement('enfants', fetchChildren);

    return (
        <div>
        <h2>Liste des Enfants</h2>
        <table border="1">
            <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Date de naissance</th>
                <th>Genre</th>
            </tr>
            </thead>
            <tbody>
            {children.length > 0 ? (
                children.map((child) => (
                <tr key={child.id}>
                    <td>{child.id}</td>
                    <td>{child.nom}</td>
                    <td>{child.prenom}</td>
                    <td>{child.date_naissance}</td>
                    <td>{child.genre}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4">Aucun enfant trouvé.</td>
                </tr>
            )}
            </tbody>
        </table>

        <p>data by id {childbyid}</p>
        </div>
    );
};

export default DisplayChild;
