import React, { useState } from "react";
import "./DisplayToDos.css";

const EditToDo = () => {
  const [toDos, setToDos] = useState([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const handleEditSubmit = (id, e) => {
    e.preventDefault();
    const updatedToDo = {
      name,
      time,
      date,
    };
    fetch(`http://localhost:4000/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const updatedToDos = toDos.map((toDo) => {
          if (toDo.id === id) {
            return { ...toDo, ...updatedToDo };
          }
          return toDo;
        });
        setToDos(updatedToDos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="edit-to-do">
      <h2>Edit To-Do</h2>
      <form onSubmit={handleEditSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditToDo;
