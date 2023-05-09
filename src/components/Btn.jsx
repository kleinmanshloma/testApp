/* import { useState, useEffect } from "react"; */
import "./centered.css";

function Btn({
  toDo,
  toDoDescription,
  toDoList,
  toDoTime,
  toDoDate,
  setToDoList,
  setToDo,
  setToDoDescription,
  setToDoTime,
  setToDoDate,
}) {
  const addToDo = () => {
    // create obj for to do
    const newToDo = {
      id: Date.now().toString(),
      title: toDo,
      description: toDoDescription,
      complete: false,
      time: toDoTime,
      date: toDoDate,
    };

    // add to data base using fetch and post method
    fetch("http://localhost:4000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // add the to do to the list
    setToDoList((prevToDoList) => [...prevToDoList, newToDo]);

    // clear the fields
    setToDo("");
    setToDoDescription("");
    // set the time and date  to the initial values
    setToDoTime("00:00");
    setToDoDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="new-to-do-btn">
      <div className="centered" onClick={addToDo}>
        Add To Do
      </div>
    </div>
  );
}

export default Btn;
