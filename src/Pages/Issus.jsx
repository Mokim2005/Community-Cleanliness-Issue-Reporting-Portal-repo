import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import IssueCard from "../Components/IssusCard";
import {
  FaFilter,
  FaListUl,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const Issus = () => {
  const data = useLoaderData() || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // পেজ চেঞ্জ হলে উপরে স্ক্রল হবে
  };

  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden bg-base-100 text-base-content transition-colors duration-500">
      <title>All Issues | CleanCity</title>

      {/* Background Decorative Glow - Primary & Secondary Color */}
      <div className="absolute top-20 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live Community Reports
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-base-content tracking-tight italic uppercase">
            Community <span className="text-primary">Issues</span>
          </h1>

          <p className="text-neutral mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium opacity-80">
            Every report brings us one step closer to a cleaner city. Browse
            through the issues reported by citizens and track their progress.
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1.5 bg-primary rounded-full mx-auto"
          ></motion.div>
        </motion.div>

        {/* 🔍 Search Bar & Action Bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-base-300 pb-8">
          <div className="flex items-center gap-2 text-neutral font-bold uppercase text-[10px] tracking-widest">
            <FaListUl className="text-primary" />
            Showing {filteredData?.length} Reports
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="input input-bordered w-full bg-base-200 pl-12 rounded-2xl border-base-300 focus:border-primary transition-all text-sm"
              />
            </div>

            <button className="btn btn-ghost bg-base-200 border-base-300 hover:bg-base-300 flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-neutral">
              <FaFilter size={12} className="text-primary" /> Filter
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
                {currentItems.map((issus, idx) => (
                  <IssueCard
                    key={issus._id || issus.id}
                    issus={issus}
                    index={idx}
                  />
                ))}
              </AnimatePresence>
            </motion.div>

            {/* 🔢 Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                <button
                  onClick={() => paginate(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-square bg-base-200 border-base-300 text-base-content hover:btn-primary disabled:opacity-30"
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
                          ? "bg-primary text-primary-content border-primary shadow-lg shadow-primary/20"
                          : "bg-base-200 text-neutral border-base-300 hover:border-primary"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    paginate(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="btn btn-square bg-base-200 border-base-300 text-base-content hover:btn-primary disabled:opacity-30"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-base-200 rounded-[3rem] border border-dashed border-base-300">
            <h3 className="text-2xl font-bold text-neutral">
              No issues found!
            </h3>
            <p className="text-neutral/60 mt-2 font-medium tracking-tight">
              Try searching with a different keyword or report a new issue.
            </p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Issus;
