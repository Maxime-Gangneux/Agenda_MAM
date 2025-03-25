import React,{useState} from "react";
import Calendar from "./calendarComponent/calendar";
import ToolBar from "./toolbar/toolBar";
import "./calendarMain.css"

function CalendarMain({changepages}){
    const [checkboxState, setCheckboxState] = useState({});

    return(
        <div className="main-calendar-container">
            <ToolBar changepages = {changepages} checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} />
            <Calendar checkboxState = {checkboxState} setCheckboxState = {setCheckboxState} />
        </div>
    )
}

export default CalendarMain;