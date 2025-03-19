import React, { useState } from "react";
import insertparent from "../../back/parent/insert.js";
import deleteParent from "../../back/parent/delete.js";

const ParentForm = () => {

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: ""
    });

    const [deleteId, setDeleteId] = useState("");  // Ensure deleteId is an empty string initially

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSupressChange = (e) => {
        setDeleteId(e.target.value || "");  // Set empty string if undefined
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await insertparent(formData);
        setFormData({
            nom: "",
            prenom: "",
            email: "",
            telephone: ""
        }); // Clear form after submit
    };

    const handlesupress = async (e) => {
        e.preventDefault();
        
        await deleteParent(deleteId);
        setDeleteId(""); // Clear the delete ID after submit
    };

    return (
        <div>
            <h2>Ajouter un Parent</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom :</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                <div>
                    <label>Prénom :</label>
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </div>

                <div>
                    <label>Email :</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div>
                    <label>Téléphone :</label>
                    <input type="tel" name="telephone" value={formData.telephone} onChange={handleChange} required />
                </div>

                <button type="submit">Ajouter</button>
            </form>

            <h2>Supprimer un Parent</h2>

            <form onSubmit={handlesupress}>
                <div>
                    <label>Id :</label>
                    <input type="number" name="id" value={deleteId} onChange={handleSupressChange} required />
                </div>

                <button type="submit">Supprimer</button>
            </form>
        </div>
    );
};

export default ParentForm;
