import './Task.scss';
import { useState } from 'react';
import calendarIcon from './calendar-icon.png';
import arrowIcon from './down-arrow.png';
import { saveToLocalStorage } from '../../utils/localStorageMethods';

function Task(props) {
  const { isTemplate, onClick } = props;

  const [inputStateValue, setInputStateValue] = useState('');

  function handleInput(event) {
    const { value } = event.target;
    const myRegexp = /(.*)(\/\/)(.*)/;
    const matchResult = myRegexp.exec(value);
    let task = null;
    let commentMark = null;
    let commentValue = null;
    if (matchResult) {
      task = matchResult[1];
      commentMark = matchResult[2];
      commentValue = matchResult[3];
    }
    if (commentMark) {
      setInputStateValue(`${task} COMMENT ${commentValue}`);
      console.log('inputStateValue', inputStateValue);
    // } else {
    //   setInputStateValue(value);
    }
  }

  function handleFieldChange(event) {
    setInputStateValue(event.target.value);
  }

  return (
    <li className={`task${isTemplate ? " task_type_template" : ""}`}>
      {isTemplate ? (
        <button
          type="button"
          className="task__add-task-button"
          onClick={onClick}
        >
          Write a new task
        </button>
      ) : (
        <form className="task__form">
          <label className="task__checkbox">
            <input type="checkbox" className="task__checkbox-proper" />
            <span className="task__checkbox-pseudo"></span>
          </label>

          <input
            type="text"
            className="task__text-field task__text-field_type_task-name"
            placeholder="Write a new task"
            value={inputStateValue}
            onChange={handleFieldChange}
            onInput={handleInput}
          />

          <button type="button" className="task__calendar-widget-opener">
            <img src={calendarIcon} alt="Значок календаря" />
          </button>

          <label className="task__dropdown">
            <span className="task__list-color"></span>
            <input
              type="text"
              className="task__text-field task__text-field_type_list-name"
              placeholder="No list"
            ></input>
            <img
              className="task__dropdown-arrow"
              src={arrowIcon}
              alt="Стрелка раскрытия списка"
            />
          </label>
        </form>
      )}
    </li>
  );
}

export default Task;
