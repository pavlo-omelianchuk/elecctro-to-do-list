import React, { useRef } from "react";
import { useUsersData } from "../../utils/todoListContext.js";
import { useNavigate } from "react-router-dom";

//components
import Button from "../Button/Button";
import InputForm from "./InputForm";
import Todos from "./Todos";

export default function TodoList() {
  let { updateUsersData, currentUser } = useUsersData();
  console.log("first");
  let navigate = useNavigate();
  return (
    <>
      {!currentUser ? (
        <Button
          action="Login"
          type="button"
          onClickAction={() => {
            navigate("/login");
          }}
        />
      ) : (
        <Button
          action="Logout"
          type="button"
          onClickAction={() => {
            updateUsersData(
              "logout",
              currentUser?.id,
              currentUser?.userName,
              currentUser?.email,
              currentUser?.pass,
              false
            );
            navigate("/login");
          }}
        />
      )}

      <InputForm />
      <Todos />
    </>
  );
}
