import React, { createContext, useContext, useState, useEffect } from "react";
import {
  syncFromLocalStorage,
  addToLocalStorage,
  updateToLocalStorage,
} from "./localStorage";

const TodoListContext = createContext();
const TodoListUpdateContext = createContext();
const UsersData = createContext();

export function useTodoList() {
  return useContext(TodoListContext);
}
export function useTodoListUpdate() {
  return useContext(TodoListUpdateContext);
}
export function useUsersData() {
  return useContext(UsersData);
}

export function TodoListProvider({ children }) {
  const [toDoList, setTodoList] = useState([
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

  const [usersData, setUsersData] = useState([
    {
      id: 1,
      userName: "John Doe",
      email: "john@mail.com",
      pass: "123123123",
      isLoggedIn: false,
    },
  ]);

  useEffect(() => {
    setTodoList(syncFromLocalStorage("todoTasks"));
    setUsersData(syncFromLocalStorage("usersData"));
  }, []);

  function updateUsersData(action, id, userName, email, pass, isLoggedIn) {
    let newUsersData;

    switch (action) {
      case "addNewUser":
        const newUser = {
          id,
          userName,
          email,
          pass,
          isLoggedIn,
        };
        setUsersData([...usersData, newUser]);
        addToLocalStorage("usersData", newUser);
        console.log(newUser);
        break;

      case "updateData":
        newUsersData = usersData.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              userName: userName,
              email: email,
              pass: pass,
            };
          }
          return user;
        });
        setUsersData(newUsersData);
        updateToLocalStorage("usersData", newUsersData);
        break;

      // case "isCompleted":
      //   newUsersData = usersData.map((user) => {
      //     if (user.id === id) {
      //       return {
      //         ...user,
      //         isCompleted: !user.isCompleted,
      //       };
      //     }
      //     return user;
      //   });
      //   setTodoList(newUsersData);
      //   updateToLocalStorage(newUsersData);
      //   break;

      // case "delete":
      //   const remainingTodos = usersData.filter((user) => {
      //     return id !== user.id;
      //   });
      //   newUsersData = remainingTodos.map((user, index) => {
      //     return {
      //       ...user,
      //       id: index,
      //     };
      //   });
      //   setTodoList(newUsersData);
      //   updateToLocalStorage(newUsersData);
      //   break;

      default:
        break;
    }
  }

  function updateTodoList(action, id, content, isCompleted, timestamp) {
    let newTodoList;

    switch (action) {
      case "addNewTask":
        const newItem = {
          id,
          content,
          isCompleted,
          timestamp,
        };
        setTodoList([...toDoList, newItem]);
        addToLocalStorage("todoTasks", newItem);
        break;

      case "update":
        newTodoList = toDoList.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              content: content,
            };
          }
          return task;
        });
        setTodoList(newTodoList);
        updateToLocalStorage("todoTasks", newTodoList);
        break;

      case "isCompleted":
        newTodoList = toDoList.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              isCompleted: !task.isCompleted,
            };
          }
          return task;
        });
        setTodoList(newTodoList);
        updateToLocalStorage("todoTasks", newTodoList);
        break;

      case "delete":
        const remainingTodos = toDoList.filter((task) => {
          return id !== task.id;
        });
        newTodoList = remainingTodos.map((task, index) => {
          return {
            ...task,
            id: index,
          };
        });
        setTodoList(newTodoList);
        updateToLocalStorage("todoTasks", newTodoList);
        break;

      default:
        break;
    }
  }
  return (
    <TodoListContext.Provider value={toDoList}>
      <TodoListUpdateContext.Provider value={updateTodoList}>
        <UsersData.Provider value={{ usersData, updateUsersData }}>
          {children}
        </UsersData.Provider>
      </TodoListUpdateContext.Provider>
    </TodoListContext.Provider>
  );
}
