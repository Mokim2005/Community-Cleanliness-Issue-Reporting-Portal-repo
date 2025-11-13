import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const LatestIssusCard = ({ data }) => {
  const { image, title, category, location, description, amount, _id } = data;
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="max-w-sm w-full bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 mx-auto"
      >
        {/* Image Section */}
        <div className="relative">
          <img src={image} alt={title} className="w-full h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
            {title}
          </h2>

          <p className="text-sm text-gray-600 mb-2">
            📍 <span className="font-medium">{location}</span>
          </p>

          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <p className="text-green-700 font-semibold text-base">
              💰 Amount: ৳{amount}
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gradient-to-r from-green-400 to-emerald-600 text-white px-4 py-2 rounded-full shadow hover:shadow-md transition-all duration-300 text-sm font-medium"
            >
              <Link to={`/issueDetails/${_id}`}>See Details</Link>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LatestIssusCard;
