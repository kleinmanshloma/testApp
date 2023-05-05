import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DisplayToDos.css";

const DisplayToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [completedIDs, setCompletedIDs] = useState([]);

  const handleComplete = (id, e) => {
    const newCompletedIDs = completedIDs.includes(id)
      ? completedIDs.filter((completedID) => completedID !== id)
      : [...completedIDs, id];

    e.target.parentElement.style.textDecoration = newCompletedIDs.includes(id)
      ? "line-through"
      : "initial";

    setCompletedIDs(newCompletedIDs);

    const completed = newCompletedIDs.includes(id);
    const url = `http://localhost:4000/task/${id}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setToDoList(toDoList.filter((toDo) => toDo._id !== id));
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>My To Do</h1>
      <ul>
        {toDoList.map((toDo) => {
          const isCompleted = completedIDs.includes(toDo._id);
          const completedItemClassName = isCompleted ? "completed" : "";

          return (
            <li className="li" key={toDo._id}>
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
                    onClick={() => handleDelete(toDo._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button-completed"
                    onClick={(e) => handleComplete(toDo._id, e)}
                  >
                    {toDo.isCompleted ? "Mark Incomplete" : "Mark Complete"}
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
