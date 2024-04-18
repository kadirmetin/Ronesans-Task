import React, { useState } from "react";
import FilterModal from "../components/filterModal/filterModal";

export const ModalContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStartTime, setFilterStartTime] = useState(null);
  const [filterEndTime, setFilterEndTime] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const applyFilter = (startTime, endTime) => {
    console.log(
      "Filter applied with startTime:",
      startTime,
      "endTime:",
      endTime
    );

    setFilterStartTime(startTime);
    setFilterEndTime(endTime);
  };

  return (
    <ModalContext.Provider
      value={{ openModal, closeModal, filterStartTime, filterEndTime }}
    >
      {children}
      <FilterModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onApplyFilter={applyFilter}
      />
    </ModalContext.Provider>
  );
};
