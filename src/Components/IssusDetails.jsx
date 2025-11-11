import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Tag, CalendarDays, DollarSign, FileText } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import DetailsTable from "./DetailsTable";

const IssueDetails = () => {
  const issue = useLoaderData();
  const data = issue.result;
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [contributors, setContributors] = useState([]);

  const { title, category, location, description, image, amount, date, _id } =
    data || {};

  // Fetch contributors on page load
  useEffect(() => {
    fetch(`http://localhost:3000/contributions?issueId=${_id}`)
      .then((res) => res.json())
      .then((data) => setContributors(data))
      .catch((err) => console.error(err));
  }, [_id]);

  // Handle form submission
  const handleContribution = (e) => {
    e.preventDefault();
    const form = e.target;

    const contributionData = {
      issueId: _id,
      title: form.title.value,
      amount: form.amount.value,
      contributorName: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      date: new Date().toLocaleDateString(),
      additionalInfo: form.info.value,
    };

    // Send to backend
    fetch(`http://localhost:3000/contributions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contributionData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("✅ Contribution Successful!");
        setIsOpen(false);
        
        form.reset();

        // 🔹 Update contributors state instantly
        setContributors((prev) => [...prev, contributionData]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex justify-center items-center p-5"
    >
      <title>Issus Details</title>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-green-200"
      >
        {/* Image Section */}
        <motion.img
          src={image}
          alt={title}
          className="w-full h-64 object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* Content Section */}
        <div className="p-6 space-y-5">
          <h1 className="text-3xl font-bold text-green-800 text-center">
            {title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Tag className="text-green-600" size={20} />
              <span>
                <strong>Category:</strong> {category}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="text-green-600" size={20} />
              <span>
                <strong>Location:</strong> {location}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="text-green-600" size={20} />
              <span>
                <strong>Date:</strong> {date}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="text-green-600" size={20} />
              <span>
                <strong>Budget:</strong> ৳{amount}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <FileText className="text-green-600 mt-1" size={20} />
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Pay Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            💰 Pay Clean-Up Contribution
          </motion.button>
        </div>
      </motion.div>

      {/* ✅ Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-8 w-[90%] md:w-[500px] shadow-2xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-green-700 text-center mb-3">
                Contribute to Clean-Up 💚
              </h2>

              <form onSubmit={handleContribution} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={title}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount (৳)"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Contributor Name"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
             
                <input
                  name="photoURL"
                  type="text"
                  className="input"
                  placeholder="PhotoURL"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <textarea
                  name="info"
                  placeholder="Additional info (optional)"
                  className="w-full p-3 border rounded-lg"
                ></textarea>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Contributors Table outside modal */}
      <DetailsTable contributors={contributors} />
    </motion.div>
  );
};

export default IssueDetails;
