import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../utils/useContext.js";

import Button from "../Button/Button";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [error, setError] = useState(false);

  let { usersData, updateUsersData } = useUsersData();

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usersData?.length > 0) {
      console.log(usersData);
      console.log("first");
      usersData.map((user) => {
        if (user?.email === email && user?.pass === pass) {
          setErrorMessageContent("User already exist");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 2000);
          return user;
        } else {
          updateUsersData(
            "addNewUser",
            usersData.length,
            name,
            email,
            pass,
            true
          );
          navigate("/");
          return user;
        }
      });
    } else if (!usersData?.length) {
      if (name === "" || email === "" || pass === "") {
        setError(true);
        setErrorMessageContent("Please Fill Up all necessary Fields");
        setTimeout(() => {
          setError(false);
        }, 2000);
      } else {
        updateUsersData("addNewUser", 0, name, email, pass, true);
        navigate("/");
      }
    } else {
      setError(true);
      setErrorMessageContent("Something went wrong");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  };

  const ErrorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <span>{errorMessageContent}</span>
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
        <div className="messages">
          <ErrorMessage />
        </div>
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
