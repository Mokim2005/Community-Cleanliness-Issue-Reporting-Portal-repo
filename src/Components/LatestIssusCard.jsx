import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { MapPin, ArrowUpRight, Banknote, Layers } from "lucide-react";

const LatestIssusCard = ({ data, index }) => {
  const { image, title, category, location, description, amount, _id } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }} // staggered delay
      whileHover={{ y: -10 }}
      className="group relative max-w-sm w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 mx-auto"
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b18] via-[#050b18]/20 to-transparent"></div>
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-emerald-500/30">
            <Layers size={12} />
            {category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {title}
          </h2>

          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-tighter">
            <MapPin size={14} className="text-emerald-500" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 h-10">
          {description}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Required</span>
            <p className="text-emerald-500 font-black text-lg flex items-center gap-1">
              <Banknote size={16} /> ৳{amount}
            </p>
          </div>

          <Link to={`/issueDetails/${_id}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all cursor-pointer"
            >
              <span className="text-xs font-black uppercase tracking-widest ml-1 italic">Details</span>
              <ArrowUpRight size={18} />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Hover Light Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2.5rem]"></div>
    </motion.div>
  );
};

export default LatestIssusCard;