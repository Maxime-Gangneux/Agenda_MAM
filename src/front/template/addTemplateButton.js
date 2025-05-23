import React, { useState } from "react";
import ModalTemplateForm from "./templateForm"; // Vous devez créer ce composant
import { ReactComponent as PlusIcon } from "../../assets/plus.svg"; // Icône du bouton +

const AddTemplateButton = ({user}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button className="add-template-btn" onClick={handleModalToggle}>
        <PlusIcon />
      </button>

      {isModalOpen && (
        <ModalTemplateForm user = {user} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default AddTemplateButton;
