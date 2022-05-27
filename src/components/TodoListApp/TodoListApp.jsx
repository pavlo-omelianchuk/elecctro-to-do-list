import React from "react";
import { useUsersData } from "../../utils/todoListContext";
import { useNavigate } from "react-router-dom";

//components
import Button from "../Button/Button";
import InputForm from "./InputForm";
import Todos from "./Todos";

export default function TodoList() {
  let { usersData, updateUsersData } = useUsersData();
  let navigate = useNavigate();

  return (
    <>
      <Button
        action="Logout"
        type="button"
        onClickAction={() => {
          let updateUsers = usersData.map((user) => {
            return {
              ...user,
              isLoggedIn: false,
            };
          });
          updateUsersData(updateUsers);
          navigate("/login");
        }}
      />
      <InputForm />
      <Todos />
    </>
  );
}
