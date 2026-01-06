import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { FaTag, FaMapMarkerAlt, FaAlignLeft, FaLink, FaMoneyBillWave, FaEnvelope } from "react-icons/fa";

const AddIssus = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      title: form.title.value,
      category: form.category.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      amount: form.amount.value,
      email: user?.email,
      date: new Date().toLocaleDateString(),
      status: "ongoing"
    };

    try {
      const res = await fetch(
        "https://community-cleanliness-issue-reporti.vercel.app/issus",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Server error");

      toast.success("✅ Issue added to the mission!");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to add issue. Please try again.");
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden flex items-center justify-center">
      <title>Report Issue | CleanCity</title>
      
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Report <span className="text-secondary">Issue</span>
          </h2>
          <p className="text-slate-400 font-medium italic">Help us identify cleanliness problems in your community</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Issue Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaTag className="text-secondary" /> Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Broken drainage system"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white placeholder:text-slate-600"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaTag size={12} className="text-secondary" /> Category
            </label>
            <select
              name="category"
              required
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white appearance-none cursor-pointer"
            >
              <option className="bg-[#0f172a]" value="">Select category</option>
              <option className="bg-[#0f172a]" value="Garbage">Garbage</option>
              <option className="bg-[#0f172a]" value="Drainage">Drainage</option>
              <option className="bg-[#0f172a]" value="Pollution">Pollution</option>
              <option className="bg-[#0f172a]" value="Others">Others</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaMapMarkerAlt size={12} className="text-secondary" /> Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Tejgaon, Dhaka"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaMoneyBillWave size={12} className="text-secondary" /> Estimated Budget (৳)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="500"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white"
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaLink size={12} className="text-secondary" /> Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://imgur.com/example.jpg"
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaAlignLeft size={12} className="text-secondary" /> Detailed Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the issue in detail..."
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:outline-none focus:border-secondary transition-all text-white resize-none"
              required
            ></textarea>
          </div>

          {/* User Email (Disabled) */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase flex items-center gap-2">
              <FaEnvelope size={12} className="text-secondary" /> Reporter Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-slate-500 font-bold cursor-not-allowed italic"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-5 bg-secondary text-secondary-content font-black rounded-2xl shadow-xl shadow-secondary/20 hover:shadow-secondary/40 transition-all uppercase tracking-widest flex justify-center items-center gap-3"
            >
              🚀 Submit Issue
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddIssus;