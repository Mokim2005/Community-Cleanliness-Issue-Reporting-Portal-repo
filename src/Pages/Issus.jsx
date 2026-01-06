import React from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import IssueCard from "../Components/IssusCard";
import { FaFilter, FaListUl } from "react-icons/fa";

const Issus = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden">
      <title>All Issues | CleanCity</title>

      {/* Background Decorative Glow (ডার্ক মোডে এটি বেশি ফুটে উঠবে) */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            Live Community Reports
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Community <span className="text-secondary">Issues</span>
          </h1>
          
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Every report brings us one step closer to a cleaner city. Browse through 
            the issues reported by citizens and track their progress.
          </p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-secondary rounded-full mx-auto"
          ></motion.div>
        </motion.div>

        {/* Action Bar (Optional but looks professional) */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase text-xs tracking-widest">
            <FaListUl className="text-secondary" />
            Showing {data?.length} Reports
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all text-slate-300">
              <FaFilter size={12} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        {data?.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {data.map((issus) => (
              <IssueCard key={issus._id || issus.id} issus={issus} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
            <h3 className="text-2xl font-bold text-slate-400">No issues reported yet!</h3>
            <p className="text-slate-500 mt-2">Be the first one to report an issue in your area.</p>
          </div>
        )}
      </div>

      {/* Spacing for Footer */}
      <div className="h-20"></div>
    </div>
  );
};

export default Issus;