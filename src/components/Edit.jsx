import React, { useState } from "react";
import URL_DEV from "./URL";
import "./Edit.css";
import "./SaveBtn.css";

const EditToDo = ({ editID, setEdit, setEditID, toDoList, setToDoList }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  let toDo = toDoList.find((toDo) => toDo._id === editID);

  function handleButtonClick(data) {
    console.log(errorMessage);
    setInterval(() => {
      setErrorMessage("");
    }, 5000);
  }

  const handleErrorMessage = () => {
    setErrorMessage("");
  };

  const handleInputChange = () => {
    setEdit(true);

    const editToDo = {
      title,
      description,
      completed: false,
      time,
      date,
    };

    const url = `${URL_DEV}task/${editID}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editToDo),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(editID);
        setErrorMessage(`Oops! Something went wrong. ${data.message}`);
        handleButtonClick(data);
        setToDoList(toDoList.filter((toDo) => toDo._id !== editID));
      })
      .catch((error) => {
        setEdit(false);
      });
    setEdit(false);
    setEditID(null);
  };

  return (
    <div className="no-to-do">
      <div className="edit" key={editID}>
        {errorMessage.length > 0 && (
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
                placeholder={`${toDo.title}`}
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
                placeholder={`${toDo.description}`}
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
                placeholder={`${toDo.time}`}
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
                placeholder={`${toDo.date}`}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className="edit-container-footer">
            <button className="btn-save" onClick={() => handleInputChange()}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditToDo;
