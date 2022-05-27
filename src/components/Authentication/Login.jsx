import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../utils/todoListContext";

import Button from "../Button/Button";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  let { usersData, setUsersData } = useUsersData();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    usersData.map((user) => {
      if (user.email === email && user.pass === pass) {
        let updateUsers = usersData.map((user) => {
          return {
            ...user,
            isLoggedIn: true,
          };
        });
        setUsersData(updateUsers);
        navigate("/");
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
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
        <span>User does not exist</span>
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
      <h1>Login Page</h1>
      <form className="login_form" onSubmit={handleSubmit}>
        <div className="messages">{errorMessage()}</div>
        <div>Login</div>
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
        <Button action="Login" type="submit" />
        <span>
          Doesn't registered?{" "}
          <span className="navigate_to" onClick={() => {}}>
            SignUp
          </span>{" "}
        </span>
      </form>
    </div>
  );
}
