import React, { useEffect, useState } from "react";
import { Users, UserCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

const TotalUser = () => {
  const [users, setUsers] = useState([]);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    fetch("https://community-cleanliness-issue-reporti.vercel.app/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  useEffect(() => {
    let start = 0;
    const end = users.length;
    if (end === 0) return;

    const duration = 1500; 
    const increment = end / (duration / 20);
    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayCount(Math.floor(start));
    }, 20);
    return () => clearInterval(counter);
  }, [users]);

  return (
    <div className="relative py-20 px-6 overflow-hidden bg-[#050b18]">
      
      {/* 🔹 Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center shadow-3xl relative overflow-hidden"
        >
          {/* Decorative Corner Icon */}
          <Activity className="absolute top-8 right-8 text-emerald-500/20" size={40} />

          {/* Icon with Ring Animation */}
          <div className="relative inline-block mb-8">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-[-10px] border-2 border-dashed border-emerald-500/30 rounded-full"
             />
             <div className="bg-emerald-500 p-6 rounded-full shadow-lg shadow-emerald-500/30">
                <Users className="text-white text-5xl md:text-6xl" size={48} />
             </div>
          </div>

          {/* Heading */}
          <h2 className="text-slate-400 text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-4">
            Our Growing Community
          </h2>

          {/* Animated Number */}
          <div className="relative inline-block">
            <motion.h3 
              key={displayCount}
              className="text-7xl md:text-9xl font-black text-white tracking-tighter"
            >
              {displayCount}
            </motion.h3>
            {/* Soft Glow behind number */}
            <div className="absolute inset-0 blur-2xl bg-emerald-500/20 -z-10"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-slate-200 mt-6 tracking-tight">
            Registered Citizens <span className="text-emerald-500 italic">Joining the Cause</span>
          </p>

          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center justify-center gap-2 text-slate-500 font-bold text-[10px] uppercase tracking-widest"
          >
            <UserCheck size={14} className="text-emerald-500" />
            Active engagement across the city
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );
};

export default TotalUser;