import React, { useState, useEffect, useRef } from "react";
import { format, startOfWeek, addWeeks, subWeeks, isToday, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import getByWeek from "../../../back/calendar/getbyweek.js";
import getChild from "../../../back/child/get.js"; 
import AbonnementHoraires from "../../../back/utils/abonnements/abonement_horaires.js";
import AbonnementEnfants from "../../../back/utils/abonnements/abonement_enfant.js";
import "./calendar.css";

const Calendar = (checkboxState, setCheckboxState) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const currentWeekEnd = addDays(currentWeekStart, 6);
  const [horaires, setHoraires] = useState([]);
  const [children, setChildren] = useState([]);
  const [agendaHeight, setAgendaHeight] = useState(0);
  const agendaRef = useRef(null);
  const [excludedChildren, setExcludedChildren] = useState([]);

  useEffect(() => {
    const updateHeight = () => {
      if (agendaRef.current) {
        setAgendaHeight(agendaRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const fetchHoraires = async () => {
    const data = await getByWeek(currentWeekStart, currentWeekEnd);
    setHoraires(data || []);
  };

  useEffect(() => {
    fetchHoraires();
  }, [currentWeekStart]);

  const fetchChildren = async () => {
    const data = await getChild();
    setChildren(data || []);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleToday = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const handlePrevWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  return (
    <div className="calendar">

      <div className="topbar">
        <div className="controls">
          <button className="aujourdhui" onClick={handleToday}>Aujourd'hui</button>
          <div className="arrows">
            <button className="◀" onClick={handlePrevWeek}>◀</button>
            <button className="▶" onClick={handleNextWeek}>▶</button>
          </div>
        </div>
      </div>

      <div className="calendar-background">
        <div className="calendar-container">
          <div className="header">
            <div className="column-header empty"></div>
            {[...Array(7)].map((_, i) => {
              const day = addDays(currentWeekStart, i);
              return (
                <div key={i} className={`column-header ${isToday(day) ? "today" : ""}`}>
                  <div className="day">{format(day, "EEE", { locale: fr })}</div>
                  <div className={`date ${isToday(day) ? "today-date" : ""}`}>{format(day, "dd", { locale: fr })}</div>
                  <div className="month">{format(day, "MMM", { locale: fr })}</div>
                </div>
              );
            })}
          </div>

          <div className="scrolable-grid">
            <div className="hour-container">
              {[...Array(23)].map((_, hour) => (
                <div key={hour} className="row-hour">
                  <div className="row-hour-text">{`${hour + 1}:00`}</div>
                </div>
              ))}
            </div>

            <div className="agenda-body" ref={agendaRef}>
              {[...Array(24)].map((_, hour) => (
                <div key={hour} className="hour-agenda">
                  {[...Array(7)].map((_, i) => {
                    const day = addDays(currentWeekStart, i);
                    const fullDateTime = new Date(day);
                    fullDateTime.setHours(hour + 1, 0, 0, 0);

                    return (
                      <div
                        key={`${i}-${hour}`}
                        className={`agenda-day ${isToday(day) ? "today" : ""}`}
                      >
                      </div>
                    );
                  })}
                </div>
              ))}
              {[...Array(7)].map((_, i) => {
                const day = addDays(currentWeekStart, i+1);
                const hourHeight = agendaHeight / 24;

                return (
                  <div
                    key={`day-${i}`}
                    className={`agenda-day-colomn ${isToday(day) ? "today" : ""}`}
                    style={{ left: `calc(${(100 / 7) * i}%)` }}
                  >
                    {children
                      .filter(child => !excludedChildren.includes(child.id)) // Exclure les enfants
                      .map((child) => {
                        return horaires
                          .filter((horaire) => horaire.id_enfant === child.id && horaire.date === day.toISOString().split("T")[0])
                          .map((horaire, index) => {
                            const heureDebut = parseInt(horaire.heure_debut.split(":")[0], 10);
                            const minuteDebut = parseInt(horaire.heure_debut.split(":")[1], 10);
                            const heureFin = parseInt(horaire.heure_fin.split(":")[0], 10);
                            const minuteFin = parseInt(horaire.heure_fin.split(":")[1], 10);

                            const debutDecimal = heureDebut + (minuteDebut / 60);
                            const finDecimal = heureFin + (minuteFin / 60);
                            const topPosition = debutDecimal * hourHeight;
                            const height = (finDecimal - debutDecimal) * hourHeight;

                            return (
                              <div
                                key={`${child.id}-${index}`}
                                className="horaire"
                                style={{
                                  top: `${topPosition}px`,
                                  height: `${height}px`,
                                  width: `calc(${90/children.length}%)`,
                                  backgroundColor: child.color || "lightblue",
                                }}
                              >
                              </div>
                            );
                          });
                      })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedDateTime && (
          <p>Heure sélectionnée : {format(selectedDateTime, "EEEE dd MMMM yyyy - HH:mm", { locale: fr })}</p>
        )}
      </div>
      <AbonnementHoraires onUpdate={fetchHoraires} />
      <AbonnementEnfants onUpdate={fetchChildren} />
    </div>
  );
};

export default Calendar;
