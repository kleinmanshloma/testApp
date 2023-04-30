import { useState, useEffect } from "react";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";

import "./App.css";

function App() {
  const [toDoList, SetToDoList] = useState([]);
  const [toDo, setToDo] = useState("");
  const [toDoDescription, setToDoDescription] = useState("");
  const [toDoTime, setToDoTime] = useState("");
  const [toDoDate, setToDoDate] = useState("");

  // save and retrieve data from local storage

  useEffect(() => {
    const toDoList = JSON.parse(localStorage.getItem("toDoList"));
    if (toDoList && toDoList.length > 0) {
      SetToDoList(toDoList);
    }
  }, []);

  /*  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]); */

  return (
    <div>
      {
        <>
          <h1>To Do List</h1>
          <AddToDo
            toDo={toDo}
            toDoDescription={toDoDescription}
            toDoList={toDoList}
            SetToDoList={SetToDoList}
            setToDo={setToDo}
            setToDoDescription={setToDoDescription}
            toDoTime={toDoTime}
            setToDoTime={setToDoTime}
            toDoDate={toDoDate}
            setToDoDate={setToDoDate}
          />
        </>
      }
      {toDoList.length > 0 && (
        <DisplayToDos toDoList={toDoList} SetToDoList={SetToDoList} />
      )}
    </div>
  );
}

export default App;
