import React, { useState } from "react";
import config from "../config";
import "./Edit.css";
import "./SaveBtn.css";
import { Link } from "react-router-dom";

const EditToDo = ({ editID, setEdit, setEditID, toDoList, setToDoList }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let toDo = toDoList.find((toDo) => toDo._id === editID);

  const token = localStorage.getItem("token");

  const handleInputChange = () => {
    const editToDo = {
      title,
      description,
      completed: false,
      time,
      date,
    };

    const url = `${config.URL_PROD}/task/${editID}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editToDo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "Update failed. Please ensure all required fields are provided."
          );
        }
        // Check if response has a JSON content type
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          throw new Error("Invalid response from the server");
        }
      })
      .then((data) => {
        setErrorMessage("");
        setToDoList(toDoList.filter((toDo) => toDo._id !== editID));
      })
      .catch((error) => {
        setErrorMessage(
          "An error occurred while updating the task. Please try again."
        );
      })
      .finally(() => {
        setEdit(false);
      });
  };

  function handleErrorMessage() {
    setErrorMessage("");
  }

  return (
    <div className="no-to-do">
      <div className="edit" key={editID}>
        {errorMessage && (
          <div>
            {errorMessage}
            <button onClick={handleErrorMessage}>X</button>
          </div>
        )}

        <div className="edit-container">
          <div className="edit-container-header">
            <h1>Edit To Do</h1>
          </div>
          <div className="edit-container-body">
            <div className="edit-container-body-input">
              <label htmlFor="title">To Do</label>
              <input
                className="textarea"
                type="text"
                name="title"
                value={title}
                placeholder={toDo ? toDo.title : ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="edit-container-body-input">
              <label htmlFor="description">Description</label>
              <input
                className="textarea"
                type="text"
                name="description"
                value={description}
                placeholder={toDo ? toDo.description : ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="edit-container-body-input">
              <label htmlFor="time">Time</label>
              <input
                className="textarea"
                type="time"
                name="time"
                value={time}
                placeholder={toDo ? toDo.time : ""}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="edit-container-body-input">
              <label htmlFor="date">Date</label>
              <input
                className="textarea"
                type="date"
                name="date"
                value={date}
                placeholder={toDo ? toDo.date : ""}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="edit-container-footer">
            <button className="btn-save" onClick={handleInputChange}>
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={() => {
                <Link to="/DisplayToDos" />;
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditToDo;
