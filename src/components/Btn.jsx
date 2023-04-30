import "./centered.css";

const Btn = ({
  toDo,
  toDoDescription,
  toDoList,
  toDoTime,
  toDoDate,
  SetToDoList,
  setToDoDescription,
  setToDo,
  setToDoTime,
  setToDoDate,
}) => {
  const addToDos = () => {
    // create obj for to do
    const addToDo = {
      id: new Date(),
      toDo: toDo,
      description: toDoDescription,
      complete: false,
      time: toDoTime,
      date: toDoDate,
    };

    // add the to do to the list
    SetToDoList([...toDoList, addToDo]);

    // clear the fields
    setToDo("");
    setToDoDescription("");
    // set the time and date  to the initial value
    setToDoTime("00:00");
    setToDoDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="new-to-do-btn">
      <div className="centered" onClick={addToDos}>
        Add To Do
      </div>
    </div>
  );
};

export default Btn;
