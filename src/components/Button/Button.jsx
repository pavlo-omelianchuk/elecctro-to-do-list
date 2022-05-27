import React from "react";

export default function Button({ action, type, onClickAction, className }) {
  return (
    <button type={type} onClick={onClickAction} className={`button_${action}`}>
      {action === "updateForm"
        ? "Update"
        : action === "Logout"
        ? "Logout"
        : action === "Login"
        ? "Login"
        : action === "SignUp"
        ? "SignUp"
        : "Create"}
    </button>
  );
}
