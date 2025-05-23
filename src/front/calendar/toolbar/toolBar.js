import React, { useState, useEffect } from "react";
import ChildDropDown from "./toolBarComponents/childDropDown/childDropDown";
import HoraireForm from "../../horaires/horairesForm.js";
import CalendarMonth from "../calendarComponent/calendarMonth.js";
import TemplateMain from "../../template/templateMain.js";
import "./toolBar.scss";

function ToolBar({
  checkboxState,
  setCheckboxState,
  user,
  currentWeekStart,
  setCurrentWeekStart,
  onDayClick,
  children,
  setChildren,
  toolbaropen,
  changetoolbarrisopen
}) {
  const [applyTemplate, setApplyTemplate] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const shouldHideOthers = toolbaropen && applyTemplate;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const toolbar = document.getElementById("toolbar");
    if (toolbar) {
      if (shouldHideOthers && isMobile) {
        toolbar.style.backgroundColor = "transparent";
      } else {
        toolbar.style.backgroundColor = "";
      }
    }
  }, [shouldHideOthers, isMobile]);

  if (!toolbaropen) return null;

  return (
    <div className="toolbar" id="toolbar">
      {user.role === "parent" ? (
        <>
          {!shouldHideOthers && (
            <>
              <div className="toolbar-button-container">
              {!shouldHideOthers && isMobile && (
                <button className="toolbar-button" onClick={() => { window.location.hash = "calendar"; changetoolbarrisopen(); }}>Calendar</button>
              )}
                <button className="toolbar-button" onClick={() => { window.location.hash = "ChildMain"; }}>Enfants</button>
              </div>
              <ChildDropDown id="childdropdown" checkboxState={checkboxState} setCheckboxState={setCheckboxState} user={user} />
              <HoraireForm user={user} />
            </>
          )}
          <TemplateMain applyTemplate={applyTemplate} setApplyTemplate={setApplyTemplate} currentWeekStart={currentWeekStart} setCurrentWeekStart={setCurrentWeekStart} children={children} setChildren={setChildren} user={user} />
          {!isMobile && !shouldHideOthers && (
            <CalendarMonth onDayClick={onDayClick} currentWeekStart={currentWeekStart} setCurrentWeekStart={setCurrentWeekStart} />
          )}
        </>
      ) : (
        <>
          {!shouldHideOthers && (
            <>
              <div className="toolbar-button-container">
              {!shouldHideOthers && isMobile && (
                <button className="toolbar-button" onClick={() => { window.location.hash = "calendar"; changetoolbarrisopen(); }}>Calendar</button>
              )}
                <button className="toolbar-button" onClick={() => { window.location.hash = "ChildMain"; }}>enfants</button>
                <button className="toolbar-button" onClick={() => { window.location.hash = "ParentMain"; }}>parents</button>
              </div>
              <ChildDropDown checkboxState={checkboxState} setCheckboxState={setCheckboxState} user={user} />
              <HoraireForm user={user} />
            </>
          )}
          {!isMobile && !shouldHideOthers && (
            <CalendarMonth onDayClick={onDayClick} currentWeekStart={currentWeekStart} setCurrentWeekStart={setCurrentWeekStart} />
          )}
        </>
      )}
    </div>
  );
}

export default ToolBar;
