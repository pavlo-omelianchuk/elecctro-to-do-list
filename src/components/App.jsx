import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUsersData } from "../utils/todoListContext";
import "../styles/App.scss";

//components
import Main from "./TodoListApp/TodoListApp";
import Login from "./Authentication/Login";
import Redirection from "./Redirection/Redirection";

function AppRouter() {
  let { usersData } = useUsersData();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <Redirection isLoggedIn={usersData[0]?.isLoggedIn}>
              <Main />
            </Redirection>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
