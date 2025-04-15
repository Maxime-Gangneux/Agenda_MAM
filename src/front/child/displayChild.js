import React, { useEffect, useState } from 'react';
import AbonnementEnfants from "../../back/utils/abonnements/abonement_enfant.js";
import deleteChild from "../../back/child/delete.js";
import getChild from '../../back/child/get.js';
import edit from '../../assets/edit.svg';
import delete_button from '../../assets/delete.svg';
import add from "../../assets/add.svg";
import fleche_gauche from "../../assets/keyboard_arrow_left_white.svg"
import "./displayChild.css";

const DisplayChild = ({ setmodalcreateChildisopen, setmodalupdateChildisopen, setchildId }) => {
    const [children, setChildren] = useState([]);

    const fetchChildren = async () => {
        const data = await getChild();
        setChildren(data);
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    const handleDelete = async (id) => {
        await deleteChild(id);
        fetchChildren(); // Rafraîchir la liste après suppression
    };

    return (
        <div className="child-display-container">
            <div className="child-list-title">
                <button className="back-to-calendar" onClick={() => { window.location.hash = "calendar"; }}><img src={fleche_gauche} alt="Retour" /></button>
                <h2>Liste des Enfants</h2>
                <button className="add-button" onClick={() => setmodalcreateChildisopen(true)}>
                    <img src={add} alt="Ajouter" />
                </button>
            </div>

            <div className="child-table-container">
                <table className="child-table">
                    <thead>
                        <tr className="table-header">
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Genre</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children.length > 0 ? (
                            children.map((child) => (
                                <tr key={child.id} className="table-row">
                                    <td>{child.nom}</td>
                                    <td>{child.prenom}</td>
                                    <td>{child.date_naissance}</td>
                                    <td>{child.genre}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="table-action-edit-btn" 
                                                onClick={async () => {
                                                    await setchildId(child.id);
                                                    setmodalupdateChildisopen(true);
                                                }}>
                                                <img src={edit} alt="Modifier" />
                                            </button>
                                            <button className="table-action-delete-btn" onClick={() => handleDelete(child.id)}>
                                                <img src={delete_button} alt="Supprimer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Aucun enfant trouvé.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AbonnementEnfants onUpdate={fetchChildren} />
        </div>
    );
};

export default DisplayChild;
