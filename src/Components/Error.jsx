import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Home, RefreshCcw, Ghost } from "lucide-react";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050b18] text-slate-300 overflow-hidden relative px-6">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[150px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        {/* Floating Icon Container */}
        <div className="relative flex justify-center mb-12">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <Ghost className="w-32 h-32 text-secondary opacity-80" />
            <motion.div 
              className="absolute -bottom-4 w-full h-4 bg-black/40 rounded-[100%] blur-md"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Error Content */}
        <motion.h1 
          className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-b from-white to-slate-700 bg-clip-text text-transparent opacity-20 select-none"
        >
          404
        </motion.h1>
        
        <div className="-mt-12 md:-mt-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Lost in Space?
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            The page you're looking for has vanished into the void. Don't worry, even the best explorers get lost sometimes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-content font-bold rounded-2xl shadow-[0_10px_20px_-10px_rgba(var(--s),0.5)] hover:shadow-secondary/40 hover:-translate-y-1 transition-all duration-300 active:scale-95"
          >
            <Home size={20} className="group-hover:rotate-12 transition-transform" />
            Back to Mission Control
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="group flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all duration-300"
          >
            <RefreshCcw size={20} className="group-hover:rotate-180 transition-transform duration-700" />
            Retry Connection
          </button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 text-center"
      >
        <p className="text-sm tracking-[0.2em] uppercase font-semibold">
          Clean<span className="text-secondary">City</span> OS v2.0
        </p>
      </motion.div>
    </div>
  );
};

export default Error;