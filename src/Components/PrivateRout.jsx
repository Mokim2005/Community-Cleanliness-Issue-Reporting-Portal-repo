import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Context/AuthContext";

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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 mx-auto"></div>
          <p className="text-blue-700 font-semibold text-lg">Checking access...</p>
        </div>
      </div>
    );
  }

  // ✅ Authenticated → show child route
  if (user) {
    return children;
  }

  // 🚫 Not logged in → redirect to login
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
