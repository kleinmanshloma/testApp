import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./AddButton.css";

const AddBtn = ({ setAddAToDo }) => {
  const handleSetAddAToDo = () => {
    setAddAToDo(true);
  };

  return (
    <Link to="/AddToDo" onClick={handleSetAddAToDo} className="btn-add-g">
      <FaPlus className="add-btn" />
      <pre className="add-btn-text"> Add To Do</pre>
    </Link>
  );
};

export default AddBtn;
