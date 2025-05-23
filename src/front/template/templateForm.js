import React, { useState, useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../assets/close_black.svg";
import getChildren from "../../back/parent/getChildren.js";
import insertTemplate from "../../back/template/add.js";
import "./templateForm.css";

const ModalTemplateForm = ({ user, setIsModalOpen }) => {
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    id_enfant: "",
    titre: "",
    heure_debut: "",
    heure_fin: "",
  });
  const [error, setError] = useState(null);

  const fetchChildren = async () => {
    if (user.role === "parent") {
      const data = await getChildren(user.id);
      setChildren(data);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate = new Date(`1970-01-01T${formData.heure_debut}:00`);
    const endDate = new Date(`1970-01-01T${formData.heure_fin}:00`);

    if (endDate <= startDate) {
      setError("L'heure de fin doit être après l'heure de début.");
      return;
    }

    try {
      await insertTemplate({
        id_user: user.id,
        id_enfant: formData.id_enfant,
        titre: formData.titre,
        heure_debut: formData.heure_debut,
        heure_fin: formData.heure_fin,
      });
      setIsModalOpen(false);
    } catch (err) {
      setError("Une erreur est survenue lors de la soumission du template.");
    }
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal-content">
        <div className="form-close-button" onClick={() => setIsModalOpen(false)}>
          <CloseIcon />
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div>
            <label>ID Enfant :</label>
            <select
              name="id_enfant"
              value={formData.id_enfant}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner un enfant --</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.prenom}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Titre :</label>
            <select
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner une période --</option>
              <option value="Matin">Matin</option>
              <option value="Après-midi">Après-midi</option>
              <option value="Journée">Journée</option>
            </select>
          </div>

          <div>
            <label>Heure de début :</label>
            <input
              type="time"
              name="heure_debut"
              value={formData.heure_debut}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Heure de fin :</label>
            <input
              type="time"
              name="heure_fin"
              value={formData.heure_fin}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Ajouter Template</button>
        </form>
      </div>
    </div>
  );
};

export default ModalTemplateForm;
