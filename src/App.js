import { useState, useEffect } from "react";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";

import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [toDo, setToDo] = useState("");
  const [toDoDescription, setToDoDescription] = useState("");
  const [toDoTime, setToDoTime] = useState("");
  const [toDoDate, setToDoDate] = useState("");
  const [completedIDs, setCompletedIDs] = useState([]);

  // save and retrieve data from local storage

  useEffect(() => {
    const toDoListjson = JSON.parse(localStorage.getItem("toDoList"));
    if (toDoListjson && toDoListjson.length > 0) {
      setToDoList(toDoListjson);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  return (
    <div>
      {
        <>
          <h1>To Do List</h1>
          <AddToDo
            toDo={toDo}
            toDoDescription={toDoDescription}
            toDoList={toDoList}
            setToDoList={setToDoList}
            setToDo={setToDo}
            setToDoDescription={setToDoDescription}
            toDoTime={toDoTime}
            setToDoTime={setToDoTime}
            toDoDate={toDoDate}
            setToDoDate={setToDoDate}
            completedIDs={completedIDs}
            setCompletedIDs={setCompletedIDs}
          />
        </>
      }
      {toDoList.length > 0 && (
        <DisplayToDos
          toDoList={toDoList}
          setToDoList={setToDoList}
          completedIDs={completedIDs}
          setCompletedIDs={setCompletedIDs}
        />
      )}
    </div>
  );
}

export default App;
