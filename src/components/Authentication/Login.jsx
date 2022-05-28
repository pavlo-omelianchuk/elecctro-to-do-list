import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersData } from "../../utils/useContext";

import Button from "../Button/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMessageContent, setErrorMessageContent] = useState("");
  const [error, setError] = useState(false);

  let { usersData, updateUsersData, currentUser } = useUsersData();

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/");
    }
  });

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usersData?.length > 0) {
      usersData.map((user) => {
        if (user.email === email && user.pass === pass) {
          console.log("user");
          updateUsersData("login", user.id);
          navigate("/");
          return user;
        } else {
          setError(true);
          setErrorMessageContent("Please check entered data");

          setTimeout(() => {
            setError(false);
          }, 2000);
          return user;
        }
      });
    } else {
      setError(true);
      setErrorMessageContent("You are not Registered, Please SignUp first");
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
        <span>{errorMessageContent} </span>
      </div>
    );
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
        <h3>Please Login</h3>

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
          <span
            className="navigate_to"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </span>{" "}
        </span>
      </form>
    </div>
  );
}
