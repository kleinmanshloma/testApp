import React, { useState } from "react";
import URL_DEV from "./URL";
import "./Edit.css";

const EditToDo = ({ editID, setEdit, setEditID }) => {
  const [toDoList, setToDoList] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleButtonClick(data) {
    console.log(errorMessage);
    setInterval(() => {
      setErrorMessage("");
    }, 5000);
  }

  const handleErrorMessage = () => {
    setErrorMessage("");
  };

  const handleInputChange = (id) => {
    console.log(editID);
    setEdit(true);

    const editToDo = {
      title,
      description,
      completed: false,
      time,
      date,
    };
    console.log(editToDo, editID);
    const url = `${URL_DEV}task/${editID}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setErrorMessage(`Oops! Something went wrong. ${data.message}`);
        handleButtonClick(data);
        setToDoList(toDoList.filter((toDo) => toDo._id !== editID));
        setToDoList([...toDoList, data]);
        setEdit(false);
        setEditID(null);
      })
      .catch((error) => {
        setEdit(false);
      });
    setEditID(null);
  };

  return (
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
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="edit-container-body-input">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="edit-container-body-input">
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="edit-container-body-input">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-container-footer">
          <button className="button-save" onClick={() => handleInputChange()}>
            Save
          </button>
          <button className="button-cancel" onClick={() => setEdit(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditToDo;
