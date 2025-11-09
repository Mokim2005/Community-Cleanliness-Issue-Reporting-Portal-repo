// File: src/Pages/Issus.jsx

import React from "react";
import { useLoaderData } from "react-router";

import { motion } from "framer-motion";
import IssueCard from "../Components/IssusCard";

const Issus = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-100 to-green-200 py-12 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm">
          🗑️ Community Issues
        </h1>
        <p className="text-gray-700 mt-3 max-w-xl mx-auto text-base md:text-lg">
          Explore all the reported issues in your community — help keep your
          area clean and green 🌿
        </p>
        <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full mx-auto"></div>
      </motion.div>

      {/* Card Grid Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center"
      >
        {data.map((issus) => (
          <IssueCard key={issus._id || issus.id} issus={issus} />
        ))}
      </motion.div>

      {/* Bottom soft glow */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-green-300/50 to-transparent blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default Issus;
