import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, CalendarDays, DollarSign, X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import DetailsTable from "./DetailsTable";
import Swal from "sweetalert2";

const IssueDetails = () => {
  const issue = useLoaderData();
  const data = issue.result;
  const { user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [contributors, setContributors] = useState([]);

  const { title, category, location, description, image, amount, date, _id } =
    data || {};

  useEffect(() => {
    fetch(
      `https://community-cleanliness-issue-reporti.vercel.app/contributions?issueId=${_id}`
    )
      .then((res) => res.json())
      .then((data) => setContributors(data))
      .catch((err) => console.error(err));
  }, [_id]);

  const handleContribution = (e) => {
    e.preventDefault();
    const form = e.target;
    const isDark = document.documentElement.classList.contains("dark");

    const contributionData = {
      issueId: _id,
      title,
      category,
      amount: form.amount.value,
      contributorName: form.name.value,
      email: user?.email,
      phone: form.phone.value,
      address: form.address.value,
      date: new Date().toLocaleDateString(),
      additionalInfo: form.info.value,
      photoURL: user?.photoURL,
    };

    fetch(
      `https://community-cleanliness-issue-reporti.vercel.app/contributions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contributionData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Contribution Successful!",
          text: "Thank you for supporting a cleaner community.",
          icon: "success",
          background: isDark ? "#0f172a" : "#ffffff", // ডাইনামিক ব্যাকগ্রাউন্ড
          color: isDark ? "#fff" : "#1e293b",
          confirmButtonColor: "#4f46e5",
        });
        setIsOpen(false);
        form.reset();
        setContributors((prev) => [...prev, contributionData]);
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 relative overflow-hidden bg-base-100 text-base-content transition-colors duration-500">
      <title>Issue Details | {title}</title>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 bg-base-200 border border-base-300 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Left: Image */}
          <div className="relative h-80 lg:h-auto group overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-300/50 to-transparent"></div>
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 space-y-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-primary font-bold">
              <MapPin size={18} />
              <span>{location}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-base-300">
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral tracking-widest mb-1">
                  Posted On
                </p>
                <p className="font-bold flex items-center gap-2 text-base-content">
                  <CalendarDays size={14} className="text-primary" /> {date}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-neutral tracking-widest mb-1">
                  Target
                </p>
                <p className="text-primary text-2xl font-black italic">
                  ৳{amount}
                </p>
              </div>
            </div>

            <p className="text-neutral leading-relaxed text-sm">
              {description}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-primary w-full h-14 rounded-2xl shadow-lg shadow-primary/20 tracking-widest uppercase text-xs font-black"
            >
              <DollarSign size={18} /> Contribute Now
            </button>
          </div>
        </motion.div>

        {/* Contribution Board */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-2xl font-black text-base-content uppercase tracking-tighter italic">
              Contribution Board
            </h2>
            <div className="h-px flex-grow bg-base-300"></div>
          </div>

          <div className="bg-base-200 border border-base-300 rounded-[2rem] overflow-hidden shadow-xl">
            <DetailsTable contributors={contributors} />
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 border border-base-300 w-full max-w-lg rounded-[2.5rem] p-8 relative z-10 shadow-3xl text-base-content"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-black italic tracking-tight">
                  Support Community
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-neutral hover:text-primary"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleContribution} className="space-y-4">
                {["amount", "name", "phone", "address"].map((field) => (
                  <input
                    key={field}
                    type={field === "amount" ? "number" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required
                    className="input input-bordered w-full bg-base-200 focus:border-primary"
                  />
                ))}
                <textarea
                  name="info"
                  rows="2"
                  placeholder="Message (Optional)"
                  className="textarea textarea-bordered w-full bg-base-200 focus:border-primary"
                />
                <button className="btn btn-primary w-full uppercase tracking-widest font-black">
                  Confirm Support
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IssueDetails;
