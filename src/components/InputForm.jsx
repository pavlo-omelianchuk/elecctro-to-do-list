import React, { useState, useEffect } from "react";
import { useToDoList, useToDoListUpdate } from "../utils/toDoListContext";

const InputForm = ({ action, content, id, toggleIsEditing }) => {
  const [taskInputValue, setTaskInputValue] = useState("");

  useEffect(() => {
    if (action === "updateForm") {
      setTaskInputValue(content);
    }
  }, [action, content]);

  const toDoList = useToDoList();
  const toDoListUpdate = useToDoListUpdate();

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
      <button type="submit">
        {action === "updateForm" ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default InputForm;
