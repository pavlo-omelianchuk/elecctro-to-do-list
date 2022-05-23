import React, { useState } from "react";

const InputForm = () => {
  const [taskInputValue, setTaskInputValue] = useState("");

  const handleSubmit = () => {};
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
