import React, { useEffect, useState } from "react";
import getChild from "../../../../../back/child/get";
import getChildren from "../../../../../back/parent/getChildren.js";
import { ReactComponent as ArrowUp } from "../../../../../assets/keyboard_arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../../../../assets/keyboard_arrow_down.svg";

function ChildDropDown({ checkboxState, setCheckboxState, user }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [children, setChildren] = useState([]);

  const fetchChildren =
    user.role === "parent"
      ? async () => {
          const data = await getChildren(user.id);
          setChildren(data);
        }
      : async () => {
          const data = await getChild();
          setChildren(data);
        };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Cette fonction met à jour l'état des checkboxes en fonction des enfants présents et de l'état sauvegardé
  const updateCheckboxes = (currentCheckboxState) => {
    setCheckboxState((prevState) => {
      const updatedState = { ...prevState };

      // Décoche les éléments qui ne sont pas dans `children`
      Object.keys(currentCheckboxState).forEach((checkboxId) => {
        const checkboxIdInt = parseInt(checkboxId);

        // Si l'enfant est dans `children`, on garde son état
        if (children.some((child) => child.id === checkboxIdInt)) {
          updatedState[checkboxIdInt] = currentCheckboxState[checkboxIdInt];
        }
        // Si l'enfant n'est pas dans `children`, on le décoche
        else {
          updatedState[checkboxIdInt] = false;
        }
      });

      return updatedState;
    });
  };

  useEffect(() => {
    if (children.length > 0) {
      // Récupère l'état actuel des checkboxes du localStorage
      const currentCheckboxState = JSON.parse(localStorage.getItem("checkboxstate"));

      // Si des cases à cocher sont stockées dans le localStorage
      if (currentCheckboxState) {
        // Met à jour l'état des checkboxes en fonction de la liste des enfants
        updateCheckboxes(currentCheckboxState);
      } else {
        // Si aucune valeur dans localStorage, initialise l'état avec un objet vide
        setCheckboxState({});
      }
    }
  }, [children]);

  useEffect(() => {
    // Sauvegarde l'état des checkboxes dans le localStorage à chaque changement
    localStorage.setItem("checkboxstate", JSON.stringify(checkboxState));
  }, [checkboxState]);

  const handleCheckboxChange = (childId) => {
    setCheckboxState((prevState) => {
      const newState = { ...prevState, [childId]: !prevState[childId] };
      return newState;
    });
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-selected" onClick={handleDropdownToggle} style={{left:"3%", position:"relative"}}>
        <div className="drop-down-title" style={{whiteSpace: "nowrap" }}>
          Couleur des enfants
        </div>
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

export default ChildDropDown;
