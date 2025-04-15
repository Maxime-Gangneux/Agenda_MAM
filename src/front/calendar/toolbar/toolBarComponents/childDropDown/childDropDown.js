import React, { useEffect, useState } from "react";
import getChild from "../../../../../back/child/get";
import { ReactComponent as ArrowUp } from "../../../../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/keyboard_arrow_down.svg";

function ChildDropDown({checkboxState, setCheckboxState}){

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [children, setChildren] = useState([]);
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
  
    const handleDropdownToggle = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    useEffect(() => {
      const currentcheckboxlocalstorage = JSON.parse(localStorage.getItem("checkboxstate"));
    
      if (!currentcheckboxlocalstorage || Object.keys(currentcheckboxlocalstorage).length === 0) {
        const initialCheckboxState = {};
        children.forEach((child) => {
          initialCheckboxState[child.id] = true;
        });
    
        localStorage.setItem("checkboxstate", JSON.stringify(initialCheckboxState));
        setCheckboxState(initialCheckboxState);
      } else {
        const updatedCheckboxState = { ...currentcheckboxlocalstorage };
    
        children.forEach((child) => {
          if (updatedCheckboxState[child.id] === undefined) {
            updatedCheckboxState[child.id] = true;
          }
        });
    
        localStorage.setItem("checkboxstate", JSON.stringify(updatedCheckboxState));
        setCheckboxState(updatedCheckboxState);
      }
    }, [children]);
    
    const handleCheckboxChange = (childId) => {
      setCheckboxState((prevState) => {
        const newState = { ...prevState, [childId]: !prevState[childId] };
        return newState;
      });
    };
  
    useEffect(() => {
      localStorage.setItem("checkboxstate", JSON.stringify(checkboxState));
  
    }, [checkboxState]);

    return(
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
    );
}

export default ChildDropDown