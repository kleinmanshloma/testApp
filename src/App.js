import { useState, useEffect } from "react";
import AddToDo from "./components/AddToDo";
import DisplayToDos from "./components/DisplayToDos";
import URL_DEV from "./components/URL";
import NoToDoFound from "./components/NoToDoFound";
import AddBtn from "./components/AddBtn";
import CreateUser from "./components/CreateUser";

import "./App.css";
import "./components/AddButton.css";
import "./components/NoToDo.css";
import "./components/Body.css";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [addAToDo, setAddAToDo] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${URL_DEV}tasks`)
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [toDoList]);

  const handleSetAddToDo = (value) => {
    setAddAToDo(value);
  };

  return (
    <>
      {!user && <CreateUser />}
      {user && addAToDo && (
        <div className="body-add-To-Do">
          <h1>To Do List</h1>
          <AddToDo setToDoList={setToDoList} setAddAToDo={setAddAToDo} />
        </div>
      )}
      {user && !addAToDo && toDoList.length === 0 && (
        <div className="body-no-to-do-found">
          <NoToDoFound setAddAToDo={handleSetAddToDo} />
        </div>
      )}
      {user && !addAToDo && toDoList.length > 0 && (
        <div className="body">
          <DisplayToDos
            edit={edit}
            setEdit={setEdit}
            toDoList={toDoList}
            setToDoList={setToDoList}
            addAToDo={addAToDo}
          />
          {user && !edit && <AddBtn setAddAToDo={setAddAToDo} />}
        </div>
      )}
    </>
  );
}

export default App;
