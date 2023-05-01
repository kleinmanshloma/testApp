import { useEffect } from "react";
import "./DisplayToDos.css";

const DisplayToDos = ({
  toDoList,
  setToDoList,
  completedIDs,
  setCompletedIDs,
}) => {
  const handleComplete = (id, e) => {
    const newCompletedIDs = completedIDs.includes(id)
      ? completedIDs.filter((completedID) => completedID !== id)
      : [...completedIDs, id];

    e.target.parentElement.style.textDecoration = newCompletedIDs.includes(id)
      ? "line-through"
      : "initial";

    setCompletedIDs(newCompletedIDs);

    localStorage.setItem("completedIDs", JSON.stringify(newCompletedIDs));
  };

  const handleDelete = (id) => {
    setToDoList(toDoList.filter((toDo) => toDo.id !== id));
    console.log(toDoList);
    localStorage.setItem("toDoList", JSON.stringify([toDoList]));
  };

  useEffect(() => {
    const completedIDsFromLocalStorage = JSON.parse(
      localStorage.getItem("completedIDs")
    );

    if (completedIDsFromLocalStorage) {
      setCompletedIDs(completedIDsFromLocalStorage);
    }
  }, [setCompletedIDs]);

  return (
    <div>
      <h1>My To Do</h1>
      <ul>
        {toDoList.map((toDo) => {
          const isCompleted = completedIDs.includes(toDo.id);
          const completedItemClassName = isCompleted ? "completed" : "";

          return (
            <li className="li" key={toDo.id}>
              <div className={completedItemClassName}>
                {isCompleted && (
                  <div className="completed-overlay">
                    <span className="completed-text">Completed</span>
                  </div>
                )}

                <div className="container">
                  <div className="flex-div ">
                    <span className="li-to-do ">TO DO</span>
                    <span className="to-do li-to-do-name ">{toDo.toDo}</span>
                  </div>
                  <div className="flex-div">
                    <span className="li-description">DESCRIPTION</span>
                    <span className="to-do li-description-name">
                      {toDo.description}
                    </span>
                  </div>
                  <div className="flex-div">
                    <span className="li-time">TIME</span>
                    <span className="to-do li-time-name">{toDo.time}</span>
                  </div>
                  <div className="flex-div margin-bottom">
                    <span className="li-date">DATE</span>
                    <span className="to-do li-date-name">{toDo.date}</span>
                  </div>
                </div>

                <div className="margin-top">
                  <button
                    className="button-delete"
                    onClick={() => handleDelete(toDo.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="button-completed"
                    onClick={(e) => handleComplete(toDo.id, e)}
                  >
                    {isCompleted ? "Mark Incomplete" : "Mark Complete"}
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayToDos;
