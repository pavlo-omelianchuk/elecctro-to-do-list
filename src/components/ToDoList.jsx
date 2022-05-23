import React from "react";
import { useToDoList } from "../utils/toDoListContext";

import ToDo from "./ToDo";

const ToDoList = () => {
  const toDoList = useToDoList();
  console.log(toDoList);

  return (
    <div className="tasks_wrapper">
      <div className="tasks_list_title">Tasks</div>
      <ul>
        {toDoList.map((item, index) => (
          <ToDo item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
