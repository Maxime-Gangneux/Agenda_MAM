import ChildDropDown from "./toolBarComponents/childDropDown/childDropDown";
import "./toolBar.scss";

function ToolBar({ checkboxState, setCheckboxState, userRole }) {
  return (
    <div className="toolbar">
      {userRole === "parent" ? (
        <>
          <button onClick={() => { window.location.hash = "calendar"; }}>Calendar</button>
        </>
      ) : (
        <>
          <button onClick={() => { window.location.hash = "calendar"; }}>Calendar</button>
          <button onClick={() => { window.location.hash = "admin"; }}>Admin</button>
          <button onClick={() => { window.location.hash = "ChildMain"; }}>enfants</button>
          <button onClick={() => { window.location.hash = "ParentMain"; }}>parents</button>
          <ChildDropDown checkboxState={checkboxState} setCheckboxState={setCheckboxState} />
        </>
      )}
    </div>
  );
}

export default ToolBar;
