import { FaPlus } from "react-icons/fa";

const AddBtn = ({ setAddAToDo }) => {
  const handleSetAddAToDo = () => {
    setAddAToDo(true);
  };

  return (
    <button onClick={handleSetAddAToDo} className="btn-add-g">
      <FaPlus className="add-btn" />
      <pre className="add-btn-text"> Add To Do</pre>
    </button>
  );
};

export default AddBtn;
