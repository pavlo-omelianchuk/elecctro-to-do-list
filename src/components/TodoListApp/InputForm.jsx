import React, { useState, useEffect } from "react";
import { useTodoList, useTodoListUpdate } from "../../utils/todoListContext";
import Button from "../Button/Button";

const InputForm = ({ action, content, id, toggleIsEditing }) => {
  const [taskInputValue, setTaskInputValue] = useState("");

  useEffect(() => {
    if (action === "updateForm") {
      setTaskInputValue(content);
    }
  }, [action, content]);

  const toDoList = useTodoList();
  const toDoListUpdate = useTodoListUpdate();

  const handleSubmit = (event) => {
    if (action === "updateForm") {
      toDoListUpdate("update", id, taskInputValue);
      toggleIsEditing();
    } else {
      toDoListUpdate(
        "addNewTask",
        toDoList.length,
        taskInputValue,
        false,
        Date.now()
      );
    }
    event.preventDefault();
    setTaskInputValue("");
  };
  const handleChange = (event) => {
    setTaskInputValue(event.target.value);
  };
  return (
    <form className="input_form" onSubmit={handleSubmit}>
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
