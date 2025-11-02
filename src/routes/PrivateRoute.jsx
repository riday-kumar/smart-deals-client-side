import { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

export const PrivateRoute = ({ children }) => {
  const { user } = use(AuthContext);

  if (!user) {
    return <Navigate to="/"></Navigate>;
  } else {
    return children;
  }
};
