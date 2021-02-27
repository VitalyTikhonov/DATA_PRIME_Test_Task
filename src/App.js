import "./App.scss";
import { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./utils/localStorageMethods";
import Task from "./components/Task/Task";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasks = getFromLocalStorage("tasks");
    if (tasks) setTasks(tasks);
  }, []);

  function addBlankTaskHandler() {
    setTasks([...tasks, <Task />]);
  }

  return (
    <div className="app">
      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} />
        ))}
        <Task
          key={tasks.length + 1}
          isTemplate={true}
          onClick={addBlankTaskHandler}
        />
      </ul>
    </div>
  );
}

export default App;
