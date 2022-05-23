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
    if (action === "addNewItem") {
      const newItem = {
        id: id,
        content: content,
        isCompleated: isCompleated,
        timestamp: timestamp,
      };
      console.log(newItem);
      // const newToDoList = toDoList.push(newItem);
      console.log(toDoList);
      // console.log(newToDoList);
      setToDoList([
        ...toDoList,
        {
          id: id,
          content: content,
          isCompleated: isCompleated,
          timestamp: timestamp,
        },
      ]);
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
