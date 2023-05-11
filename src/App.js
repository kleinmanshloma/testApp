import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";
import URL_DEV from "./components/URL";
import EditToDo from "./components/Edit";

import "./App.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [addAToDo, setAddAToDo] = useState(false);

  // fetch to do list from "http://localhost:4000/task"
  useEffect(() => {
    fetch(`${URL_DEV}tasks`)
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {!edit && addAToDo && (
        <>
          <h1>To Do List</h1>
          <AddToDo setToDoList={setToDoList} setAddAToDo={setAddAToDo} />
        </>
      )}
      {!edit && toDoList.length > 0 && !addAToDo && (
        <>
          <button onClick={() => setAddAToDo(true)}>Add a To Do</button>
          <DisplayToDos
            edit={edit}
            setEdit={setEdit}
            setEditID={setEditID}
            toDoList={toDoList}
            setToDoList={setToDoList}
          />
        </>
      )}
      {edit && editID && (
        <EditToDo
          editID={editID}
          setEdit={setEdit}
          setEditID={setEditID}
          toDoList={toDoList}
          setToDoList={setToDoList}
        />
      )}
      {!edit && toDoList.length === 0 && !addAToDo && (
        <>
          <button onClick={() => setAddAToDo(true)}>Add a To Do</button>
          <div className="no-to-do">No To Do</div>
        </>
      )}
    </>
  );
}

export default App;
