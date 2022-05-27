import React, { useState } from "react";
import { useTodoList } from "../../utils/todoListContext.js";

import Todo from "./Todo";

const TodoList = () => {
  const [sortType, setSortType] = useState("timestamp");
  const [isComleatedHidden, setIsComleatedHidden] = useState(false);

  let todoList = useTodoList();

  todoList = !isComleatedHidden
    ? todoList
    : todoList.filter((item) => !item.isCompleted);

  const handleHideCompleted = () => {
    setIsComleatedHidden(!isComleatedHidden);
  };

  const sortByAToZ = (todoList) => {
    return todoList.sort((a, b) => a.content.localeCompare(b.content));
  };
  const sortByZToA = (todoList) => {
    return todoList.sort((a, b) => b.content.localeCompare(a.content));
  };
  const sortByTimestamp = (todoList) => {
    return todoList.sort(
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
        {todoList?.length !== 0 ? (
          sortManager[sortType](todoList).map((item, index) => (
            <Todo item={item} key={index} />
          ))
        ) : (
          <p className="no_todos">No tasks :( Create one!</p>
        )}
      </ul>
      {todoList?.length !== 0 && (
        <div className="hide_completed">
          {isComleatedHidden ? "Show completed" : "Hide completed"}
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

export default TodoList;
