import React, { useState, useEffect } from "react";
import insertHoraire from "../../back/horaires/insert.js";
import deleteHoraire from "../../back/horaires/delete.js";
import getChildren from "../../back/parent/getChildren.js";
import getChild from "../../back/child/get.js";

const HoraireForm = ({ user }) => {
  const [children, setChildren] = useState([]);

  const fetchChildren =
    user.role === "parent"
      ? async () => {
          const data = await getChildren(user.id);
          setChildren(data);
        }
      : async () => {
          const data = await getChild();
          setChildren(data);
        };

  useEffect(() => {
    fetchChildren();
  }, []);

  const [formData, setFormData] = useState({
    id_enfant: "",
    date: "",
    heure_debut: "",
    heure_fin: "",
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
      heure_fin: "",
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
          <label>Enfant :</label>
          <select name="id_enfant" value={formData.id_enfant} onChange={handleChange} required>
            <option value="">-- Sélectionner un enfant --</option>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.prenom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date :</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div>
          <label>Heure de début :</label>
          <input type="time" name="heure_debut" value={formData.heure_debut} onChange={handleChange} required />
        </div>

        <div>
          <label>Heure de fin :</label>
          <input type="time" name="heure_fin" value={formData.heure_fin} onChange={handleChange} required />
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default HoraireForm;
