import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FaTag,
  FaMapMarkerAlt,
  FaAlignLeft,
  FaLink,
  FaMoneyBillWave,
  FaEnvelope,
} from "react-icons/fa";

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
      status: "ongoing",
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
    <div className="min-h-screen py-16 px-4 relative overflow-hidden flex items-center justify-center bg-base-100 text-base-content transition-colors duration-500">
      <title>Report Issue | CleanCity</title>

      {/* Background Glows - Using Theme Variables */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-base-200 backdrop-blur-2xl border border-base-300 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-black text-base-content mb-4 tracking-tight uppercase italic">
            Report <span className="text-primary">Issue</span>
          </h2>
          <p className="text-neutral font-medium italic opacity-80">
            Help us identify cleanliness problems in your community
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Issue Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaTag className="text-primary" /> Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Broken drainage system"
              className="input input-bordered w-full bg-base-100 focus:border-primary rounded-2xl p-4 h-14"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaTag size={12} className="text-primary" /> Category
            </label>
            <select
              name="category"
              required
              className="select select-bordered w-full bg-base-100 focus:border-primary rounded-2xl h-14"
            >
              <option value="" disabled selected>
                Select category
              </option>
              <option value="Garbage">Garbage</option>
              <option value="Drainage">Drainage</option>
              <option value="Pollution">Pollution</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaMapMarkerAlt size={12} className="text-primary" /> Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Tejgaon, Dhaka"
              className="input input-bordered w-full bg-base-100 focus:border-primary rounded-2xl h-14"
              required
            />
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaMoneyBillWave size={12} className="text-primary" /> Est. Budget
              (৳)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="500"
              className="input input-bordered w-full bg-base-100 focus:border-primary rounded-2xl h-14"
              required
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaLink size={12} className="text-primary" /> Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://imgur.com/example.jpg"
              className="input input-bordered w-full bg-base-100 focus:border-primary rounded-2xl h-14"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaAlignLeft size={12} className="text-primary" /> Detailed
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the issue in detail..."
              className="textarea textarea-bordered w-full bg-base-100 focus:border-primary rounded-2xl p-4 resize-none min-h-[120px]"
              required
            ></textarea>
          </div>

          {/* User Email (Read Only style) */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-neutral/70 ml-1 uppercase flex items-center gap-2 tracking-widest">
              <FaEnvelope size={12} className="text-primary" /> Reporter Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-300 border-none text-neutral font-bold cursor-not-allowed italic"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full h-16 rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all uppercase tracking-widest font-black text-xs"
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
