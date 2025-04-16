import React,{useState} from "react";
import Calendar from "./calendarComponent/calendar";
import ToolBar from "./toolbar/toolBar";
import "./calendarMain.css"

function CalendarMain({changePages, checkToken, user}){
    const [checkboxState, setCheckboxState] = useState(() => {
        const savedState = JSON.parse(localStorage.getItem("checkboxstate"));
        return savedState || {};
      });
      

    return(
        <div className="main-calendar-container">
            <ToolBar changePages={changePages} checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} user = {user} />
            <Calendar checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} checkToken={checkToken} user = {user}/>
        </div>
    )
}

export default CalendarMain;