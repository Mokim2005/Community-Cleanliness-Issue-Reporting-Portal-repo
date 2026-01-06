import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLeaf, FaShieldAlt, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { icon: <FaUsers size={24} />, label: "Community Members", value: "500+" },
    { icon: <FaLeaf size={24} />, label: "Issues Resolved", value: "120+" },
    { icon: <FaShieldAlt size={24} />, label: "Verified Reports", value: "100%" },
    { icon: <FaRocket size={24} />, label: "Response Rate", value: "24/7" },
  ];

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 relative overflow-hidden">
      <title>About Us | CleanCity</title>

      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Our Mission for a <span className="text-secondary">Greener</span> Future
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            CleanCity is a community-driven platform designed to empower citizens to take 
            direct action in keeping their neighborhoods clean and healthy.
          </p>
          <div className="h-1.5 w-24 bg-secondary rounded-full mx-auto"></div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-white italic">Why CleanCity?</h2>
            <p className="text-slate-400 leading-relaxed text-base">
              Often, community cleanliness issues like overflowing garbage, broken drainage, or pollution 
              go unnoticed for days. CleanCity bridges the gap between residents and action. 
              We believe that when people come together, real change happens.
            </p>
            <p className="text-slate-400 leading-relaxed text-base">
              Our platform allows anyone to report an issue, contribute funds for a cleanup, 
              and track the progress in real-time. Transparent, efficient, and community-focused.
            </p>
            <ul className="space-y-3">
                <li className="flex items-center gap-3 text-secondary font-bold">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span> 
                    Real-time Reporting & Tracking
                </li>
                <li className="flex items-center gap-3 text-secondary font-bold">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span> 
                    Transparent Funding System
                </li>
                <li className="flex items-center gap-3 text-secondary font-bold">
                    <span className="w-2 h-2 bg-secondary rounded-full"></span> 
                    Verified Volunteer Network
                </li>
            </ul>
          </motion.div>

          {/* Right: Glass Card with Video/Image Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-96 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden group shadow-2xl"
          >
             <img 
               src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" 
               alt="Cleaning Community" 
               className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-secondary/20 backdrop-blur-md p-6 rounded-full border border-secondary/30">
                    <FaLeaf className="text-secondary text-4xl animate-bounce" />
                </div>
             </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center space-y-3 hover:bg-white/10 transition-all group"
            >
              <div className="text-secondary mx-auto group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black text-white">{stat.value}</h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-gradient-to-r from-secondary/20 to-primary/20 border border-white/10 rounded-[3rem] text-center space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white">Ready to make a difference?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Join hundreds of volunteers and citizens who are already working to make our city a better place to live.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <button className="px-8 py-4 bg-secondary text-secondary-content font-black rounded-2xl shadow-xl hover:shadow-secondary/40 transition-all uppercase tracking-widest text-sm">
                Join Now
             </button>
             <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-sm">
                Our Work
             </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AboutUs;