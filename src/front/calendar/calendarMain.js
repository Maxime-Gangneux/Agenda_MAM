import React,{useState, useEffect} from "react";
import { format, startOfWeek, addWeeks, subWeeks, isToday, addDays } from "date-fns";
import getChild from "../../back/child/get";
import AbonnementEnfants from "../../back/utils/abonnements/abonement_enfant.js";
import Calendar from "./calendarComponent/calendar";
import ToolBar from "./toolbar/toolBar";
import "./calendarMain.css"

function CalendarMain({changePages, checkToken, user}){
    const [children, setChildren] = useState([]);
    const [checkboxState, setCheckboxState] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("checkboxstate"));
        return savedState || {};
      });
    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const [toolbaropen, settoolbaropen] = useState(window.innerWidth > 768);

    useEffect(() => {
      const handleResize = () => {
        settoolbaropen(window.innerWidth > 768);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const changetoolbarrisopen = () => {
      settoolbaropen(!toolbaropen);
    }
    
    const onDayClick = (date) =>{
        setCurrentWeekStart(startOfWeek(date, {weekStartsOn: 1}))
    }

    const fetchChildren = async () => {
        const data = await getChild();
        setChildren(data || []);
      };
    
      useEffect(() => {
        fetchChildren();
      }, []);

    return(
        <div className="main-calendar-container">
            <ToolBar changetoolbarrisopen = {changetoolbarrisopen} toolbaropen = {toolbaropen} children = {children} setChildren = {setChildren} onDayClick = {onDayClick} currentWeekStart = {currentWeekStart} setCurrentWeekStart = {setCurrentWeekStart} changePages={changePages} checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} user = {user} />
            <Calendar changetoolbarrisopen = {changetoolbarrisopen} children = {children} setChildren = {setChildren} user = {user} currentWeekStart = {currentWeekStart} setCurrentWeekStart = {setCurrentWeekStart} checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} checkToken={checkToken}/>
            <AbonnementEnfants onUpdate={fetchChildren} />
        </div>
    )
}

export default CalendarMain;