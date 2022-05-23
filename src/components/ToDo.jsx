import React from "react";
import { useToDoListUpdate } from "../utils/toDoListContext";

const ToDo = ({ item }) => {
  const toDoListUpdate = useToDoListUpdate();

  return (
    <li id={`todo-${item.id}`} className="to_do_item">
      <input
        name="isCompleted"
        type="checkbox"
        checked={item.isCompleted ?? false}
        onChange={() => toDoListUpdate("isComplited", item.id)}
      />{" "}
      <span>{item.content}</span>
    </li>
  );
};

export default ToDo;
