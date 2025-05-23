import React, { useState, useEffect } from "react";
import arrow_left from "../../../assets/keyboard_arrow_left.svg"
import arrow_right from "../../../assets/keyboard_arrow_right.svg"
import "./calendarMonth.css";

const CalendarMonth = ({ onDayClick, currentWeekStart }) => {
  const [days, setDays] = useState([]);
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date());
  const today = new Date();

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const diff = (day + 6) % 7; // transforme dimanche en 6, lundi en 0, etc.
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - diff);
    return newDate;
  };

  const generateFiveWeeks = (date) => {
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startDate = getStartOfWeek(firstOfMonth);

    const daysArray = [];
    for (let i = 0; i < 42; i++) {
      const newDay = new Date(startDate);
      newDay.setDate(startDate.getDate() + i);
      daysArray.push(newDay);
    }

    return daysArray;
  };

  useEffect(() => {
    setDays(generateFiveWeeks(currentMonthDate));
  }, [currentMonthDate]);

  useEffect(() => {
    if (!currentWeekStart) return;

    let allDaysInSameMonth = true;
    const refMonth = currentMonthDate.getMonth();
    const refYear = currentMonthDate.getFullYear();

    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(day.getDate() + i);
      if (day.getMonth() !== refMonth || day.getFullYear() !== refYear) {
        allDaysInSameMonth = false;
        break;
      }
    }

    if (!allDaysInSameMonth) {
      const newMonth = new Date(currentWeekStart);
      setCurrentMonthDate(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1));
    }
  }, [currentWeekStart]);

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonthDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonthDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonthDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentMonthDate(newDate);
  };

  const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="calendarMonthContainer">
      <div className="calendarMonthToolBar">
        <button onClick={handlePreviousMonth}><img src={arrow_left}></img></button>
        <span>{monthNames[currentMonthDate.getMonth()]} {currentMonthDate.getFullYear()}</span>
        <button onClick={handleNextMonth}><img src={arrow_right}></img></button>
      </div>

      <div className="calendarMonth">
        <div className="calendar-header">
          {["L", "M", "M", "J", "V", "S", "D"].map((day, idx) => (
            <div key={idx} className="calendar-day">{day}</div>
          ))}
        </div>
        <div className="calendar-grid">
          {days.map((day, index) => {
            const dayWithoutTime = new Date(day.getFullYear(), day.getMonth(), day.getDate());
            const isToday = dayWithoutTime.getTime() === todayWithoutTime.getTime();
            const isInCurrentWeek = currentWeekStart && (
              dayWithoutTime >= new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate()) &&
              dayWithoutTime <= new Date(currentWeekStart.getFullYear(), currentWeekStart.getMonth(), currentWeekStart.getDate() + 6)
            );

            return (
              <div
                key={index}
                className={`calendar-cell ${isToday ? "today1" : ""} ${isInCurrentWeek ? "inCurrentWeek" : ""}`}
                onClick={() => onDayClick(day)}
              >
                <span>{day.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarMonth;
