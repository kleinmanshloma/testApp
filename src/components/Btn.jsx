/* import { useEffect } from "react"; */
import { Link } from "react-router-dom";
import config from "../config";

import "./centered.css";

function Btn({
  toDo,
  toDoList,
  toDoDescription,
  toDoTime,
  toDoDate,
  setToDoList,
  setToDo,
  setToDoDescription,
  setToDoTime,
  setToDoDate,
  setAddAToDo,
  addAToDo,
}) {
  const addToDo = () => {
    const token = localStorage.getItem("token");

    const taskTime = new Date();
    taskTime.setHours(0, parseInt(toDoTime), 0);
    const formattedTime = taskTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    // create obj for to do
    const newToDo = {
      id: Date.now().toString(),
      title: toDo,
      description: toDoDescription,
      complete: false,
      time: formattedTime,
      date: new Date(toDoDate).getDate(),
    };

    // add to data base using fetch and post method
    fetch(`${config.URL_PROD}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        // add the to do to the list
        setToDoList((prevToDoList) => [...prevToDoList, newToDo]);
      })
      .catch((error) => {
        console.log(error);
      });

    // clear the fields
    setToDo("");
    setToDoDescription("");
    // set the time and date  to the initial values
    setToDoTime("00:00");
    setToDoDate(new Date().toISOString().slice(0, 10));

    setAddAToDo(false);

    fetch(`${config.URL_PROD}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });

    // go to the display page
  };

  return (
    <div className="new-to-do-btn">
      <div
        className="centered"
        onClick={() => {
          addToDo();
        }}
      >
        <Link to="/DisplayToDos">Add To Do</Link>
      </div>
    </div>
  );
}

export default Btn;
