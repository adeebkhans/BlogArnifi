import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Assuming this hook checks if the user is authenticated

const PublicRoute = ({ element }) => {
  const isAuthenticated = useAuth();  // Check if user is authenticated

  // If the user is already authenticated, redirect to the home page
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;  // If not authenticated, allow access to the login/signup pages
};

export default PublicRoute;
