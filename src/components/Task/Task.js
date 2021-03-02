import "./Task.scss";
import { useState, useRef } from "react";
import calendarIcon from "./calendar-icon.png";
import arrowIcon from "./down-arrow.png";
import { saveToLocalStorage } from "../../utils/localStorageMethods";

function Task(props) {
  const { isTemplate, onClick } = props;

  const [inputStateValue, setInputStateValue] = useState("");
  const [commentInputAdded, setCommentInputAdded] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  const textFieldWrapperRef = useRef();
  const commentFieldRef = useRef();

  function handleFieldChange(event) {
    const { value } = event.target;
    // setInputStateValue(value);
    const myRegexp = /(.*?)(\/\/)(.*)/;
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
      if (!commentInputAdded) {
        commentFieldRef.current.focus();
      }
      setInputStateValue(task + commentMark);
      // setCommentInputValue(commentValue);
      // setInputStateValue(`${task} COMMENT ${commentValue}`);
    } else {
      setInputStateValue(value);
    }
    console.log("matchResult", matchResult);
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
            {/* реальная галка */}
            <input type="checkbox" className="task__checkbox-proper" />
            {/* кастомная галка */}
            <span className="task__checkbox-pseudo"></span>
          </label>

          <label className="task__text-field-wrapper" ref={textFieldWrapperRef}>
            <input
              type="text"
              className="task__text-field task__text-field_type_task-name"
              placeholder="Write a new task"
              value={inputStateValue}
              onChange={handleFieldChange}
              // onInput={handleInput}
            />
            <input
              type="text"
              className="task__text-field task__text-field_type_task-name"
              ref={commentFieldRef}
              value={commentInputValue}
            />
          </label>

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
