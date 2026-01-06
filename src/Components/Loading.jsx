import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Glowing Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-t-secondary border-r-transparent border-b-primary border-l-transparent rounded-full shadow-[0_0_20px_rgba(var(--s),0.3)]"
        ></motion.div>

        {/* Inner Pulsing Circle */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-8 h-8 bg-secondary rounded-full blur-[2px]"
        ></motion.div>

        {/* Decorative Particles */}
        <div className="absolute inset-0 w-full h-full animate-ping opacity-20 bg-primary rounded-full"></div>
      </div>

      {/* Professional Text Animation */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-widest uppercase bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse"
        >
          Loading CleanCity
        </motion.h2>
        <p className="text-xs text-slate-500 font-medium mt-1 tracking-[0.3em] uppercase">
          Optimizing your environment
        </p>
      </div>

      {/* Progress Line Animation */}
      <div className="w-48 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-full w-1/2 bg-gradient-to-r from-transparent via-secondary to-transparent"
        />
      </div>
    </div>
  );
};

export default Loading;