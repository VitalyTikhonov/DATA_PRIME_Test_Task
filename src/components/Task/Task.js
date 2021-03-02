import "./Task.scss";
import { useState, useRef } from "react";
import calendarIcon from "./calendar-icon.png";
import arrowIcon from "./down-arrow.png";
import { saveToLocalStorage } from "../../utils/localStorageMethods";

function Task(props) {
  const { isTemplate, onClick } = props;

  const [taskNameInputValue, setTaskNameInputValue] = useState("");
  const [commentInputValue, setCommentInputValue] = useState("");

  const textFieldWrapperRef = useRef();
  const commentFieldRef = useRef();

  function handleTaskCommentFieldChange(event) {
    const { value } = event.target;
    setCommentInputValue(value);
  }

  function handleTaskNameFieldChange(event) {
    const { value } = event.target;
    const valueNormalized = value.replace(/\s+/g, ' ');
    const myRegexp = /(.*?)(\/\/) ?(.*)/;
    let matchResult = myRegexp.exec(valueNormalized);
    let task = null;
    let commentMark = null;
    let commentValue = null;
    if (matchResult) {
      task = matchResult[1];
      commentMark = matchResult[2];
      commentValue = matchResult[3];
    }
    if (commentMark) {
      commentFieldRef.current.focus();
      setTaskNameInputValue(task + commentMark);
      setCommentInputValue(commentValue);
    }
    setTaskNameInputValue(valueNormalized);
  }

  /* для вставки в спаны-подложки значений, точно задающих ширину */
  function replaceSpacesWithUnderscores(string) {
    return string.replace(/\s+/g, '_');
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

          <label className="task__field" ref={textFieldWrapperRef}>
            <div className="task__field-width-assembly">
              <span class="task__field-width-machine" aria-hidden="true">
                {taskNameInputValue ? replaceSpacesWithUnderscores(taskNameInputValue) : "Write a new task"}
              </span>

              <input
                type="text"
                className="task__field-proper task__field-proper_type_task task__field-proper_type_task-name"
                placeholder="Write a new task"
                value={taskNameInputValue}
                onChange={handleTaskNameFieldChange}
              />
            </div>

            <div className="task__field-width-assembly">
              <span class="task__field-width-machine" aria-hidden="true">
                {replaceSpacesWithUnderscores(commentInputValue)}
              </span>

              <input
                type="text"
                className="task__field-proper task__field-proper_type_task task__field-proper_type_task-comment"
                ref={commentFieldRef}
                value={commentInputValue}
                onChange={handleTaskCommentFieldChange}
              />
            </div>
          </label>

          <button type="button" className="task__calendar-widget-opener">
            <img src={calendarIcon} alt="Значок календаря" />
          </button>

          <label className="task__dropdown">
            <span className="task__list-color"></span>
            <input
              type="text"
              className="task__field-proper task__field-proper_type_list-name"
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
