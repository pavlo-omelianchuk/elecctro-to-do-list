import React, { useState, useEffect } from "react";
import { useTodoList, useTodoListUpdate } from "../../utils/useContext.js";
import Button from "../Button/Button";

const InputForm = ({ action, content, id, toggleIsEditing }) => {
  const [taskInputValue, setTaskInputValue] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (action === "updateForm") {
      setTaskInputValue(content);
    }
  }, [action, content]);

  const toDoList = useTodoList();
  const toDoListUpdate = useTodoListUpdate();

  const tasksLength = toDoList?.length || 0;

  const ErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <span>{errorMessageContent} </span>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskInputValue === "") {
      setError(true);
      setErrorMessageContent("Please wright something!");

      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    if (action === "updateForm") {
      toDoListUpdate("update", id, taskInputValue);
      toggleIsEditing();
    } else {
      toDoListUpdate(
        "addNewTask",
        tasksLength,
        taskInputValue,
        false,
        Date.now()
      );
    }
    setTaskInputValue("");
  };
  const handleChange = (event) => {
    setTaskInputValue(event.target.value);
  };
  return (
    <form className="input_form" onSubmit={handleSubmit}>
      <div className="messages">
        <ErrorMessage />
      </div>
      <input
        type="text"
        placeholder={
          action === "updateForm" ? content : "Write new task here ..."
        }
        value={taskInputValue}
        onChange={handleChange}
      />
      <Button action={action} type="submit" />
    </form>
  );
};

export default InputForm;
