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
  ArrowUpRight,
} from "lucide-react";

const DashboardHome = () => {
  const stats = [
    {
      id: 1,
      label: "Total Reports",
      value: "24",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 2,
      label: "Resolved",
      value: "18",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      id: 3,
      label: "Pending",
      value: "06",
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      id: 4,
      label: "Impact Score",
      value: "850",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen bg-base-100 text-base-content transition-colors duration-500">
      {/* 🔹 Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-base-content uppercase italic tracking-tighter flex items-center gap-3">
            <LayoutDashboard className="text-primary" /> Dashboard Overview
          </h1>
          <p className="text-neutral font-medium mt-1 uppercase text-[10px] tracking-[0.3em] opacity-70">
            Monitor your community impact in real-time
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary px-8 rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest text-xs font-black border-none"
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
            className="bg-base-200 border border-base-300 p-6 rounded-[2rem] hover:border-primary/30 transition-all group shadow-sm"
          >
            <div
              className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <item.icon className={item.color} size={24} />
            </div>
            <p className="text-neutral text-[10px] font-black uppercase tracking-widest opacity-60">
              {item.label}
            </p>
            <h3 className="text-3xl font-black text-base-content mt-1">
              {item.value}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Middle Section: Recent Activity & Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports List (Left) */}
        <div className="lg:col-span-2 bg-base-200 border border-base-300 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base-content font-black uppercase italic tracking-tight">
              Recent Activity
            </h2>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((report) => (
              <div
                key={report}
                className="flex items-center justify-between p-4 bg-base-100 rounded-2xl border border-base-300 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-base-300">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=100&q=80"
                      className="object-cover w-full h-full"
                      alt="issue"
                    />
                  </div>
                  <div>
                    <h4 className="text-base-content font-bold text-sm group-hover:text-primary transition-colors">
                      Large Garbage Pile...
                    </h4>
                    <p className="text-neutral text-[10px] uppercase font-bold tracking-widest opacity-60">
                      Mirpur-10, Dhaka
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="bg-warning/10 text-warning text-[10px] font-black px-3 py-1 rounded-full border border-warning/20 uppercase">
                    Pending
                  </span>
                  <p className="text-neutral text-[9px] mt-2 font-bold uppercase tracking-tighter opacity-50">
                    2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action / Tips Card (Right) */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
            <div className="relative z-10 text-primary-content">
              <AlertCircle className="mb-4 opacity-80" size={32} />
              <h3 className="text-xl font-black uppercase italic leading-tight">
                Environmental <br /> Tip of the day
              </h3>
              <p className="mt-4 text-sm font-bold opacity-90 leading-relaxed">
                Avoid using plastic bags today. Try carrying a reusable cloth
                bag to the market.
              </p>
              <button className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-base-100 text-base-content px-5 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform">
                Learn More <ArrowUpRight size={14} />
              </button>
            </div>
            {/* Decor Circle */}
            <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
          </div>

          {/* Support Card */}
          <div className="bg-base-200 border border-base-300 p-8 rounded-[2.5rem] text-center shadow-sm">
            <p className="text-neutral text-[10px] font-black uppercase tracking-widest opacity-60">
              Need Help?
            </p>
            <h4 className="text-base-content font-bold mt-2">Contact Admin</h4>
            <button className="mt-4 w-full py-3 bg-base-300 hover:bg-primary hover:text-primary-content text-base-content text-xs font-black rounded-xl border border-base-300 transition-all uppercase tracking-widest">
              Support Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
