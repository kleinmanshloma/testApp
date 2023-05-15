/* import { useEffect } from "react"; */
import URL_DEV from "./URL";
import "./centered.css";

function Btn({
  toDo,
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

    setAddAToDo(false);

    fetch(`${URL_DEV}tasks`)
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="new-to-do-btn">
      <div
        className="centered"
        onClick={() => {
          addToDo();
        }}
      >
        Add To Do
      </div>
    </div>
  );
}

export default Btn;
