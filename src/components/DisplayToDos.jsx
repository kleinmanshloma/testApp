import { useState } from "react";

const DisplayToDos = ({ toDoList, SetToDoList }) => {
  const [style, setStyle] = useState(false);

  const completed = (id, e) => {
    toDoList.map((todo) => {
      if (Date.now(todo.id) === Date.now(id)) {
        todo.complete = true;
      }
      SetToDoList(toDoList);

      if (style === false) {
        e.target.parentElement.style.textDecoration = "line-through";
        e.target.parentElement.querySelector("input").click();
        setStyle(true);
      }
      if (style === true) {
        e.target.parentElement.style.textDecoration = "initial";
        e.target.parentElement.querySelector("input").click();
        setStyle(false);
      }
      return todo;
    });
  };

  const deleteToDo = (id) => {
    const newList = toDoList.filter((todo) => todo.id !== id);
    SetToDoList(newList);
  };

  const checkboxClicked = (id, e) => {
    completed(id, e);
  };

  const handleClick = (id, e) => {
    completed(id, e);
  };

  const toDoItems = toDoList.map((toDo) => (
    <li key={toDo.id}>
      <span className="li-to-do"> {toDo.toDo}</span>
      <span className="li-description"> {toDo.description}</span>
      <input
        className="checkbox"
        type="checkbox"
        onChange={(e) => checkboxClicked(toDo.id, e)}
      />
      <button
        onClick={() => {
          deleteToDo(toDo.id);
        }}
      >
        Delete
      </button>
    </li>
  ));
  return (
    <div>
      <h1>My To Do</h1>
      <ul
        onClick={(e) => {
          handleClick(toDoItems[0].key, e);
        }}
      >
        {toDoItems}
      </ul>
    </div>
  );
};

export default DisplayToDos;
