import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import insertHoraire from "../../back/horaires/insert.js";
import getChildren from "../../back/parent/getChildren.js";
import getChild from "../../back/child/get.js";
import { ReactComponent as ArrowUp } from "../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/keyboard_arrow_down.svg";
import { ReactComponent as CloseIcon } from "../../assets/close_black.svg";
import "./modalHorairesForm.css";

const ModalHoraireForm = ({ user, setisModalHorraireIsOpen, expose }) => {
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

  const timeInputs = document.querySelectorAll('.time-input');

  timeInputs.forEach(timeInput => {
    timeInput.addEventListener('focus', () => {
      if (!timeInput.value) {
        timeInput.value = '07:00'; // Heure par défaut lorsque l'input est vide
      }
    });
  });

  const [formData, setFormData] = useState({
    id_enfant: "",
    date: "",
    heure_debut: "",
    heure_fin: "",
  });

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
    setisModalHorraireIsOpen(false);
  };

  useEffect(() => {
    const prefillFormWithDateAndHour = (dateObj, heureDebut) => {
      const date = dateObj.toISOString().split("T")[0];
      const heureDebutStr = `${heureDebut.toString().padStart(2, "0")}:00`;
  
      setFormData({
        id_enfant: children.length === 1 ? children[0].id : "",
        date,
        heure_debut: heureDebutStr,
        heure_fin: "",
      });
    };
  
    if (typeof expose === "function") {
      expose({ prefillFormWithDateAndHour });
    }
  }, [children]);
  
  return (
    <div className="form-modal-overlay" onClick={() => setisModalHorraireIsOpen(false)}>
      <div className="form-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="form-close-button" onClick={() => setisModalHorraireIsOpen(false)}>
          <CloseIcon />
        </div>
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
              <input type="time" name="heure_debut" className= "time-input" value={formData.heure_debut} onChange={handleChange} required />
            </div>

            <div>
              <label>Heure de fin :</label>
              <input type="time" name="heure_fin" className= "time-input" value={formData.heure_fin} onChange={handleChange} required />
            </div>

            <button type="submit">Ajouter</button>
          </form>
      </div>
    </div>
  );
};

export default ModalHoraireForm;
