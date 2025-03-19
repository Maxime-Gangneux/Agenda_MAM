import React, { useState } from "react";
import insertHoraire from "../../back/horaires/insert.js";
import deleteHoraire from "../../back/horaires/delete.js";

const HoraireForm = () => {

    const [formData, setFormData] = useState({
        id_enfant: "",
        date: "",
        heure_debut: "",
        heure_fin: ""
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
        
        await insertHoraire(formData);
        setFormData({
            id_enfant: "",
            date: "",
            heure_debut: "",
            heure_fin: ""
        });
    };

    const handlesupress = async (e) => {
        e.preventDefault();
        
        await deleteHoraire(deleteId);
        setDeleteId("");
    };

    return (
        <div>
            <h2>Ajouter une horaire</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>id enfant :</label>
                    <input type="number" name="id_enfant" value={formData.id_enfant} onChange={handleChange} required />
                </div>

                <div>
                    <label>date :</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div>
                    <label>heure de debut :</label>
                    <input type="time" name="heure_debut" value={formData.heure_debut} onChange={handleChange} required />
                </div>

                <div>
                    <label>heure de fin :</label>
                    <input type="time" name="heure_fin" value={formData.heure_fin} onChange={handleChange} required />
                </div>

                <button type="submit">Ajouter</button>
            </form>

            <h2>Supprimer une horaire</h2>

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

export default HoraireForm;
