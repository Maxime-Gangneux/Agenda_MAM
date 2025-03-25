import React, { useEffect, useState } from "react";
import getChild from "../../../back/child/get";
import { ReactComponent as ArrowUp } from "../../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../../assets/keyboard_arrow_down.svg";
import "./toolBar.scss";

function ToolBar({ changepages, checkboxState, setCheckboxState }) {
  const [children, setChildren] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchChildren = async () => {
    try {
      const data = await getChild();
      setChildren(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des enfants:", error);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    if (children.length > 0) {
      const savedState = JSON.parse(localStorage.getItem("checkboxState")) || {};
      
      const defaultCheckedState = {};
      children.forEach((child) => {
        defaultCheckedState[child.id] = savedState[child.id] ?? true;
      });

      setCheckboxState(defaultCheckedState);
    }
  }, [children]);

  useEffect(() => {
    if (checkboxState) {
      localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
      window.dispatchEvent(new Event("storage"));
    }
  }, [checkboxState]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxChange = (childId) => {
    setCheckboxState((prevState) => {
      const newState = { ...prevState, [childId]: !prevState[childId] };
      return newState;
    });
  };

  return (
    <div className="toolbar">
      <button onClick={changepages("calendar")}>Calendar</button>
      <button onClick={changepages("admin")}>Admin</button>

      <div className="dropdown-container">
        <div className="dropdown-selected" onClick={handleDropdownToggle}>
          <div style={{fontSize: 'clamp(5px, 0.9vw ,18px)', whiteSpace: 'nowrap'}}>Couleur des enfants</div>
          <div>{isDropdownOpen ? <ArrowUp /> : <ArrowDown />}</div>
        </div>
        {isDropdownOpen && (
          <div className="list-enfant">
            {children.map((child) => (
              <div className="child-info-container" key={child.id}>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  style={{ display: "none" }}
                  id={`checkbox-${child.id}`}
                  checked={checkboxState[child.id] || false}
                  onChange={() => handleCheckboxChange(child.id)}
                />
                <label
                  htmlFor={`checkbox-${child.id}`}
                  className="custom-checkbox-label"
                  style={{ "--childcolor": child.color }}
                >
                  {child.prenom}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ToolBar;
