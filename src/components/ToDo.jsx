import React, { useState } from "react";
import { useToDoListUpdate } from "../utils/toDoListContext";

import InputForm from "./InputForm";

const ToDo = ({ item }) => {
  const toDoListUpdate = useToDoListUpdate();
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => {
    setIsEditing(!isEditing);
  };
  const handleDelete = (id) => {
    toDoListUpdate("delete", id);
  };
  const handleIsComplited = (id) => {
    toDoListUpdate("isComplited", id);
  };

  return (
    <li id={`todo-${item.id}`} className="to_do_item fade_in_down">
      <div className="check_task_content">
        <input
          name="isCompleted"
          type="checkbox"
          checked={item.isCompleted ?? false}
          onChange={() => handleIsComplited(item.id)}
        />{" "}
        {!isEditing && <span>{item.content}</span>}
        {isEditing && (
          <InputForm
            action="updateForm"
            content={item.content}
            id={item.id}
            toggleIsEditing={toggleIsEditing}
          />
        )}
      </div>
      <div className="manage_buttons">
        <span onClick={toggleIsEditing}>{!isEditing ? "Edit" : "Cancel"}</span>
        {" / "}
        <span onClick={() => handleDelete(item.id)}>Delete</span>
      </div>
    </li>
  );
};

export default ToDo;
