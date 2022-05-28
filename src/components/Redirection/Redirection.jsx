import { useUsersData } from "../../utils/useContext.js";

const Redirection = ({ children }) => {
  let { currentUser } = useUsersData();

  return currentUser
    ? children
    : // <Navigate to="/login" replace />
      children;
};
export default Redirection;
