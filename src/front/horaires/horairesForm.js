import React, { useState, useEffect } from "react";
import insertHoraire from "../../back/horaires/insert.js";
import getChildren from "../../back/parent/getChildren.js";
import getChild from "../../back/child/get.js";
import { ReactComponent as ArrowUp } from "../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/keyboard_arrow_down.svg";
import "./horairesForm.css";

const HoraireForm = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [children, setChildren] = useState([]);
  const [formData, setFormData] = useState({
    id_enfant: "",
    date: "",
    heure_debut: "",
    heure_fin: "",
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTimeFocus = (e) => {
    if (!e.target.value) {
      e.target.value = "07:00"; // Heure par défaut quand l'input est vide
    }
  };

  return (
    <div className="horairesForm">
      <div className="dropdown-selected" onClick={handleDropdownToggle} style={{ left: "3%", position: "relative" }}>
        <div className="drop-down-title" style={{whiteSpace: "nowrap" }}>
          Ajouter une horaire
        </div>
        <div>{isDropdownOpen ? <ArrowUp /> : <ArrowDown />}</div>
      </div>
      {isDropdownOpen ? (
        <form className="form" onSubmit={handleSubmit}>
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
            <input
              type="time"
              name="heure_debut"
              className="time-input"
              value={formData.heure_debut}
              onChange={handleChange}
              onFocus={handleTimeFocus}
              required
            />
          </div>

          <div>
            <label>Heure de fin :</label>
            <input
              type="time"
              name="heure_fin"
              className="time-input"
              value={formData.heure_fin}
              onChange={handleChange}
              onFocus={handleTimeFocus}
              required
            />
          </div>

          <button type="submit">Ajouter</button>
        </form>
      ) : null}
    </div>
  );
};

export default HoraireForm;
