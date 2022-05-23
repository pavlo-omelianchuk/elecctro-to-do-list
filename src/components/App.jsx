import React from "react";
import { ToDoListProvider } from "../utils/toDoListContext";

import "../styles/App.scss";
import InputForm from "./InputForm";
import ToDoList from "./ToDoList";

function App() {
  return (
    <ToDoListProvider>
      <div className="app">
        <InputForm />
        <ToDoList />
      </div>
    </ToDoListProvider>
  );
}

export default App;
