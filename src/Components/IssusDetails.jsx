import React from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { MapPin, Tag, CalendarDays, DollarSign, FileText } from "lucide-react";

const IssueDetails = () => {
  const issue = useLoaderData();
  const data = issue.result
  console.log(data)

  const {
    title,
    category,
    location,
    description,
    image,
    amount,
    date,
  } = data || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex justify-center items-center p-5"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-green-200"
      >
        {/* Image Section */}
        <motion.img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Content Section */}
        <div className="p-6 space-y-5">
          <h1 className="text-3xl font-bold text-green-800 text-center">
            {title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex items-center gap-2 text-gray-700">
              <Tag className="text-green-600" size={20} />
              <span>
                <strong>Category:</strong> {category}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="text-green-600" size={20} />
              <span>
                <strong>Location:</strong> {location}
              </span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="text-green-600" size={20} />
              <span>
                <strong>Date:</strong> {date}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="text-green-600" size={20} />
              <span>
                <strong>Budget:</strong> ৳{amount}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-2 text-gray-700">
            <FileText className="text-green-600 mt-1" size={20} />
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            💰 Pay Clean-Up Contribution
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default IssueDetails;
