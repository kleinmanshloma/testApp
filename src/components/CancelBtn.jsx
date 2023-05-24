import React from "react";
import { Link } from "react-router-dom";

const CancelBtn = ({ setAddAToDo, setEdit }) => {
  const handleSetAddAToDo = () => {
    setAddAToDo(false);
  };

  return (
    <Link to="/DisplayToDos" onClick={handleSetAddAToDo} className="cancel-btn">
      Cancel
    </Link>
  );
};

export default CancelBtn;
