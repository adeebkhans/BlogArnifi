import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Custom hook to check if user is authenticated

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuth();

  // If the user is authenticated, render the element, otherwise redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
