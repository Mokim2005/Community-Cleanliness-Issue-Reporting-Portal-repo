import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800 px-4">
      <title>Error</title>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="w-24 h-24 text-red-500" />
          </motion.div>
        </div>

        <h1 className="text-7xl font-bold text-blue-600">404</h1>
        <p className="text-2xl mt-4 font-semibold">Oops! Page Not Found</p>
        <p className="text-gray-600 mt-2">
          The page you are looking for might have been removed or temporarily
          unavailable.
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow hover:bg-blue-700 transition-all duration-300"
        >
          Back to Home
        </button>
      </motion.div>

      <footer className="mt-12 text-sm text-gray-500">
        © {new Date().getFullYear()} Clean Community — All rights reserved.
      </footer>
    </div>
  );
};

export default Error;
