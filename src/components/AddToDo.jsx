import React, { useState } from "react";

import Btn from "./Btn";
import CancelBtn from "./CancelBtn";

import "./btn-add-group.css";
import "./AddToDo.css";
import "./CancelBtn.css";

const AddToDo = ({ setAddAToDo, addAToDo, setToDoList, toDoList }) => {
  const [toDo, setToDo] = useState("");
  const [toDoDescription, setToDoDescription] = useState("");
  const [toDoTime, setToDoTime] = useState("00:00");
  const [toDoDate, setToDoDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  return (
    <div className="container">
      <h1>Add To Do</h1>
      <form>
        <div className="new-to-do-controls">
          <label htmlFor="new-to-do">To Do</label>
          <input
            className="textarea"
            type="textarea"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
        </div>
        <div className="new-to-do-controls">
          <label htmlFor="new-to-do">Description</label>
          <input
            className="textarea"
            type="textarea"
            value={toDoDescription}
            onChange={(e) => setToDoDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-to-do">Time</label>
          <input
            className="textarea"
            type="time"
            value={toDoTime}
            onChange={(e) => setToDoTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-to-do">Date</label>
          <input
            className="textarea"
            type="date"
            value={toDoDate}
            onChange={(e) => setToDoDate(e.target.value)}
          />
        </div>
      </form>

      <div className="btn-add-group">
        <Btn
          toDo={toDo}
          toDoDescription={toDoDescription}
          toDoList={toDoList}
          toDoTime={toDoTime}
          toDoDate={toDoDate}
          setToDoList={setToDoList}
          setToDo={setToDo}
          setToDoDescription={setToDoDescription}
          setToDoTime={setToDoTime}
          setToDoDate={setToDoDate}
          setAddAToDo={setAddAToDo}
          addAToDo={addAToDo}
        />
        <CancelBtn setAddAToDo={setAddAToDo} />
      </div>
    </div>
  );
};

export default AddToDo;
