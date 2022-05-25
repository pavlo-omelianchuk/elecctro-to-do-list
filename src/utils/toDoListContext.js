import React, { useContext, useState, useEffect } from "react";
import {
  syncFromLocalStorage,
  addToLocalStorage,
  updateToLocalStorage,
} from "./localStorage";

const ToDoListContext = React.createContext();
const ToDoListUpdateContext = React.createContext();

export function useToDoList() {
  return useContext(ToDoListContext);
}
export function useToDoListUpdate() {
  return useContext(ToDoListUpdateContext);
}

export function ToDoListProvider({ children }) {
  const [toDoList, setToDoList] = useState([
    {
      id: 1,
      content: "Task One",
      isCompleted: false,
      timestamp: 1653319443817,
    },
    {
      id: 2,
      content: "Task Two",
      isCompleted: false,
      timestamp: 1653319443817,
    },
  ]);

  useEffect(() => {
    setToDoList(syncFromLocalStorage());
  }, []);

  function updateToDoList(action, id, content, isCompleted, timestamp) {
    let newToDoList;

    switch (action) {
      case "addNewTask":
        const newItem = {
          id,
          content,
          isCompleted,
          timestamp,
        };
        setToDoList([...toDoList, newItem]);
        addToLocalStorage(id, content, isCompleted, timestamp);
        break;

      case "update":
        newToDoList = toDoList.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              content: content,
            };
          }
          return task;
        });
        setToDoList(newToDoList);
        updateToLocalStorage(newToDoList);
        break;

      case "isComplited":
        newToDoList = toDoList.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }
          return task;
        });
        setToDoList(newToDoList);
        updateToLocalStorage(newToDoList);
        break;

      case "delete":
        const remainingToDos = toDoList.filter((task) => {
          return id !== task.id;
        });
        newToDoList = remainingToDos.map((task, index) => {
          return {
            ...task,
            id: index,
          };
        });
        setToDoList(newToDoList);
        updateToLocalStorage(newToDoList);
        break;

      default:
        break;
    }
  }
  return (
    <ToDoListContext.Provider value={toDoList}>
      <ToDoListUpdateContext.Provider value={updateToDoList}>
        {children}
      </ToDoListUpdateContext.Provider>
    </ToDoListContext.Provider>
  );
}
