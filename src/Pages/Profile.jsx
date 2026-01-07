import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Camera, 
  Award, 
  MapPin 
} from "lucide-react";

const Profile = () => {
  const { user, logOut } = useContext(AuthContext);

  // এনিমেশন ভেরিয়েন্ট
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050b18] py-20 px-4 md:px-8 relative overflow-hidden">
      
      {/* 🔹 Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        variants={containerVars}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto relative z-10"
      >
        {/* Profile Header Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          
          {/* Cover Photo Gradient */}
          <div className="h-40 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-emerald-500/20 w-full relative">
            <div className="absolute inset-0 bg-grid-white/[0.05]"></div>
          </div>

          <div className="px-8 pb-10">
            {/* Avatar & Basic Info */}
            <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
              <div className="relative group mx-auto md:mx-0">
                <img 
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} 
                  alt="Profile" 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] object-cover border-4 border-[#050b18] shadow-2xl"
                />
                <button className="absolute bottom-2 right-2 p-2 bg-emerald-500 text-[#050b18] rounded-xl hover:scale-110 transition-transform shadow-lg">
                  <Camera size={18} />
                </button>
              </div>

              <div className="text-center md:text-left flex-grow pb-2">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                  <h1 className="text-3xl font-black text-white tracking-tight uppercase italic">
                    {user?.displayName || "Community Member"}
                  </h1>
                  <ShieldCheck className="text-emerald-500" size={24} />
                </div>
                <p className="text-slate-400 font-medium flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} className="text-emerald-500/50" /> {user?.email}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all">
                  <Settings size={20} />
                </button>
                <button 
                  onClick={logOut}
                  className="px-6 py-4 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-10 border-t border-white/5">
              <motion.div variants={itemVars} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
                <Award className="mx-auto mb-3 text-emerald-500" size={32} />
                <p className="text-white text-2xl font-black italic">Rank 04</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Community Rank</p>
              </motion.div>

              <motion.div variants={itemVars} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 text-center group hover:border-blue-500/30 transition-all">
                <MapPin className="mx-auto mb-3 text-blue-500" size={32} />
                <p className="text-white text-2xl font-black italic">12</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Issues Reported</p>
              </motion.div>

              <motion.div variants={itemVars} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 text-center group hover:border-emerald-500/30 transition-all">
                <User className="mx-auto mb-3 text-emerald-500" size={32} />
                <p className="text-white text-2xl font-black italic">Verified</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Account Status</p>
              </motion.div>
            </div>

            {/* Account Details Form Style */}
            <div className="mt-12 space-y-4">
               <h3 className="text-white font-black uppercase tracking-widest text-xs italic mb-6 flex items-center gap-2">
                 <span className="w-8 h-px bg-emerald-500"></span> Personal Information
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Full Name</p>
                    <p className="text-white font-medium">{user?.displayName}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Email Address</p>
                    <p className="text-white font-medium">{user?.email}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Last Login</p>
                    <p className="text-white font-medium">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Member Since</p>
                    <p className="text-white font-medium">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;