import React, { useState, useEffect, useRef } from "react";
import { format, addDays, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import getByWeek from "../../../back/calendar/getbyweek.js";
import AbonnementHoraires from "../../../back/utils/abonnements/abonement_horaires.js";
import ModalHoraireForm from "../../horaires/modalHorairesForm.js";
import deleteHoraire from "../../../back/horaires/delete.js";
import "./calendar.css";

const CalendarBody = ({
  checkboxState,
  currentWeekStart,
  currentWeekEnd,
  children,
  fetchChildren,
  handleCheckboxChange,
  user
}) => {
  const agendaRef = useRef(null);
  const [horaires, setHoraires] = useState([]);
  const [agendaHeight, setAgendaHeight] = useState(0);
  const formRef = useRef();
  const [isModalHorraireIsOpen, setisModalHorraireIsOpen] = useState(false);
  const modalMethods = useRef({});
  const [selectedHoraire, setSelectedHoraire] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const currentStartRef = useRef(currentWeekStart);
  const currentEndRef = useRef(currentWeekEnd);

  const fetchHoraires = async (start, end) => {
    const data = await getByWeek(start, end);
    setHoraires(data || []);
  };

  useEffect(() => {
    currentStartRef.current = currentWeekStart;
    currentEndRef.current = currentWeekEnd;
    fetchHoraires(currentWeekStart, currentWeekEnd);
  }, [currentWeekStart, currentWeekEnd]);

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

  const handleDayClick = (date, heure) => {
    setisModalHorraireIsOpen(true);
    setTimeout(() => {
      if (modalMethods.current.prefillFormWithDateAndHour) {
        modalMethods.current.prefillFormWithDateAndHour(date, heure);
      }
    }, 100);
  };

  const handleHoraireClick = (horaire, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipPosition({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX + rect.width + 10
    });
    setSelectedHoraire(horaire);
  };

  const handleDeleteHoraire = async (horaireId) => {
    await deleteHoraire(horaireId);
    fetchHoraires(currentStartRef.current, currentEndRef.current);
    setSelectedHoraire(null);
  };

  return (
    <>
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
              {[...Array(24)].map((_, hour) => {
                const displayHour = (hour + 1) % 24;
                return (
                  <div key={hour} className="row-hour">
                    <div className="row-hour-text">{`${displayHour === 0 ? "00" : displayHour}:00`}</div>
                  </div>
                );
              })}
            </div>

            <div className="agenda-body" ref={agendaRef}>
              {[...Array(24)].map((_, hour) => (
                <div key={hour} className="hour-agenda">
                  {[...Array(7)].map((_, i) => {
                    const day = addDays(currentWeekStart, i + 1);
                    return (
                      <div key={`${i}-${hour}`} className={`agenda-day ${isToday(day) ? "today" : ""}`} onClick={() => handleDayClick(day, hour)}></div>
                    );
                  })}
                </div>
              ))}

              {[...Array(7)].map((_, i) => {
                const day = addDays(currentWeekStart, i);
                const hourHeight = agendaHeight / 24;

                return (
                  <div
                    key={`day-${i}`}
                    className={`agenda-day-colomn ${isToday(day) ? "today" : ""}`}
                    style={{ left: `calc(${(100 / 7) * i}%)` }}
                  >
                    {children
                      .filter(child => checkboxState?.[child.id])
                      .map((child) =>
                        horaires
                          .filter(horaire => {
                            const horaireDate = new Date(horaire.date);
                            const dayStart = new Date(day.setHours(0, 0, 0, 0));
                            return horaire.id_enfant === child.id && horaireDate.toDateString() === dayStart.toDateString();
                          })
                          .map((horaire, index) => {
                            const [heureDebut, minuteDebut] = horaire.heure_debut.split(":").map(Number);
                            const [heureFin, minuteFin] = horaire.heure_fin.split(":").map(Number);
                            const debutDecimal = heureDebut + minuteDebut / 60;
                            const finDecimal = heureFin + minuteFin / 60;
                            const topPosition = debutDecimal * hourHeight;
                            const height = (finDecimal - debutDecimal) * hourHeight;

                            return (
                              <div
                                key={`${child.id}-${index}`}
                                className="horaire"
                                style={{
                                  top: `${topPosition}px`,
                                  height: `${height}px`,
                                  width: `calc(${90 / children.length}%)`,
                                  backgroundColor: child.color || "lightblue",
                                }}
                                onClick={(e) => handleHoraireClick(horaire, e)}
                              />
                            );
                          })
                      )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedHoraire && (
        <div
          className="tooltip"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left+85}px`,
            position: "absolute",
            zIndex: 1000
          }}
        >
          <div className="tooltip-content">
            <button onClick={() => setSelectedHoraire(null)} className="close-btn">
              ×
            </button>
            <p><strong>Date :</strong> {format(new Date(selectedHoraire.date), "PPP", { locale: fr })}</p>
            <p>Horaire: {selectedHoraire.heure_debut.slice(0, 5)} - {selectedHoraire.heure_fin.slice(0, 5)}</p>
            <p><strong>Enfant :</strong> {children.find(child => child.id === selectedHoraire.id_enfant)?.prenom}</p>
            <button onClick={() => handleDeleteHoraire(selectedHoraire.id)} className="delete-btn">
              Supprimer
            </button>
          </div>
        </div>
      )}

      {isModalHorraireIsOpen && (
        <ModalHoraireForm
          user={user}
          setisModalHorraireIsOpen={setisModalHorraireIsOpen}
          expose={(methods) => (modalMethods.current = methods)}
        />
      )}

      <AbonnementHoraires onUpdate={() => fetchHoraires(currentStartRef.current, currentEndRef.current)} />
    </>
  );
};

export default CalendarBody;
