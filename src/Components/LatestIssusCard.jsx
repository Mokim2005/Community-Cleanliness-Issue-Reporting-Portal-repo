import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { MapPin, ArrowUpRight, Banknote, Layers } from "lucide-react";

const LatestIssusCard = ({ data, index }) => {
  const { image, title, category, location, description, amount, _id } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      // bg-base-200 ব্যবহার করা হয়েছে যাতে ডার্ক মোডে এটি স্লেট এবং লাইট মোডে হালকা অফ-হোয়াইট হয়
      className="group relative max-w-sm w-full bg-base-200 border border-base-300 rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 mx-auto"
    >
      {/* 🖼️ Image Section */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* থিম অনুযায়ী ইমেজ ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent"></div>

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="flex items-center gap-1.5 bg-primary/20 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border border-primary/20">
            <Layers size={12} />
            {category}
          </span>
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          {/* text-base-content অটোমেটিক থিম অনুযায়ী কালার নিবে */}
          <h2 className="text-xl font-black text-base-content group-hover:text-primary transition-colors line-clamp-1 tracking-tight">
            {title}
          </h2>

          <div className="flex items-center gap-1.5 text-neutral text-[11px] font-bold uppercase tracking-wider">
            <MapPin size={14} className="text-primary" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <p className="text-neutral text-sm leading-relaxed line-clamp-2 h-10 font-medium opacity-80">
          {description}
        </p>

        {/* Dynamic Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>

        {/* 💰 Footer Section */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral/60 uppercase tracking-widest">
              Est. Cost
            </span>
            <p className="text-primary font-black text-xl flex items-center gap-1">
              ৳{amount}
            </p>
          </div>

          <Link to={`/issueDetails/${_id}`}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              // btn-primary সরাসরি আপনার index.css এর কাস্টম গ্রাডিয়েন্ট ব্যবহার করবে
              className="flex items-center justify-center bg-primary text-primary-content w-12 h-12 rounded-2xl shadow-lg shadow-primary/30 cursor-pointer group/btn"
            >
              <ArrowUpRight
                size={22}
                className="group-hover/btn:rotate-45 transition-transform duration-300"
              />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* 💡 Hover Glow Effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"></div>
    </motion.div>
  );
};

export default LatestIssusCard;
