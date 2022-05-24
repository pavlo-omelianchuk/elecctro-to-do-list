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
    if (action === "addNewToDo") {
      const newItem = {
        id,
        content,
        isCompleted,
        timestamp,
      };
      setToDoList([...toDoList, newItem]);
      addToLocalStorage(id, content, isCompleted, timestamp);
    } else if (action === "update") {
      const newToDoList = toDoList.map((toDo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            content: content,
          };
        }
        return toDo;
      });
      setToDoList(newToDoList);
      updateToLocalStorage(newToDoList);
    } else if (action === "isComplited") {
      const newToDoList = toDoList.map((toDo) => {
        if (toDo.id === id) {
          return {
            ...toDo,
            isCompleted: !toDo.isCompleted,
          };
        }
        return toDo;
      });
      setToDoList(newToDoList);
      updateToLocalStorage(newToDoList);
    } else if (action === "delete") {
      const remainingToDos = toDoList.filter((toDo) => {
        return id !== toDo.id;
      });
      const newToDoList = remainingToDos.map((toDo, index) => {
        return {
          ...toDo,
          id: index,
        };
      });
      console.log(remainingToDos);
      setToDoList(newToDoList);
      updateToLocalStorage(newToDoList);
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
