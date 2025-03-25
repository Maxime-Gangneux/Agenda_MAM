import React, { useEffect, useState } from 'react';
import getParent from '../../back/parent/get.js';
import getParentById from '../../back/parent/getById.js';

const DisplayParent = () => {
    const [parents, setParents] = useState([]);
    const [parentById, setParentbyid] = useState([]);

    const fetchParents = async () => {
        const data = await getParent();
        const databyid = await getParentById(4);
        setParentbyid(JSON.stringify(databyid));
        setParents(data);
      };

    useEffect(() => {
        fetchParents();
    }, []);

    return (
        <div>
        <h2>Liste des Parents</h2>
        <table border="1">
            <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>e-mail</th>
                <th>telephone</th>
            </tr>
            </thead>
            <tbody>
            {parents.length > 0 ? (
                parents.map((parent) => (
                <tr key={parent.id}>
                    <td>{parent.id}</td>
                    <td>{parent.nom}</td>
                    <td>{parent.prenom}</td>
                    <td>{parent.email}</td>
                    <td>{parent.telephone}</td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="4">Aucun parent trouvé.</td>
                </tr>
            )}
            </tbody>
        </table>

        <p>data by id {parentById}</p>
        </div>
    );
};

export default DisplayParent;
