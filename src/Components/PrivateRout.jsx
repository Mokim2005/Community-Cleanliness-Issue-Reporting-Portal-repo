import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const [manualLoading, setManualLoading] = useState(true);

  // ⏳ Add a 3-second manual loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setManualLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 🌀 Show loading for first 3 seconds or until Firebase auth loads
  if (loading || manualLoading) {
    return <Loading></Loading>;
  }

  // ✅ Authenticated → show child route
  if (user) {
    return children;
  }

  // 🚫 Not logged in → redirect to login
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
