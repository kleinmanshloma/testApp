import Btn from "./Btn";

const AddToDo = ({
  toDoList,
  toDo,
  toDoDescription,
  setToDoDescription,
  setToDo,
  SetToDoList,
}) => {
  return (
    <div className="new-to-do">
      <form>
        <div className="new-to-do-controls">
          <label htmlFor="new-to-do">To Do</label>
          <input
            className="textarea"
            type="textarea"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
        </div>
        <div className="new-to-do-controls">
          <label htmlFor="new-to-do">Description</label>
          <input
            className="textarea"
            type="textarea"
            value={toDoDescription}
            onChange={(e) => setToDoDescription(e.target.value)}
          />
        </div>
      </form>
      <Btn
        toDo={toDo}
        toDoDescription={toDoDescription}
        toDoList={toDoList}
        SetToDoList={SetToDoList}
        setToDo={setToDo}
        setToDoDescription={setToDoDescription}
      />
    </div>
  );
};

export default AddToDo;
