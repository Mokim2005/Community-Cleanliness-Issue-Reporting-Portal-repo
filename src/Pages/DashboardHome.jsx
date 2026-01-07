import React from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle2, 
  Clock, 
  PlusCircle, 
  TrendingUp, 
  AlertCircle,
  ArrowUpRight
} from "lucide-react";

const DashboardHome = () => {

  const stats = [
    { id: 1, label: "Total Reports", value: "24", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
    { id: 2, label: "Resolved", value: "18", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: 3, label: "Pending", value: "06", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: 4, label: "Impact Score", value: "850", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen">
      
      {/* 🔹 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter flex items-center gap-3">
            <LayoutDashboard className="text-emerald-500" /> Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.3em]">
            Monitor your community impact in real-time
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 bg-emerald-500 text-[#050b18] font-black px-6 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-xs"
        >
          <PlusCircle size={18} /> New Report
        </motion.button>
      </div>

      {/* 🔹 Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] hover:border-white/20 transition-all group"
          >
            <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <item.icon className={item.color} size={24} />
            </div>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{item.label}</p>
            <h3 className="text-3xl font-black text-white mt-1">{item.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Middle Section: Recent Activity & Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Reports List (Left) */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white font-black uppercase italic tracking-tight">Recent Activity</h2>
            <button className="text-emerald-500 text-[10px] font-black uppercase tracking-widest hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((report) => (
              <div key={report} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=100&q=80" className="object-cover w-full h-full" alt="issue" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Large Garbage Pile...</h4>
                    <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Mirpur-10, Dhaka</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-3 py-1 rounded-full border border-amber-500/20 uppercase">Pending</span>
                   <p className="text-slate-600 text-[9px] mt-2 font-bold uppercase tracking-tighter">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action / Tips Card (Right) */}
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                <div className="relative z-10 text-[#050b18]">
                    <AlertCircle className="mb-4" size={32} />
                    <h3 className="text-xl font-black uppercase italic leading-tight">Environmental <br /> Tip of the day</h3>
                    <p className="mt-4 text-sm font-bold opacity-80 leading-relaxed">
                        Avoid using plastic bags today. Try carrying a reusable cloth bag to the market.
                    </p>
                    <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-[#050b18] text-white px-5 py-3 rounded-xl shadow-xl">
                        Learn More <ArrowUpRight size={14}/>
                    </button>
                </div>
                {/* Decor Circle */}
                <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            </div>

            {/* Support Card */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] text-center">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Need Help?</p>
                <h4 className="text-white font-bold mt-2">Contact Admin</h4>
                <button className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 text-white text-xs font-black rounded-xl border border-white/10 transition-all uppercase tracking-widest">
                    Support Ticket
                </button>
            </div>
        </div>

      </div>

    </div>
  );
};

export default DashboardHome;