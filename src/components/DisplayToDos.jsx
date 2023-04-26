import { useState } from "react";

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

  const handleClickElement = (id, e) => {
    if (completedIDs.includes(id)) {
      e.target.parentElement.style.textDecoration = "initial";
      setCompletedIDs(completedIDs.filter((completedID) => completedID !== id));
    } /* else {
      e.target.parentElement.style.textDecoration = "line-through";
      setCompletedIDs([...completedIDs, id]);
    } */
  };

  const handleDelete = (id) => {
    SetToDoList(toDoList.filter((toDo) => toDo.id !== id));
  };

  const toDoItems = toDoList.map((toDo) => {
    const isCompleted = completedIDs.includes(toDo.id);

    return (
      <li key={toDo.id} className={isCompleted ? "completed" : ""}>
        <span className="li-to-do">{toDo.toDo}</span>
        <span className="li-description">{toDo.description}</span>
        <input
          className="checkbox"
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => handleComplete(toDo.id, e)}
        />
        <button onClick={() => handleDelete(toDo.id)}>Delete</button>
      </li>
    );
  });

  return (
    <div>
      <h1>My To Do</h1>
      <ul onClick={(e) => handleClickElement(e)}>{toDoItems}</ul>
    </div>
  );
};

export default DisplayToDos;
