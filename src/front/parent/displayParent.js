import React, { useEffect, useState } from 'react';
import getParents from '../../back/parent/get.js';
import deleteParent from '../../back/parent/delete.js';
import verifyUser from "../../back/parent/check.js"
import edit from '../../assets/edit.svg';
import delete_button from '../../assets/delete.svg';
import fleche_gauche from "../../assets/keyboard_arrow_left_white.svg";
import check from "../../assets/check.svg";
import AbonnementParents from "../../back/utils/abonnements/abonement_parents.js"
import "./displayParent.css";

const DisplayParent = ({setmodalupdateParentisopen, setParentId }) => {
    const [parents, setParents] = useState([]);

    const fetchParents = async () => {
        const data = await getParents();
        setParents(data);
        console.log(data);
        
    };

    useEffect(() => {
        fetchParents();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Es-tu sûr de vouloir le surpimer ?")) {
            await deleteParent(id);
            fetchParents();
        }
    };

    return (
        <div className="parent-display-container">
            <div className="parent-list-title">
                <button className="back-to-calendar" onClick={() => { window.location.hash = "calendar"; }}>
                    <img src={fleche_gauche} alt="Retour" />
                </button>
                <h2>Liste des Parents</h2>
                <button style={{opacity:"0"}}className="back-to-calendar" onClick={() => { window.location.hash = "calendar"; }}>
                    <img src={fleche_gauche} alt="Retour" />
                </button>
            </div>

            <div className="parent-table-container">
                <table className="parent-table">
                    <thead>
                        <tr className="table-header">
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parents.length > 0 ? (
                            parents.map((parent) => (
                                <tr key={parent.id} className="table-row">
                                    <td>{parent.last_name}</td>
                                    <td>{parent.first_name}</td>
                                    <td>{parent.email}</td>
                                    <td>{parent.telephone}</td>
                                    <td>
                                        <div className="table-actions">
                                            {!parent.is_verified? 
                                            <button className='table-action-check-btn' onClick={() => verifyUser(parent.id)}>
                                                <img src={check} alt="verifier" />
                                            </button> : <></>}
                                            <button className="table-action-edit-btn" 
                                                onClick={async () => {
                                                    await setParentId(parent.id);
                                                    setmodalupdateParentisopen(true);
                                                }}>
                                                <img src={edit} alt="Modifier" />
                                            </button>
                                            <button className="table-action-delete-btn" onClick={() => handleDelete(parent.id)}>
                                                <img src={delete_button} alt="Supprimer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Aucun parent trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <AbonnementParents onUpdate = {fetchParents}/>
        </div>
    );
};

export default DisplayParent;