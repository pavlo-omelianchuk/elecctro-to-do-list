import React, { useState } from "react";
import { useToDoList } from "../utils/toDoListContext";

import ToDo from "./ToDo";

const ToDoList = () => {
  const [sortType, setSortType] = useState("timestamp");
  const [isComleatedHidden, setIsComleatedHidden] = useState(false);

  let toDoList = useToDoList();

  toDoList = !isComleatedHidden
    ? toDoList
    : toDoList.filter((item) => !item.isCompleted);

  const handleHideCompleted = () => {
    setIsComleatedHidden(!isComleatedHidden);
  };

  const sortByAToZ = (toDoList) => {
    return toDoList.sort((a, b) => a.content.localeCompare(b.content));
  };
  const sortByZToA = (toDoList) => {
    return toDoList.sort((a, b) => b.content.localeCompare(a.content));
  };
  const sortByTimestamp = (toDoList) => {
    return toDoList.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  };
  const sortManager = {
    timestamp: sortByTimestamp,
    "a-z": sortByAToZ,
    "z-a": sortByZToA,
  };

  const handleSort = () => {
    let sortKeys = Object.keys(sortManager);
    const currentIndex = sortKeys.indexOf(sortType);

    const nextIndex = currentIndex + 1;

    setSortType(sortKeys[nextIndex >= sortKeys.length ? 0 : nextIndex]);
  };

  return (
    <>
      <div className="tasks_list_title" onClick={handleSort}>
        Tasks
        <span className="sorted_by">
          Sorted by {": "}
          {sortType}
        </span>
      </div>
      <ul className="tasks_list_wrapper">
        {toDoList[0] ? (
          sortManager[sortType](toDoList).map((item, index) => (
            <ToDo item={item} key={index} />
          ))
        ) : (
          <p className="no_todos">No tasks :( Create one!</p>
        )}
      </ul>
      {toDoList[0] && (
        <div className="hide_completed">
          Hide completed{" "}
          <input
            name="hideCompleted"
            type="checkbox"
            checked={isComleatedHidden}
            onChange={handleHideCompleted}
          />
        </div>
      )}
    </>
  );
};

export default ToDoList;
