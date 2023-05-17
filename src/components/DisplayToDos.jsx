import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import URL_DEV from "./URL";
import EditToDo from "./Edit";

import "./DisplayToDos.css";

const DisplayToDos = ({ edit, setEdit, setToDoList, toDoList, addAToDo }) => {
  const [completedIDs, setCompletedIDs] = useState([]);
  const [complete, setComplete] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleComplete = (id, e) => {
    let completeChecked = false;

    if (completedIDs.some((data) => data._id === id)) {
      setCompletedIDs(completedIDs.filter((data) => data._id !== id));
    } else {
      setCompletedIDs([...completedIDs, { _id: id }]);
      completeChecked = true;
    }

    const url = `${URL_DEV}task/${id}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completeChecked }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setComplete(completeChecked); // update the complete state here
  };

  const handleDelete = (id) => {
    fetch(`${URL_DEV}task/${id}`, {
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
    fetch(`${URL_DEV}tasks`)
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [completedIDs, setToDoList, editID]);

  return (
    <>
      {edit && editID && (
        <EditToDo
          editID={editID}
          setEdit={setEdit}
          setEditID={setEditID}
          toDoList={toDoList}
          setToDoList={setToDoList}
          edit={edit}
        />
      )}
      {!edit && (
        <div className="display-block">
          <h1>My To Do</h1>
          <ul className="display-block">
            {!edit &&
              toDoList.map((toDo) => {
                const isCompleted =
                  completedIDs.some((data) => data._id === toDo._id) ||
                  (toDo.completed &&
                    toDoList.some((data) => data._id === toDo._id));

                const completedItemClassName =
                  isCompleted && complete ? "line-through" : "initial";

                return (
                  <li
                    className="li"
                    key={toDo._id}
                    style={{ position: "relative" }}
                  >
                    <div className={`style`}>
                      {isCompleted && (
                        <div
                          className={`completed-overlay ${completedItemClassName}`}
                          style={{
                            position: "absolute",
                            top: "6rem",
                            left: "12rem",
                          }}
                        >
                          <span className="completed-text">Completed</span>
                        </div>
                      )}

                      <div className="container-display">
                        <div className="flex-div ">
                          <span className="li-to-do">TO DO</span>
                          <span className="li-to-do-name">{toDo.title}</span>
                        </div>
                        <div className="flex-div">
                          <span className="li-description">DESCRIPTION</span>
                          <span className="to-do li-description-name">
                            {toDo.description}
                          </span>
                        </div>
                        <div className="flex-div">
                          <span className="li-time">TIME</span>
                          <span className="to-do li-time-name">
                            {toDo.time}
                          </span>
                        </div>
                        <div className="flex-div margin-bottom">
                          <span className="li-date">DATE</span>
                          <span className="to-do li-date-name">
                            {toDo.date}
                          </span>
                        </div>
                      </div>

                      <div className="margin-top buttons">
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
                          {isCompleted ? "Incomplete" : "Complete"}
                        </button>

                        <button
                          className="button-edit"
                          onClick={() => {
                            setEditID(toDo._id);
                            setEdit(true);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="2x"
                            color="orangered"
                          />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
      ;
    </>
  );
};

export default DisplayToDos;
