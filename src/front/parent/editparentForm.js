import React, { useState, useEffect } from "react";
import getParentById from "../../back/parent/getById.js";
import updateParent from "../../back/parent/update.js";
import "./editparentForm.css";

const EditParentForm = ({ ParentId, setmodalupdateParentisopen }) => {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        password: ""
    });

    useEffect(() => {
        
        const fetchParentData = async () => {
            const parentDataArray = await getParentById(ParentId);
            if (parentDataArray && parentDataArray.length > 0) {
                const parentData = parentDataArray[0];
                setFormData({
                    last_name: parentData.last_name || "",
                    first_name: parentData.first_name || "",
                    email: parentData.email || "",
                    telephone: parentData.telephone || "",
                });
            }
        };

        if (ParentId) {
            fetchParentData();
        }
    }, [ParentId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateParent(ParentId, formData);
        setmodalupdateParentisopen(false);
    };

    return (
        <div className="edit-parent-form-container">
            <button
            className="close-button"
            onClick={() => setmodalupdateParentisopen(false)}
            >
            ×
            </button>
            <h2 className="edit-form-title">Modifier un parent</h2>
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="edit-form-group">
                    <label className="edit-form-label">Nom :</label>
                    <input className="edit-form-input" type="text" name="last_name" value={formData.last_name || ''} onChange={handleChange} required />
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">Prénom :</label>
                    <input className="edit-form-input" type="text" name="first_name" value={formData.first_name || ''} onChange={handleChange} required />
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">Email :</label>
                    <input className="edit-form-input" type="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                </div>

                <div className="edit-form-group">
                    <label className="edit-form-label">Téléphone :</label>
                    <input className="edit-form-input" type="tel" name="telephone" value={formData.telephone || ''} onChange={handleChange} required />
                </div>

                <button className="edit-form-button" type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default EditParentForm;
