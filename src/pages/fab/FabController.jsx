import React, { useState } from "react";
import CreateAdModal from "./CreateAdModal";
import FloatingActionButton from "./FloatingActionButton";

const FabController = () => {
  // This state controls if the modal is open or closed. It starts as closed.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* The Floating Action Button. */}
      <FloatingActionButton
        isOpen={isModalOpen}
        onClick={isModalOpen ? closeModal : openModal}
      />

      {/* The Modal Window.*/}
      <CreateAdModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default FabController;
