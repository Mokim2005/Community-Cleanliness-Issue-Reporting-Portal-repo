import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import IssueCard from "../Components/IssusCard";
import { FaFilter, FaListUl, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Issus = () => {
  const data = useLoaderData() || [];

  // 🔹 State for Search and Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // প্রতি পেজে কয়টি কার্ড দেখাবে

  // 🔍 ১. সার্চ লজিক (Title অনুযায়ী ফিল্টার)
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔢 ২. পেজিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // পেজ পরিবর্তন করার হ্যান্ডলার
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden bg-[#050b18]">
      <title>All Issues | CleanCity</title>

      {/* Background Decorative Glow */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            Live Community Reports
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight italic uppercase">
            Community <span className="text-emerald-500">Issues</span>
          </h1>
          
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
            Every report brings us one step closer to a cleaner city. Browse through 
            the issues reported by citizens and track their progress.
          </p>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-emerald-500 rounded-full mx-auto"
          ></motion.div>
        </motion.div>

        {/* 🔍 Search Bar & Action Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase text-[10px] tracking-widest">
            <FaListUl className="text-emerald-500" />
            Showing {filteredData?.length} Reports
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // সার্চ করলে ১ নম্বর পেজে নিয়ে যাবে
                }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>

            <button className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all text-slate-300">
              <FaFilter size={12} /> Filter
            </button>
          </div>
        </div>
      </div>

      {/* Card Grid Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        {currentItems.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {currentItems.map((issus) => (
                  <IssueCard key={issus._id || issus.id} issus={issus} />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* 🔢 Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white disabled:opacity-20 hover:bg-emerald-500 hover:text-[#050b18] transition-all"
                >
                  <FaChevronLeft size={14} />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => paginate(idx + 1)}
                      className={`w-12 h-12 rounded-2xl font-black text-xs transition-all border ${
                        currentPage === idx + 1
                          ? "bg-emerald-500 text-[#050b18] border-emerald-500 shadow-lg shadow-emerald-500/20"
                          : "bg-white/5 text-slate-400 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white disabled:opacity-20 hover:bg-emerald-500 hover:text-[#050b18] transition-all"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
            <h3 className="text-2xl font-bold text-slate-400">No issues found!</h3>
            <p className="text-slate-500 mt-2 font-medium tracking-tight">Try searching with a different keyword or report a new issue.</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Issus;