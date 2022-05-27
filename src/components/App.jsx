import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.scss";

//components
import Main from "./TodoListApp/TodoListApp";
import Login from "./Authentication/Login";
import Authorization from "./Authentication/Authorization";
import Redirection from "./Redirection/Redirection";

function AppRouter() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Authorization />} />
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <Redirection >
              <Main />
            </Redirection>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
