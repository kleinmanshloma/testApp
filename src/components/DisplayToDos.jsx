import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "./DisplayToDos.css";

const DisplayToDos = () => {
  const [toDoList, setToDoList] = useState([]);
  const [completedIDs, setCompletedIDs] = useState([]);
  const [complete, setComplete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  /* const handleComplete = (id, e) => {
    console.log(id);

    let completeChecked = false;

    if (completedIDs.some((data) => data._id === id)) {
      setCompletedIDs(completedIDs.filter((data) => data._id !== id));
      console.log(completedIDs.filter((data) => data._id !== id));
    } else {
      setCompletedIDs([...completedIDs, { _id: id }]);
      console.log([...completedIDs, { _id: id }]);
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
  }; */

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

  /*   const handleInputChange = (id) => {
    setEdit(true);
    console.log(id);
    const url = `http://localhost:4000/task/${id}`;
    const method = "PATCH";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: name,
        description: description,
        time: time,
        date: date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setToDoList(toDoList.filter((toDo) => toDo._id !== id));
        setToDoList([...toDoList, data]);
        setEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <div className="display-block">
      <h1>My To Do</h1>
      <ul className="display-block">
        {toDoList.map((toDo) => {
          const isCompleted =
            completedIDs.some((data) => data._id === toDo._id) ||
            (toDo.completed && toDoList.some((data) => data._id === toDo._id));

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
                    <span className="li-to-do-name">{toDo.toDo}</span>
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
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
  /*  return (
    <div>
      <h1>My To Do</h1>
      <ul>
        {toDoList.map((toDo) => {
          const isCompleted =
            // check if the completedIDs array contains the current toDo._id if it does then set isCompleted to true
            completedIDs.some((data) => data._id === toDo._id) ||
            // or check if the toDoList array contains the current toDo._id and the toDo.completed is true
            (toDo.completed && toDoList.some((data) => data._id === toDo._id));

          const completedItemClassName =
            isCompleted && complete ? "line-through" : "initial";

          return (
            <div>
              <ul>
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
                        <input
                          type="text"
                          className="li-to-do-name"
                          value={toDo.toDo}
                          onChange={(e) =>
                            handleInputChange(e, toDo._id, "title")
                          }
                        />
                      </div>
                      <div className="flex-div">
                        <span className="li-description">DESCRIPTION</span>
                        <input
                          type="text"
                          className="to-do li-description-name"
                          value={toDo.description}
                          onChange={(e) =>
                            handleInputChange(e, toDo._id, "description")
                          }
                        />
                      </div>
                      <div className="flex-div">
                        <span className="li-time">TIME</span>
                        <input
                          type="text"
                          className="to-do li-time-name"
                          value={toDo.time}
                          onChange={(e) =>
                            handleInputChange(e, toDo._id, "time")
                          }
                        />
                      </div>
                      <div className="flex-div margin-bottom">
                        <span className="li-date">DATE</span>
                        <input
                          type="text"
                          className="to-do li-date-name"
                          value={toDo.date}
                          onChange={(e) =>
                            handleInputChange(e, toDo._id, "date")
                          }
                        />
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
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </ul>
    </div>
  ); */
};

export default DisplayToDos;
