import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  CalendarDays,
  DollarSign,
  FileText,
  X,
  Send,
} from "lucide-react";
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

    const contributionData = {
      issueId: _id,
      title: title,
      category: category,
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
          background: "#0f172a",
          color: "#fff",
          confirmButtonColor: "#10b981",
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
    <div className="min-h-screen py-12 px-4 md:px-8 relative overflow-hidden bg-[#050b18]">
      <title>{title} | Details</title>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          {/* Left: Image */}
          <div className="relative h-80 lg:h-auto group overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b18]/80 to-transparent"></div>
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 space-y-6">
            <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              {category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {title}
            </h1>
            <div className="flex items-center gap-2 text-emerald-500 font-bold">
              <MapPin size={18} />
              <span>{location}</span>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/5">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                  Posted On
                </p>
                <p className="text-white font-bold flex items-center gap-2">
                  <CalendarDays size={14} /> {date}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">
                  Target
                </p>
                <p className="text-emerald-500 text-2xl font-black italic">
                  ৳{amount}
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-sm">
              {description}
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all flex justify-center items-center gap-3 tracking-widest uppercase text-xs"
            >
              <DollarSign size={18} /> Contribute Now
            </button>
          </div>
        </motion.div>

        {/* Contribution Board */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 px-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">
              Contribution Board
            </h2>
            <div className="h-px flex-grow bg-white/5"></div>
          </div>

          {/* Table container with fixed hover style */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden">
            <DetailsTable contributors={contributors} />
          </div>
        </div>
      </div>

      {/* Modal - same as before but with consistent colors */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#050b18]/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 relative z-10 shadow-3xl"
            >
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-black text-white italic tracking-tight">
                  Support Community
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-white"
                >
                  <X />
                </button>
              </div>
              <form onSubmit={handleContribution} className="space-y-4">
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount (৳)"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500"
                />
                <textarea
                  name="info"
                  rows="2"
                  placeholder="Message (Optional)"
                  className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-emerald-500 resize-none"
                />
                <button className="w-full py-4 bg-emerald-500 text-white font-black rounded-xl uppercase tracking-widest text-xs">
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
