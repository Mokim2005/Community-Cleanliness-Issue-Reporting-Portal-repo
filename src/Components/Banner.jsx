import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Megaphone } from "lucide-react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#050b18]">
      
      {/* 🔹 Background Abstract Decor */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 🔹 Glassmorphism Card Container */}
      <div className="max-w-5xl mx-auto relative z-10 px-6">
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-emerald-500/20 mb-8"
          >
            <Sparkles size={14} /> Join the movement
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black text-white leading-tight uppercase tracking-tighter"
          >
            Keep Your Community <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              Clean & Green
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mt-6 mb-10 leading-relaxed font-medium"
          >
            Report garbage, drainage, or pollution problems instantly. Take the first step toward a healthier, smarter city today!
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/report-issue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-emerald-500 text-[#050b18] font-black px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all uppercase tracking-widest text-sm"
              >
                <Megaphone size={18} /> Report Issue
              </motion.button>
            </Link>

            <Link to="/allIssues">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/5 text-white border border-white/10 font-black px-8 py-4 rounded-2xl transition-all uppercase tracking-widest text-sm"
              >
                View Map <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 🔹 Bottom Animated Wave/Glow */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_50px_2px_rgba(16,185,129,0.3)]"></div>
    </div>
  );
};

export default Banner;