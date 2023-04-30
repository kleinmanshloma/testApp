import { useState } from "react";

import "./DisplayToDos.css";

const DisplayToDos = ({ toDoList, SetToDoList }) => {
  const [completedIDs, setCompletedIDs] = useState([]);

  const handleComplete = (id, e) => {
    if (completedIDs.includes(id)) {
      e.target.parentElement.style.textDecoration = "initial";
      setCompletedIDs(completedIDs.filter((completedID) => completedID !== id));
    } else {
      e.target.parentElement.style.textDecoration = "line-through";
      setCompletedIDs([...completedIDs, id]);
    }
  };

  const handleDelete = (id) => {
    SetToDoList(toDoList.filter((toDo) => toDo.id !== id));
  };

  const toDoItems = toDoList.map((toDo) => {
    const isCompleted = completedIDs.includes(toDo.id);

    return (
      <li key={toDo.id} className={isCompleted ? "completed" : ""}>
        <div className="container ">
          <div className="flex-div ">
            <span className="li-to-do ">TO DO</span>
            <span className="to-do li-to-do-name ">{toDo.toDo}</span>
          </div>

          <div className="flex-div">
            <span className="li-description">DESCRIPTION</span>
            <span className="to-do  li-description-name">
              {toDo.description}
            </span>
          </div>

          <div className="flex-div">
            <span className="li-time">ON</span>
            <span className="to-do li-time-name">{toDo.time}</span>
          </div>

          <div className="flex-div">
            <span className="li-date">ON</span>
            <span className="to-do li-date-name">{toDo.date}</span>
          </div>

          <input
            className="checkbox"
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => handleComplete(toDo.id, e)}
          />
        </div>
        <button
          className="move-left button-delete"
          onClick={() => handleDelete(toDo.id)}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <div>
      <h1>My To Do</h1>
      <ul>{toDoItems}</ul>
    </div>
  );
};

export default DisplayToDos;
