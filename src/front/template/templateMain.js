import React, { useState, useEffect } from "react";
import getTemplates from "../../back/template/getAll.js";
import { ReactComponent as ArrowUp } from "../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/keyboard_arrow_down.svg";
import AddTemplateButton from "./addTemplateButton.js";
import deleteTemplate from  "../../back/template/delete.js"
import TemplateSelectionMask from "./templateSelectionMask.js";
import AbonnementTemplate from "../../back/utils/abonnements/abonement_template.js";
import delete_button from '../../assets/delete.svg';
import "./templateMain.css";

const TemplateMain = ({ user, children, setChildren, currentWeekStart, setCurrentWeekStart, applyTemplate, setApplyTemplate}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const fetchTemplates = async () => {
        const data = await getTemplates(user.id);
        setTemplates(data);
      };

  useEffect(() => {
    if (isDropdownOpen) {
      const fetchTemplates = async () => {
        const data = await getTemplates(user.id);
        setTemplates(data);
      };
      fetchTemplates();
    }
  }, [isDropdownOpen, user.id]);

  const formatHeure = (heure) => {
    if (!heure) return "";
    return heure.slice(0, 5);
  };

  const getPrenomFromId = (id) => {
    const enfant = children.find((child) => child.id === id);
    return enfant ? enfant.prenom : "Inconnu";
  };

  const selectTemplate = (template) => {
    setCurrentTemplate(template);
    setApplyTemplate(true);
  }

  return (
    <div className="template-list-container">
      {!applyTemplate &&
      <div className="dropdown-selected" onClick={toggleDropdown} style={{ left: "3%", position: "relative" }}>
        <div className="drop-down-title" style={{whiteSpace: "nowrap" }}>
          Templates
        </div>
        <div>{(isDropdownOpen) ? <ArrowUp /> : <ArrowDown />}</div>
      </div>}

      {(isDropdownOpen && !applyTemplate) && (
        <div className="template-list">
          <AddTemplateButton user={user} />
          {templates.length > 0 ? (
            templates.map((template, index) => (
              <div key={index} className="template-item" onClick={() => selectTemplate(template)}>
                <strong>{template.titre || "Sans titre"} : {getPrenomFromId(template.id_enfant)}</strong>
                {formatHeure(template.heure_debut)} - {formatHeure(template.heure_fin)}
                <button className="table-action-delete-btn" onClick={(e) => { e.stopPropagation(); deleteTemplate(template.id); }}>
                  <img src={delete_button} alt="Supprimer" />
                </button>
              </div>
            ))
          ) : (
            <p style={{ marginLeft: "3%" }}>Aucun template trouvé.</p>
          )}
        </div>
      )}
    {applyTemplate ? <TemplateSelectionMask currentTemplate = {currentTemplate} setApplyTemplate = {setApplyTemplate} currentWeekStart = {currentWeekStart} setCurrentWeekStart = {setCurrentWeekStart} /> : <></>}
    <AbonnementTemplate onUpdate={fetchTemplates}/>
    </div>
  );
};

export default TemplateMain;
