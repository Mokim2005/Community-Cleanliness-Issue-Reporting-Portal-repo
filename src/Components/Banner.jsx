// File: src/Components/Banner.jsx

import React from "react";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="relative h-[80vh] md:h-[90vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-700/50 to-transparent"></div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white px-6"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Keep Your Community Clean 🌿
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Report garbage, drainage & pollution problems easily — take the first
          step toward a cleaner city!
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          🚮 Report an Issue
        </motion.button>
      </motion.div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-green-500/40 to-transparent blur-3xl"></div>
    </div>
  );
};

export default Banner;
