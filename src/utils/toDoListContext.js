import React, { useContext, useState } from "react";

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

  function updateToDoList(action, id, content, isCompleated, timestamp) {
    if (action === "addNewItem") {
      const newItem = {
        id,
        content,
        isCompleated,
        timestamp,
      };
      setToDoList([...toDoList, newItem]);
    }
    if (action === "update") {
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
    }
    if (action === "isComplited") {
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
    }
    if (action === "delete") {
      const remainingTasks = toDoList.filter((task) => {
        return id !== task.id;
      });
      setToDoList(remainingTasks);
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
