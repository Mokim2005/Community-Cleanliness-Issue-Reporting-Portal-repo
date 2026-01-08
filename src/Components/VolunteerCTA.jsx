import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, HeartHandshake, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const JoinCleanDrive = () => {
  const stories = [
    {
      name: "Arif Ahmed",
      role: "Lead Volunteer",
      text: "Cleaning my neighborhood gives me a sense of peace. Join us!",
      img: "https://i.pravatar.cc/100?img=12"
    },
    {
      name: "Sara Khan",
      role: "Community Member",
      text: "Small steps lead to big changes. Proud to be a part of this.",
      img: "https://i.pravatar.cc/100?img=5"
    },
    {
      name: "Rahat Kabir",
      role: "Green Activist",
      text: "The reporting system is so easy. Fixed 3 issues this month!",
      img: "https://i.pravatar.cc/100?img=33"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  return (
    // bg-base-100 ব্যবহার করা হয়েছে যা থিম অনুযায়ী সাদা বা নেভি ব্লু হবে
    <section className="relative py-24 px-6 overflow-hidden bg-base-100 transition-colors duration-500">
      
      {/* Background Decor - Primary Color Glow */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          
          {/* Left Side: Content & Slider */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                <Sparkles size={14} /> Volunteer Program
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-base-content leading-[1.1] uppercase tracking-tighter">
                Join Our Community <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Clean Drive!
                </span>
              </h2>

              {/* 🔄 Mini Slider Section - Using Theme Adaptive Colors */}
              <div className="relative bg-base-200 border border-base-300 rounded-3xl p-6 overflow-hidden shadow-sm">
                <Quote className="absolute top-4 right-6 text-primary/10" size={60} />
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-4"
                  >
                    <img src={stories[index].img} className="w-14 h-14 rounded-full border-2 border-primary/30" alt="user" />
                    <div>
                      <p className="text-neutral italic text-sm mb-1 leading-relaxed">"{stories[index].text}"</p>
                      <h4 className="text-base-content font-bold text-xs uppercase tracking-widest">
                        {stories[index].name} — <span className="text-primary">{stories[index].role}</span>
                      </h4>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="flex gap-2 mt-4 justify-end">
                    <button onClick={() => setIndex((index - 1 + stories.length) % stories.length)} className="p-1.5 rounded-full bg-base-300 text-neutral hover:text-primary transition-colors"><ChevronLeft size={16}/></button>
                    <button onClick={() => setIndex((index + 1) % stories.length)} className="p-1.5 rounded-full bg-base-300 text-neutral hover:text-primary transition-colors"><ChevronRight size={16}/></button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary rounded-2xl px-8 h-14 uppercase tracking-widest text-xs font-black shadow-lg shadow-primary/20"
                  >
                    <Send size={18} /> Get Started Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Progress Card (Visual) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 bg-base-200/50 backdrop-blur-2xl border border-base-300 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <HeartHandshake size={32} />
                  </div>
                  <div>
                    <h4 className="text-base-content font-black uppercase text-lg italic tracking-tight">Be the Change</h4>
                    <p className="text-neutral text-[10px] font-bold uppercase tracking-[0.2em]">Live Volunteer Status</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                   <div className="h-2 w-full bg-base-300 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary" 
                      />
                   </div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-primary">75% Recruitment Done</span>
                      <span className="text-neutral">38/50 Joined</span>
                   </div>
                </div>

                {/* Feature Tags */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <div className="p-4 bg-base-300/30 rounded-2xl border border-base-300 text-center">
                        <p className="text-primary text-xl font-black">20+</p>
                        <p className="text-neutral text-[9px] font-bold uppercase">Cities Cover</p>
                    </div>
                    <div className="p-4 bg-base-300/30 rounded-2xl border border-base-300 text-center">
                        <p className="text-secondary text-xl font-black">24/7</p>
                        <p className="text-neutral text-[9px] font-bold uppercase">Support</p>
                    </div>
                </div>
              </div>
            </div>
            {/* Soft Glow behind card */}
            <div className="absolute inset-0 bg-primary/10 blur-[80px] -z-10 rounded-full"></div>
          </motion.div>

        </div>
      </div>
      {/* Bottom Divider Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>
    </section>
  );
};

export default JoinCleanDrive;