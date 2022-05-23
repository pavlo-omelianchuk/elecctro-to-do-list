import React, { useState } from "react";
import { useToDoList, useToDoListUpdate } from "../utils/toDoListContext";

const InputForm = () => {
  const [taskInputValue, setTaskInputValue] = useState("");

  const toDoList = useToDoList();
  const toDoListUpdate = useToDoListUpdate();

  const handleSubmit = (event) => {
    toDoListUpdate(
      "addNewItem",
      toDoList.length + 1,
      taskInputValue,
      false,
      Date.now()
    );
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
        placeholder="Write new task here"
        value={taskInputValue}
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default InputForm;
