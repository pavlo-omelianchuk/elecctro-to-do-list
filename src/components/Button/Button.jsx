import React from "react";

export default function Button({ action, type, onClickAction }) {
  return (
    <button type={type} onClick={onClickAction}>
      {action === "updateForm"
        ? "Update"
        : action === "Logout"
        ? "Logout"
        : action === "Login"
        ? "Login"
        : "Create"}
    </button>
  );
}
