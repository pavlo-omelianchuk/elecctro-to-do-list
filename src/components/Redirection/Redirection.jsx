import { Navigate } from "react-router-dom";

const Redirection = ({ isLoggedIn, children }) => {
  return !isLoggedIn ? <Navigate to="/login" replace /> : children;
};
export default Redirection;
