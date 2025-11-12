import React, { use } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";

const AddIssus = () => {
  const { user } = use(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      amount: e.target.amount.value,
      email: e.target.email.value,
    };

    try {
      const res = await fetch("http://localhost:3000/issus", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      console.log(data);

      toast("✅ Issue added successfully!");

      e.target.reset();
    } catch (error) {
      console.error(error);
      toast("❌ Failed to add issue. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-white flex items-center justify-center py-10 px-4">
      <title>Add Issue</title>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 space-y-6 border border-green-200"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          🧹 Report a Community Issue
        </h2>

        {/* === Inputs (same as before) === */}
        <div className="space-y-5">
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter issue title"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select category</option>
              <option value="Garbage">Garbage</option>
              <option value="Drainage">Drainage</option>
              <option value="Pollution">Pollution</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="e.g., Tejgaon, Dhaka"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe the issue..."
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Suggested Fix Budget (৳)
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter estimated amount"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              disabled
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            🚮 Submit Issue
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddIssus;
