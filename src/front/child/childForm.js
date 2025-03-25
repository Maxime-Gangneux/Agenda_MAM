import React, { useState } from "react";
import insertChild from "../../back/child/insert.js";
import deleteChild from "../../back/child/delete.js";

const ChildForm = () => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        date_naissance: "",
        genre: "garçon"
    });

    const [deleteId, setDeleteId] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSupressChange = (e) => {
        setDeleteId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        await insertChild(formData);
        setFormData({
            nom: "",
            prenom: "",
            date_naissance: "",
            genre: "garçon"
        });
    };

    const handleSupress = async (e) => {
        e.preventDefault();
        
        await deleteChild(deleteId);
        setDeleteId("");
    };

    return (
        <div>
            <h2>Ajouter un enfant</h2>
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
                    <label>Date de naissance :</label>
                    <input type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
                </div>

                <div>
                    <label>Genre :</label>
                    <select name="genre" value={formData.genre} onChange={handleChange}>
                        <option value="garçon">Garçon</option>
                        <option value="fille">Fille</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>

                <button type="submit">Ajouter</button>
            </form>

            <h2>Supprimer un enfant</h2>
            <form onSubmit={handleSupress}>
                <div>
                    <label>ID :</label>
                    <input type="number" name="id" value={deleteId} onChange={handleSupressChange} required />
                </div>

                <button type="submit">Supprimer</button>
            </form>
        </div>
    );
};

export default ChildForm;
