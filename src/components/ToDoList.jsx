import React from "react";
import { useToDoList } from "../utils/toDoListContext";

import ToDo from "./ToDo";

const ToDoList = () => {
  const toDoList = useToDoList();
  console.log(toDoList);

  return (
    <>
      <div className="tasks_list_title">Tasks</div>
      <ul className="tasks_list_wrapper">
        {toDoList[0] ? (
          toDoList.map((item, index) => <ToDo item={item} key={index} />)
        ) : (
          <p className="no_todos">No tasks, create one!</p>
        )}
      </ul>
    </>
  );
};

export default ToDoList;
