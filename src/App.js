import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";
import NoToDoFound from "./components/NoToDoFound";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import Btn from "./components/Btn";

import "./App.css";
import "./components/AddButton.css";
import "./components/NoToDo.css";
import "./components/Body.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [addAToDo, setAddAToDo] = useState(false);

  const handleSetAddToDo = (value) => {
    setAddAToDo(value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateUser" element={<CreateUser />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/AddToDo"
          element={
            <AddToDo
              setToDoList={setToDoList}
              toDoList={toDoList}
              setAddAToDo={setAddAToDo}
            />
          }
        />
        <Route
          path="/NoToDoFound"
          element={
            <NoToDoFound
              setToDoList={setToDoList}
              toDoList={toDoList}
              setAddAToDo={setAddAToDo}
            />
          }
        />
        <Route
          path="/DisplayToDos"
          element={
            <DisplayToDos
              edit={edit}
              setEdit={setEdit}
              setToDoList={setToDoList}
              toDoList={toDoList}
              setAddAToDo={setAddAToDo}
            />
          }
        />
        <Route
          path="/Btn"
          element={<Btn setToDoList={setToDoList} toDoList={toDoList} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
