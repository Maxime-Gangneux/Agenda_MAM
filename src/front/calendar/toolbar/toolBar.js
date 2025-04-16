import ChildDropDown from "./toolBarComponents/childDropDown/childDropDown";
import HoraireForm from "../../horaires/horairesForm.js";
import "./toolBar.scss";

function ToolBar({ checkboxState, setCheckboxState, user }) {
  return (
    <div className="toolbar">
      {user.role === "parent" ? (
        <>
          <button onClick={() => { window.location.hash = "calendar"; }}>Calendar</button>
          <button onClick={() => { window.location.hash = "ChildMain"; }}>Enfants</button>
          <ChildDropDown checkboxState={checkboxState} setCheckboxState={setCheckboxState} user = {user} />
          <HoraireForm user = {user}/>
        </>
      ) : (
        <>
          <button onClick={() => { window.location.hash = "calendar"; }}>Calendar</button>
          <button onClick={() => { window.location.hash = "admin"; }}>Admin</button>
          <button onClick={() => { window.location.hash = "ChildMain"; }}>enfants</button>
          <button onClick={() => { window.location.hash = "ParentMain"; }}>parents</button>
          <ChildDropDown checkboxState={checkboxState} setCheckboxState={setCheckboxState} user = {user} />
          <HoraireForm user = {user}/>
        </>
      )}
    </div>
  );
}

export default ToolBar;
