import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";
/* import EditToDo from "./components/EditToDo"; */

import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]);

  // fetch to do list from "http://localhost:4000/task"
  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1>To Do List</h1>
      <AddToDo />
      {toDoList.length > 0 && <DisplayToDos />}
    </>
  );
}

export default App;
