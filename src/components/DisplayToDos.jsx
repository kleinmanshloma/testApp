const DisplayToDos = ({ toDoList, SetToDoList }) => {
  const deleteToDo = (id) => {
    const newList = toDoList.filter((todo) => todo.id !== id);
    SetToDoList(newList);
  };

  const checkboxClicked = (id) => {
    toDoList.map((todo) => {
      if (todo.id === id) {
        todo.complete = true;
      }
      return todo;
    });

    SetToDoList(toDoList);
    console.log(toDoList);
  };

  const handleClick = (e) => {
    e.target.parentElement.style.textDecoration = "line-through";
  };
  const toDoItems = toDoList.map((toDo) => (
    <li key={toDo.id}>
      <span className="li-to-do"> {toDo.toDo}</span>
      <span className="li-description"> {toDo.description}</span>
      <input
        className="checkbox"
        type="checkbox"
        onChange={() => checkboxClicked(toDo.id)}
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
      <ul onClick={handleClick}>{toDoItems}</ul>
    </div>
  );
};

export default DisplayToDos;
