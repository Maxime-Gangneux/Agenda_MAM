import React, { useState, useEffect, useRef } from "react";
import { format, startOfWeek, addWeeks, subWeeks, isToday, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import getByWeek from "../../../back/calendar/getbyweek.js";
import getChild from "../../../back/child/get.js"; 
import AbonnementHoraires from "../../../back/utils/abonnements/abonement_horaires.js";
import Topbar from "./topbar/topbar.js";
import CalendarBody from "./calendarBody.js";
import "./calendar.css";

const Calendar = ({ checkboxState, setCheckboxState, checkToken, currentWeekStart, setCurrentWeekStart, user, children, setChildren, changetoolbarrisopen}) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const currentWeekEnd = addDays(currentWeekStart, 7);
  const [horaires, setHoraires] = useState([]);
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
      <Topbar changetoolbarrisopen = {changetoolbarrisopen} handleToday={handleToday} handleNextWeek={handleNextWeek} handlePrevWeek={handlePrevWeek} checkToken={checkToken} />
      <CalendarBody
        user = {user}
        checkboxState={checkboxState}
        setCheckboxState={setCheckboxState}
        currentWeekStart={currentWeekStart}
        currentWeekEnd={currentWeekEnd}
        children={children}
        handleCheckboxChange={setCheckboxState}
      />
    </div>
  );
};

export default Calendar;
