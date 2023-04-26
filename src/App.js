import { useState } from "react";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";
// import Btn from "./components/Btn";

import "./App.css";

function App() {
  const [toDoList, SetToDoList] = useState([]);
  const [toDo, setToDo] = useState("");
  const [toDoDescription, setToDoDescription] = useState("");

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
