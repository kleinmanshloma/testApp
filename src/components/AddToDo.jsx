import Btn from "./Btn";

const AddToDo = ({
  toDoList,
  toDo,
  toDoDescription,
  toDoTime,
  toDoDate,
  setToDoDescription,
  setToDo,
  setToDoList,
  setToDoTime,
  setToDoDate,
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
        <div>
          <label htmlFor="new-to-do">Time</label>
          <input
            className="textarea"
            type="time"
            value={toDoTime}
            onChange={(e) => setToDoTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="new-to-do">Date</label>
          <input
            className="textarea"
            type="date"
            value={toDoDate}
            onChange={(e) => setToDoDate(e.target.value)}
          />
        </div>
      </form>
      <Btn
        toDo={toDo}
        toDoDescription={toDoDescription}
        toDoList={toDoList}
        toDoTime={toDoTime}
        toDoDate={toDoDate}
        setToDoList={setToDoList}
        setToDo={setToDo}
        setToDoDescription={setToDoDescription}
        setToDoTime={setToDoTime}
        setToDoDate={setToDoDate}
      />
    </div>
  );
};

export default AddToDo;
