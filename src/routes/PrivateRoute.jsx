import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <p>Loading......</p>;
  }

  if (!user) {
    return <Navigate to="/"></Navigate>;
  } else {
    return children;
  }
};
