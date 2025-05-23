import React from "react";
import insertHoraire from "../../back/horaires/insert.js";
import "./templateSelectionMask.css";

const TemplateSelectionMask = ({ currentWeekStart, setCurrentWeekStart, setApplyTemplate, currentTemplate }) => {
  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i +1);
      days.push(day);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeekStart);

  return (
    <div className="mask-container" onClick={() => setApplyTemplate(false)}>
      <span className="instruction">Séléctionez un jour sur lequel appliquer le template</span>
      <div className="mask-day-container">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="mask-day"
            onClick={(e) => {
              e.stopPropagation();
              const formattedDate = day.toISOString().split("T")[0];  // YYYY-MM-DD
              console.log(formattedDate);
              

              insertHoraire({
                id_enfant: currentTemplate.id_enfant,
                date: formattedDate,  // Utilisation de la date correctement formatée
                heure_debut: currentTemplate.heure_debut,
                heure_fin: currentTemplate.heure_fin
              });

              setApplyTemplate(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelectionMask;
