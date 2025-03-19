import React, { useState, useEffect } from "react";
import { format, startOfWeek, addWeeks, subWeeks, isToday, setHours, addDays, parseISO, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";
import getByWeek from "../../back/calendar/getbyweek";
import "./calendar.css";

const Calendar = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const currentWeekEnd = addDays(currentWeekStart, 6);
  const [horaires, setHoraires] = useState([]);

  useEffect(() => {
    const fetchHoraires = async () => {
      const data = await getByWeek(currentWeekStart, currentWeekEnd);
      setHoraires(data || []);
    };
    fetchHoraires();
  }, [currentWeekStart]);

  const handleToday = () => {
    const todayStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    setCurrentWeekStart(todayStart);
  };

  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  return (
    <div className="calendar">
      <h2>Calendrier</h2>

      <div className="controls">
        <button onClick={handlePrevWeek}>◀ Semaine précédente</button>
        <button onClick={handleToday}>Aujourd'hui</button>
        <button onClick={handleNextWeek}>Semaine suivante ▶</button>
      </div>

      <div className="calendar-container">
        <div className="header">
          <div className="column-header empty"></div>
          {[...Array(7)].map((_, i) => {
            const day = addDays(currentWeekStart, i);
            return (
              <div key={i} className={`column-header ${isToday(day) ? "today" : ""}`}>
                {format(day, "EEE dd MMM", { locale: fr })}
              </div>
            );
          })}
        </div>

        <div className="scrollable-grid">
          {[...Array(24)].map((_, hour) => (
            <div key={hour} className="row">
              <div className="row-header">{`${hour}:00`}</div>
              {[...Array(7)].map((_, i) => {
                const day = addDays(currentWeekStart, i);
                const cellDateTime = setHours(new Date(day), hour);

                const fullDateTime = new Date(day);
                const nextHour = new Date(fullDateTime);

                fullDateTime.setHours(hour, 0, 0, 0); // Début de l'heure (ex: 6:00)
                nextHour.setHours(hour + 1, 0, 0, 0); // Fin de l'heure (ex: 7:00)

                // Vérifie si la case est sélectionée
                const isSelected = selectedDateTime && selectedDateTime.getTime() === cellDateTime.getTime();

                // Vérifie si au moins UNE minute de l'heure est occupée
                const isOccupied = horaires.some((horaire) => {
                  const heureDebut = new Date(`${horaire.date}T${horaire.heure_debut}`);
                  const heureFin = new Date(`${horaire.date}T${horaire.heure_fin}`);

                  return heureDebut < nextHour && heureFin > fullDateTime;
                });

                return (
                  <div
                    key={`${i}-${hour}`}
                    className={`cell ${isOccupied ? "occupied" : ""} ${isSelected ? "selected" : ""}`}
                    onClick={() => setSelectedDateTime(cellDateTime)}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {selectedDateTime && (
        <p>Heure sélectionnée : {format(selectedDateTime, "EEEE dd MMMM yyyy - HH:mm", { locale: fr })}</p>
      )}
    </div>
  );
};

export default Calendar;
