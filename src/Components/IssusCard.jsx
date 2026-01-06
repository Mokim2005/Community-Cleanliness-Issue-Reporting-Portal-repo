import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCoins, FaArrowRight } from "react-icons/fa";

const IssueCard = ({ issus }) => {
  const { _id, image, title, category, description, amount, location } = issus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:shadow-secondary/20 transition-all duration-500"
    >
      {/* Image Section with Hover Zoom */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-transparent to-transparent opacity-80"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-secondary/20 backdrop-blur-lg border border-secondary/30 text-secondary text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white line-clamp-1 group-hover:text-secondary transition-colors duration-300">
            {title}
          </h2>
          
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <FaMapMarkerAlt className="text-secondary" />
            <span className="font-medium truncate">{location}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed font-medium">
          {description}
        </p>

        {/* Bottom Bar: Amount & Button */}
        <div className="pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Budget</span>
            <div className="flex items-center gap-1.5 text-secondary font-black text-lg">
              <FaCoins size={14} />
              <span>৳{amount}</span>
            </div>
          </div>

          <Link to={`/issueDetails/${_id}`}>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 hover:bg-secondary hover:text-secondary-content px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 border border-white/10 hover:border-transparent"
            >
              Details <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 rounded-[2rem] pointer-events-none transition-all duration-500"></div>
    </motion.div>
  );
};

export default IssueCard;