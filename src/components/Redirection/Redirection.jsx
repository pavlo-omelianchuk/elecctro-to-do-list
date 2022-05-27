import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUsersData } from "../../utils/todoListContext.js";

const Redirection = ({ children }) => {
  let { currentUser } = useUsersData();
  let isLoggedIn;
  if (currentUser === undefined) {
    isLoggedIn = true;
  } else {
    isLoggedIn = currentUser.isLoggedIn;
  }

  return currentUser
    ? children
    : // <Navigate to="/login" replace />
      children;
};
export default Redirection;
