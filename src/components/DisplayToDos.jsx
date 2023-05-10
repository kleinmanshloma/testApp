import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./DisplayToDos.css";

const DisplayToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [completedIDs, setCompletedIDs] = useState([]);
  const [complete, setComplete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleButtonClick() {
    setErrorMessage("Oops! Something went wrong.");
  }

  const handleComplete = (id, e) => {
    let completeChecked = false;

    if (completedIDs.some((data) => data._id === id)) {
      setCompletedIDs(completedIDs.filter((data) => data._id !== id));
    } else {
      setCompletedIDs([...completedIDs, { _id: id }]);
      completeChecked = true;
    }

    console.log(completeChecked);

    const url = `http://localhost:4000/task/${id}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completeChecked }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    setComplete(completeChecked); // update the complete state here
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setToDoList(toDoList.filter((toDo) => toDo._id !== id));
        console.log(data);
      })
      .catch((error) => {
        setErrorMessage(error.errors.message);
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setToDoList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [completedIDs, toDoList]);

  const handleInputChange = (id) => {
    console.log(editID);
    setEdit(true);

    const editToDo = {
      title,
      description,
      completed: false,
      time,
      date,
    };
    console.log(editToDo, editID);
    const url = `http://localhost:4000/task/${editID}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editToDo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToDoList(toDoList.filter((toDo) => toDo._id !== editID));
        setToDoList([...toDoList, data]);
        setEdit(false);
        setEditID(null);
      })
      .catch((error) => {
        console.log(error.errors.message);
        setEdit(false);
        /* 
        handleButtonClick(); */
      });
    setEditID(null);
  };

  return (
    <div className="display-block">
      <h1>My To Do</h1>
      <ul className="display-block">
        {!edit &&
          toDoList.map((toDo) => {
            const isCompleted =
              completedIDs.some((data) => data._id === toDo._id) ||
              (toDo.completed &&
                toDoList.some((data) => data._id === toDo._id));

            const completedItemClassName =
              isCompleted && complete ? "line-through" : "initial";

            return (
              <li className="li" key={toDo._id}>
                <div className={`  style`}>
                  {isCompleted && (
                    <div
                      className={`completed-overlay  ${completedItemClassName}`}
                    >
                      <span className="completed-text">Completed</span>
                    </div>
                  )}

                  <div className="container">
                    <div className="flex-div ">
                      <span className="li-to-do">TO DO</span>
                      <span className="li-to-do-name">{toDo.title}</span>
                    </div>
                    <div className="flex-div">
                      <span className="li-description">DESCRIPTION</span>
                      <span className="to-do li-description-name">
                        {toDo.description}
                      </span>
                    </div>
                    <div className="flex-div">
                      <span className="li-time">TIME</span>
                      <span className="to-do li-time-name">{toDo.time}</span>
                    </div>
                    <div className="flex-div margin-bottom">
                      <span className="li-date">DATE</span>
                      <span className="to-do li-date-name">{toDo.date}</span>
                    </div>
                  </div>

                  <div className="margin-top">
                    <button
                      className="button-delete"
                      onClick={() => handleDelete(toDo._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="button-completed"
                      onClick={(e) => handleComplete(toDo._id, e)}
                    >
                      {isCompleted ? "Incomplete" : "Complete"}
                    </button>
                    <button
                      className="button-edit"
                      onClick={() => {
                        setEditID(toDo._id);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        {edit && editID && (
          <div className="edit" key={editID}>
            <div className="edit-container">
              <div className="edit-container-header">
                <h1>Edit To Do</h1>
              </div>
              <div className="edit-container-body">
                <div className="edit-container-body-input">
                  <label htmlFor="title">To Do</label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="edit-container-body-input">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="edit-container-body-input">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                <div className="edit-container-body-input">
                  <label htmlFor="date">Date</label>
                  <input
                    type="text"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="edit-container-footer">
                <button
                  className="button-save"
                  onClick={() => handleInputChange()}
                >
                  Save
                </button>
                <button
                  className="button-cancel"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {!edit && toDoList.length === 0 && (
          <div className="no-to-do">No To Do</div>
        )}
        {/*  {errorMessage && <div>{errorMessage}</div>} */}
      </ul>
    </div>
  );
};

export default DisplayToDos;
