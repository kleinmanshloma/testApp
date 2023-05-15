import AddBtn from "./AddBtn";

import "./NoToDo.css";

const NoToDoFound = ({ setAddAToDo }) => {
  return (
    <div>
      <AddBtn setAddAToDo={setAddAToDo} /* className="btn-add"  */ />
      <div className="no-to-do">
        <h1 className="header">To Do List</h1>
        <p className="no-to-do-found">No To Do Found</p>
      </div>
    </div>
  );
};

export default NoToDoFound;
