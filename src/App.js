import './App.scss';
import './components/Task/Task.scss';
import { useState, useEffect } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from './utils/localStorageMethods';
import Task from './components/Task/Task';
import calendarIcon from './components/Task/calendar-icon.png';
import arrowIcon from './components/Task/down-arrow.png';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasks = getFromLocalStorage('tasks');
    if (tasks) setTasks(tasks);
  }, []);

  return (
    <div className="app">
      <ul className="task-list">
        {tasks.map((task) => (
          <Task />
        ))}
        <li className="task task_type_template">
          <input type="text" className="task__text-field task__text-field_type_in-template" placeholder="Write a new task" disabled />
        </li>

        <li className="task">
          <form className="task__form">
            <label className="task__checkbox">
              <input type="checkbox" className="task__checkbox-proper" />
              <span className="task__checkbox-pseudo"></span>
            </label>

            <input type="text" className="task__text-field task__text-field_type_task-name" placeholder="Write a new task"></input>

            <button type="button" className="task__calendar-widget-opener">
              <img src={calendarIcon} alt="Значок календаря" />
            </button>

            <label className="task__dropdown">
              <span className="task__list-color"></span>
              <input type="text" className="task__text-field task__text-field_type_list-name" placeholder="No list"></input>
              <img className="task__dropdown-arrow" src={arrowIcon} alt="Стрелка раскрытия списка" />
            </label>
          </form>
        </li>
      </ul>
    </div>
  );
}

export default App;
