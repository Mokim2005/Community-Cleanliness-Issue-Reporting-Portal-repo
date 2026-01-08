import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import { Link } from "react-router";

const Banner = () => {
  // ১. সরাসরি লোকাল স্টোরেজ থেকে ইনিশিয়াল ভ্যালু নেওয়া (যাতে রিলোডে স্টেট ঠিক থাকে)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.documentElement;

    // থিম অনুযায়ী ক্লাস এবং DaisyUI এর data-theme সেট করা
    if (theme === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }

    localStorage.setItem("theme", theme);
  }, [theme]); // থিম চেঞ্জ হলেই এটি রান করবে

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className="relative h-[80vh] flex items-center justify-center overflow-hidden 
                 bg-base-100 dark:bg-[#050b18] transition-colors duration-500 ease-in-out"
    >
      {/* 🌌 Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] 
                   bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] 
                   bg-secondary/20 rounded-full blur-[150px] pointer-events-none"
      />

      {/* 📦 Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 px-6 text-center">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl mb-10
                     bg-base-200 border border-base-300 text-base-content
                     dark:bg-gradient-to-r dark:from-emerald-500/10 dark:to-blue-500/10 dark:backdrop-blur-md dark:text-emerald-400 dark:border-white/10"
        >
          <Leaf size={14} className="animate-pulse text-emerald-500" />
          Clean & Green Community
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black leading-[0.95] uppercase tracking-tighter text-base-content"
        >
          Building a <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-gradient-x">
            Sustainable Future
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-neutral mt-8 mb-12 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Your active participation helps create a cleaner, healthier, and more
          vibrant community for everyone.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center items-center gap-6"
        >
          <Link to="/report-issue">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary rounded-full px-10 h-16 uppercase tracking-widest font-black"
            >
              <Sparkles size={20} /> Report an Issue
            </motion.button>
          </Link>

          <Link to="/issues">
            <motion.button className="btn btn-outline rounded-full px-10 h-16 uppercase tracking-widest font-black border-base-300 text-base-content">
              Explore Map <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* 🌙 Theme Toggle Button (Testing এর জন্য এটি আনকমেন্ট করুন) */}
        {/* <button 
           onClick={toggleTheme} 
           className="mt-10 p-3 rounded-full bg-base-300 text-base-content shadow-lg font-bold"
        >
          {theme === 'dark' ? '🌞 Switch to Light' : '🌙 Switch to Dark'}
        </button> 
        */}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
    </div>
  );
};

export default Banner;
