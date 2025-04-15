import React, { useState, useEffect, useRef } from "react";
import { format, startOfWeek, addWeeks, subWeeks, isToday, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import getByWeek from "../../../back/calendar/getbyweek.js";
import getChild from "../../../back/child/get.js"; 
import AbonnementHoraires from "../../../back/utils/abonnements/abonement_horaires.js";
import AbonnementEnfants from "../../../back/utils/abonnements/abonement_enfant.js";
import Topbar from "./topbar/topbar.js";
import CalendarBody from "./calendarBody.js";
import "./calendar.css";

const Calendar = ({ checkboxState, setCheckboxState, checkToken }) => {
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
      <Topbar handleToday={handleToday} handleNextWeek={handleNextWeek} handlePrevWeek={handlePrevWeek} checkToken={checkToken} />
      <CalendarBody
        checkboxState={checkboxState}
        setCheckboxState={setCheckboxState}
        currentWeekStart={currentWeekStart}
        currentWeekEnd={currentWeekEnd}
        children={children}
        fetchChildren={fetchChildren}
        handleCheckboxChange={setCheckboxState}
      />
    </div>
  );
};

export default Calendar;
