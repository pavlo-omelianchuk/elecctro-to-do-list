import React, { useLayoutEffect, useRef } from "react";
import { useUsersData } from "../../utils/todoListContext.js";
import { useNavigate } from "react-router-dom";

//components
import Button from "../Button/Button";
import InputForm from "./InputForm";
import Todos from "./Todos";

export default function TodoList() {
  let { usersData, updateUsersData, currentUser } = useUsersData();
  const firstRender = useRef(true);

  let navigate = useNavigate();
  return (
    <>
      <Button
        action="Logout"
        type="button"
        onClickAction={() => {
          updateUsersData(
            "manageLogin",
            currentUser?.id,
            currentUser?.userName,
            currentUser?.email,
            currentUser?.pass,
            false
          );
          navigate("/login");
        }}
      />
      <InputForm />
      <Todos />
    </>
  );
}
