/* eslint-disable react/jsx-no-comment-textnodes */
import "./Task.scss";
import { useState, useRef } from "react";
import calendarIcon from "./calendar-icon.png";
import arrowIcon from "./down-arrow.png";
// import { saveToLocalStorage } from "../../utils/localStorageMethods";

function Task(props) {
  const { isTemplate, onClick } = props;

  const [taskNameInputValue, setTaskNameInputValue] = useState("");
  const [commentInputValue, setCommentInputValue] = useState("");

  const [taskNameSpanValue, setTaskNameSpanValue] = useState("");
  const [commentSpanValue, setCommentSpanValue] = useState("");

  const [showSlashSeparator, setShowSlashSeparator] = useState(false);

  const textFieldWrapperRef = useRef();
  const commentFieldRef = useRef();

  function parseInputValue(value) {
    const myRegexp = /(.*?)(\/\/) ?.*/;
    let matchResult = myRegexp.exec(value);
    return matchResult
    /* Здесь не должно быть trim(), иначе невозможно ввести в поле пробел */
      ? {
          task: matchResult[1],
          commentMark: matchResult[2],
          // commentValue: matchResult[3],
        }
      : {
          task: value,
        };
  }

  /* для вставки в спаны-подложки значений, точно задающих ширину */
  function replaceSpaces(string) {
    return string.replace(/\s+/g, "-");
  }

  function normalizeTaskFieldOnBlur(event) {
    const { value, name } = event.target;

    // const valueNormalized = value.trim();
    /* бесполезно, так как на момент blur в стейте поля еще не успевает обновиться значение =>
    оно там по-прежнему со слешами, а не пробелом, в конце =>
    в case "taskNameInput" в функцию parseInputValue передается значение со слешами, и она отрабатывает
    по первому сценарию (matchResult === true), то есть просто отрезает слеши,
    а trim она содержать не может, иначе невозможно ввести в поле пробел. */

    switch (name) {
      case "taskNameInput":
        const task = parseInputValue(value).task.trim();
        setTaskNameInputValue(task);
        setTaskNameInputValue(task);
        break;
      case "commentInput":
        setCommentInputValue(value.trim());
        break;
      default:
    }
  }

  function handleTaskNameFieldChange(event) {
    const { value } = event.target;
    const valueNormalized = value.replace(/\s+/g, " ");
    const { task, commentMark } = parseInputValue(
      valueNormalized
    );

    setTaskNameSpanValue(replaceSpaces(task));
    setTaskNameInputValue(task);

    if (commentMark) {
      setShowSlashSeparator(true);

      setCommentSpanValue(".");
      commentFieldRef.current.focus();
    }
  }

  function handleTaskCommentFieldChange(event) {
    const { value } = event.target;
    setCommentSpanValue(replaceSpaces(value));
    setCommentInputValue(value);
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
              <span className="task__field-width-machine" aria-hidden="true">
                {taskNameSpanValue ? taskNameSpanValue : "Write a new task"}
              </span>

              <input
                name="taskNameInput"
                type="text"
                className="task__field-proper task__field-proper_type_task task__field-proper_type_task-name"
                placeholder="Write a new task"
                value={taskNameInputValue}
                onChange={handleTaskNameFieldChange}
                onBlur={normalizeTaskFieldOnBlur}
                autoFocus
              />
            </div>

            {showSlashSeparator && (
              <span className="task__field-slash-separator">
                &nbsp;//&nbsp;
              </span>
            )}

            <div className="task__field-width-assembly">
              <span className="task__field-width-machine" aria-hidden="true">
                {commentSpanValue ? commentSpanValue : ""}
              </span>

              <input
                name="commentInput"
                type="text"
                className="task__field-proper task__field-proper_type_task task__field-proper_type_task-comment"
                ref={commentFieldRef}
                value={commentInputValue}
                onChange={handleTaskCommentFieldChange}
                onBlur={normalizeTaskFieldOnBlur}
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
