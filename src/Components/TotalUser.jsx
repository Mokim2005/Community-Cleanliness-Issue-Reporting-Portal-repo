// File: src/Components/TotalUser.jsx

import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const TotalUser = () => {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetch("https://community-cleanliness-issue-reporti.vercel.app/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // Animate number count
  useEffect(() => {
    let start = 0;
    const end = users.length;
    if (end === 0) return;

    const duration = 1000; // 1 second
    const increment = end / (duration / 20); // update every 20ms
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayCount(Math.floor(start));
    }, 20);
  }, [users]);

  return (
    <div className="relative w-full h-80 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-700/50 to-transparent"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6"
      >
        {/* Icon with bounce */}
        <motion.div
          className="mb-4"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <FaUsers className="text-8xl text-white/90" />
        </motion.div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
          Total Registered Users
        </h2>

        {/* Animated Number */}
        <motion.p
          key={displayCount}
          className="text-7xl md:text-8xl font-extrabold mb-2 text-white/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {displayCount}
        </motion.p>

        <p className="text-lg md:text-xl opacity-90 text-white/80">
          People have joined our community 🎉
        </p>
      </motion.div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-green-500/40 to-transparent blur-3xl"></div>
    </div>
  );
};

export default TotalUser;
