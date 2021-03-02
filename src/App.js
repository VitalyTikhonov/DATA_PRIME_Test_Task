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

/* КОММЕНТАРИИ
Использовано одно из решений, описанных здесь https://css-tricks.com/auto-growing-inputs-textareas/,
а именно https://codepen.io/chriscoyier/pen/XWbqpzP, так как оно представилось наиболее оптимальным
из всего, что удалось придумать и найти.
В нем при вводе текста он попадает в загороженный инпутом спан, который автоматически ресайзится.
Однако при этом не учитывалась длина пробелов - реализовал у себя их подмену на подчеркивания
конкретно для этого спана.

*/
