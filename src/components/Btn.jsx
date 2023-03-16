const Btn = ({
  toDo,
  toDoDescription,
  toDoList,
  SetToDoList,
  setToDoDescription,
  setToDo,
}) => {
  const addToDos = () => {
    // create obj for to do
    const addToDo = {
      id: new Date(),
      toDo: toDo,
      description: toDoDescription,
      complete: false,
    };

    // add the to do to the list
    SetToDoList([...toDoList, addToDo]);

    // clear the fields
    setToDo("");
    setToDoDescription("");
  };

  return (
    <div className="new-to-do-btn">
      <div onClick={addToDos}>Add To Do</div>
    </div>
  );
};

export default Btn;
