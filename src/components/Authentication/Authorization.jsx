import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../utils/todoListContext";
import { addToLocalStorage } from "../../utils/localStorage";

import Button from "../Button/Button";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  let { usersData, updateUsersData } = useUsersData();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    console.log("first");
    e.preventDefault();
    usersData = usersData[0] ? usersData : [{}];
    usersData.map((user) => {
      console.log("sec");
      const id = usersData.length + 1;
      if (user?.email === email && user?.pass === pass) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        updateUsersData(
          "addNewUser",
          usersData.length,
          name,
          email,
          pass,
          true
        );
        // setUsersData([...usersData, newUser]);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    });
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <span>User already exist</span>
      </div>
    );
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  return (
    <div className="login_form_wrapper">
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="messages">{errorMessage()}</div>
        <h3>SignUp Form</h3>
        <label>
          Name:
          <input
            type="name"
            name="userName"
            onChange={handleChangeName}
            value={name}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={handleChangeEmail}
            value={email}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            onChange={handleChangePass}
            value={pass}
          />
        </label>
        <Button action="SignUp" type="submit" />
        <span>
          Already registered?{" "}
          <span
            className="navigate_to"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>{" "}
        </span>
      </form>
    </div>
  );
}
