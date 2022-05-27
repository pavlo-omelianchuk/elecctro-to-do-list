import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUsersData } from "../../utils/todoListContext.js";

const Redirection = ({ children }) => {
  let { usersData, currentUser } = useUsersData();

  console.log(currentUser[0]?.isLoggedIn);

  return currentUser[0]?.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
export default Redirection;
