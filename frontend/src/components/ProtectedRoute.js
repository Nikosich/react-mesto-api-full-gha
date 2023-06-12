import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggiedIn, children }) {
  if (!isLoggiedIn) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
