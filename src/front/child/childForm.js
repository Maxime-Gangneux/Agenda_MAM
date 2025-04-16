import React, { useState } from "react";
import insertChild from "../../back/child/insert.js";
import "./childForm.css";

const ChildForm = ({setmodalcreateChildisopen, user}) => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        date_naissance: "",
        genre: "garçon"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await insertChild(formData, user.id);
        setmodalcreateChildisopen(false)
        setFormData({
            nom: "",
            prenom: "",
            date_naissance: "",
            genre: "garçon"
        });
    };

    return (
        <div className="child-form-container">
            <h2 className="form-title">Ajouter un enfant</h2>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Nom :</label>
                    <input className="form-input" type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Prénom :</label>
                    <input className="form-input" type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Date de naissance :</label>
                    <input className="form-input" type="date" name="date_naissance" value={formData.date_naissance} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label className="form-label">Genre :</label>
                    <select className="form-input" name="genre" value={formData.genre} onChange={handleChange}>
                        <option value="garçon">Garçon</option>
                        <option value="fille">Fille</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>

                <button className="form-button" type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default ChildForm;
