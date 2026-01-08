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
    // bg-base-100 ব্যবহার করায় এটি লাইট মোডে সাদা এবং ডার্ক মোডে নেভি ব্লু হবে
    <div className="relative py-20 px-6 overflow-hidden bg-base-100 transition-colors duration-500">
      
      {/* 🔹 Background Effects - Primary কালার থেকে গ্লো নিবে */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // bg-base-200 এবং বর্ডার থিম অনুযায়ী অটোমেটিক কালার চেঞ্জ করবে
          className="bg-base-200/50 backdrop-blur-2xl border border-base-300 rounded-[3rem] p-12 md:p-20 text-center shadow-xl relative overflow-hidden"
        >
          {/* Decorative Corner Icon */}
          <Activity
            className="absolute top-8 right-8 text-primary/20"
            size={40}
          />

          {/* Icon with Ring Animation */}
          <div className="relative inline-block mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10px] border-2 border-dashed border-primary/30 rounded-full"
            />
            {/* bg-primary ব্যবহার করা হয়েছে যা আপনার CSS ভেরিয়েবল থেকে আসবে */}
            <div className="bg-primary p-6 rounded-full shadow-lg shadow-primary/30">
              <Users className="text-primary-content text-5xl md:text-6xl" size={48} />
            </div>
          </div>

          {/* Heading - text-neutral ব্যবহার করা হয়েছে */}
          <h2 className="text-neutral text-xs md:text-sm font-black uppercase tracking-[0.4em] mb-4">
            Our Growing Community
          </h2>

          {/* Animated Number - text-base-content (সাদা বা কালো) */}
          <div className="relative inline-block">
            <motion.h3
              key={displayCount}
              className="text-7xl md:text-9xl font-black text-base-content tracking-tighter"
            >
              {displayCount}
            </motion.h3>
            {/* Soft Glow behind number */}
            <div className="absolute inset-0 blur-3xl bg-primary/20 -z-10"></div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-base-content/80 mt-6 tracking-tight">
            Registered Citizens{" "}
            <span className="text-primary italic">Joining the Cause</span>
          </p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 flex items-center justify-center gap-2 text-neutral font-bold text-[10px] uppercase tracking-widest"
          >
            <UserCheck size={14} className="text-primary" />
            Active engagement across the city
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>
    </div>
  );
};

export default TotalUser;