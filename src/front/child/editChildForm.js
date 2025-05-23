import React, { useState, useEffect } from "react";
import getChildById from "../../back/child/getById.js";
import updateChild from "../../back/child/update.js";
import "./editChildForm.css";

const EditChildForm = ({ childId, setmodalupdateChildisopen }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    genre: "garçon",
  });

  useEffect(() => {
    const fetchChildData = async () => {
      const childDataArray = await getChildById(childId);

      if (childDataArray) {
        setFormData({
          nom: childDataArray.nom || "",
          prenom: childDataArray.prenom || "",
          date_naissance: childDataArray.date_naissance || "",
          genre: childDataArray.genre || "garçon",
        });
      }
    };

    if (childId) {
      fetchChildData();
    }
  }, [childId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChild(childId, formData);
    setmodalupdateChildisopen(false);
  };

  return (
    <div className="edit-child-form-container">
      <button
        className="close-button"
        onClick={() => setmodalupdateChildisopen(false)}
      >
        ×
      </button>
      <h2 className="edit-form-title">Modifier un enfant</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <div className="edit-form-group">
          <label className="edit-form-label">Nom :</label>
          <input
            className="edit-form-input"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label className="edit-form-label">Prénom :</label>
          <input
            className="edit-form-input"
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label className="edit-form-label">Date de naissance :</label>
          <input
            className="edit-form-input"
            type="date"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-form-group">
          <label className="edit-form-label">Genre :</label>
          <select
            className="edit-form-input"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          >
            <option value="garçon">Garçon</option>
            <option value="fille">Fille</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <button className="edit-form-button" type="submit">
          Modifier
        </button>
      </form>
    </div>
  );
};

export default EditChildForm;
