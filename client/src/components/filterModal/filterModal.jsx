import { useState } from "react";
import "./filtermodal.css";

const FilterModal = ({ isModalOpen, onClose, onApplyFilter }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (isModalOpen !== true) {
    return null;
  }

  const handleClickOutside = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleDefaultFilter = () => {
    setStartTime("");
    setEndTime("");
    onApplyFilter("", "");
    onClose();
  };

  const handlePickFilter = () => {
    onApplyFilter(startTime, endTime);
    onClose();
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content">
        <label htmlFor="startTime">
          Start Time
          <br />
          <input
            type="date"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label htmlFor="endTime">
          End Time
          <br />
          <input
            type="date"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
        <button onClick={handleDefaultFilter}>Default</button>
        <button onClick={handlePickFilter}>Pick</button>
      </div>
    </div>
  );
};

export default FilterModal;
