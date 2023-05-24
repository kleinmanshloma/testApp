import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import URL_DEV from "./URL";
import EditToDo from "./Edit";
import AddBtn from "./AddBtn";
import Navbar from "./Navbar";

import "./DisplayToDos.css";

const DisplayToDos = ({
  edit,
  setEdit,
  setToDoList,
  toDoList,
  setAddAToDo,
}) => {
  const [completedIDs, setCompletedIDs] = useState([]);
  const [editID, setEditID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayErrorMessage, setDisplayErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleComplete = async (id) => {
    const isCompleted = completedIDs.some((data) => data._id === id);
    const updatedCompletedIDs = isCompleted
      ? completedIDs.filter((data) => data._id !== id)
      : [...completedIDs, { _id: id }];

    const completeChecked = !isCompleted;

    const url = `${URL_DEV}/task/${id}`;
    const method = "PATCH";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: completeChecked }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task completion status.");
      }
      const data = await response.json();
      setCompletedIDs(updatedCompletedIDs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    fetch(`${URL_DEV}/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete task.");
        }
        return res.json();
      })
      .then((data) => {
        setToDoList(toDoList.filter((toDo) => toDo._id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${URL_DEV}/tasks`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Authentication failed");
        }
        return res.json();
      })
      .then((data) => {
        setToDoList(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setDisplayErrorMessage(error.message);
      });
  }, [completedIDs, toDoList, editID]);

  if (displayErrorMessage) {
    return (
      <div className="error-message">
        <p>{displayErrorMessage}</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  if (edit && editID) {
    return (
      <EditToDo
        editID={editID}
        setEdit={setEdit}
        setEditID={setEditID}
        toDoList={toDoList}
        setToDoList={setToDoList} // Fix the missing prop
        edit={edit} // Fix the missing prop
      />
    );
  }

  return (
    <div>
      <Navbar />
      <AddBtn
        setToDoList={setToDoList}
        toDoList={toDoList}
        setAddAToDo={setAddAToDo}
      />
      <h1>My To Do</h1>
      {loading && <p>Loading...</p>}
      <ul className="ul-box">
        {toDoList.map((toDo) => {
          const isCompleted = completedIDs.some(
            (data) => data._id === toDo._id
          );

          return (
            <li key={toDo._id}>
              <div
                className={`container-display ${
                  isCompleted ? "completed" : ""
                }`}
              >
                {isCompleted && (
                  <div className="completed-overlay">
                    <span className="completed-text">Completed</span>
                  </div>
                )}

                <div>
                  <div className="flex-div ">
                    <span className="li-to-do li-to-do-title">TO DO</span>
                    <span className="li-to-do-content">{toDo.title}</span>
                  </div>
                  <div className="flex-div">
                    <span className="li-description li-to-do-title">
                      DESCRIPTION
                    </span>
                    <span className="li-to-do-content">{toDo.description}</span>
                  </div>
                  <div className="flex-div">
                    <span className="li-time li-to-do-title">TIME</span>
                    <span className="li-to-do-content">{toDo.time}</span>
                  </div>
                  <div className="flex-div margin-bottom">
                    <span className="li-date li-to-do-title">DATE</span>
                    <span className="li-to-do-content">{toDo.date}</span>
                  </div>
                </div>
              </div>
              <div className="buttons-group">
                <button
                  className="button-delete"
                  onClick={() => handleDelete(toDo._id)}
                >
                  Delete
                </button>
                <button
                  className="button-completed"
                  onClick={() => handleComplete(toDo._id)}
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
                    className="edit-icon"
                  />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DisplayToDos;
