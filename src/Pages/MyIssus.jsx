import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { Edit3, Trash2, AlertCircle, X, CheckCircle2, Clock } from "lucide-react";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();

  const [myIssus, setMyIssus] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter(
        (item) => item.email?.toLowerCase() === user?.email?.toLowerCase()
      );
      setMyIssus(filtered);
    }
  }, [data, user]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedData = {
      title: form.title.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
      description: form.description.value,
      status: form.status.value,
    };

    fetch(`https://community-cleanliness-issue-reporti.vercel.app/issues/${selectedIssue._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        setMyIssus((prev) =>
          prev.map((issue) =>
            issue._id === selectedIssue._id ? { ...issue, ...updatedData } : issue
          )
        );
        setIsEditModalOpen(false);
        toast.success("✅ Issue updated successfully!");
      })
      .catch(() => toast.error("❌ Failed to update issue"));
  };

  const handleDelete = (id) => {
    fetch(`https://community-cleanliness-issue-reporti.vercel.app/issues/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setMyIssus((prev) => prev.filter((issue) => issue._id !== id));
        setIsDeleteModalOpen(false);
        toast.info("🗑 Issue removed successfully");
      })
      .catch(() => toast.error("❌ Failed to delete"));
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-10 relative overflow-hidden">
      <title>My Issues | Management</title>
      
      {/* Bg Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
                Manage <span className="text-secondary">Your Reports</span>
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Keep track of the issues you've reported to the community</p>
        </header>

        {/* 🔹 Table Container */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead className="bg-white/5">
                <tr className="text-secondary font-black uppercase text-[11px] tracking-[0.2em]">
                  <th className="py-6 px-6 text-left">Issue Info</th>
                  <th className="py-6 px-6">Budget</th>
                  <th className="py-6 px-6">Status</th>
                  <th className="py-6 px-6 text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {myIssus.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-20 text-slate-500 font-bold uppercase tracking-widest text-sm italic">
                        No issues reported yet
                    </td>
                  </tr>
                ) : (
                  myIssus.map((issue) => (
                    <motion.tr 
                      key={issue._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-6 px-6 text-left">
                        <p className="text-white font-bold text-lg">{issue.title}</p>
                        <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded font-black uppercase tracking-wider">{issue.category}</span>
                      </td>
                      <td className="py-6 px-6 text-white font-black">৳{issue.amount}</td>
                      <td className="py-6 px-6">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            issue.status === "ongoing" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        }`}>
                            {issue.status === "ongoing" ? <Clock size={12}/> : <CheckCircle2 size={12}/>}
                            {issue.status}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-right pr-8">
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => { setSelectedIssue(issue); setIsEditModalOpen(true); }}
                                className="p-3 bg-white/5 hover:bg-secondary hover:text-secondary-content rounded-xl transition-all text-slate-400 shadow-lg"
                            >
                                <Edit3 size={18} />
                            </button>
                            <button 
                                onClick={() => { setSelectedIssue(issue); setIsDeleteModalOpen(true); }}
                                className="p-3 bg-white/5 hover:bg-red-500 hover:text-white rounded-xl transition-all text-slate-400 shadow-lg"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 🔹 Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedIssue && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-[#050b18]/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-3xl relative z-10"
            >
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-black text-white italic tracking-tight flex items-center gap-3">
                        <Edit3 className="text-secondary" /> Update Report
                    </h3>
                    <button onClick={() => setIsEditModalOpen(false)} className="text-slate-500 hover:text-white"><X /></button>
                </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Title</label>
                    <input type="text" name="title" defaultValue={selectedIssue?.title} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-secondary outline-none transition-all" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Category</label>
                        <input type="text" name="category" defaultValue={selectedIssue?.category} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-secondary outline-none transition-all" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Budget (৳)</label>
                        <input type="number" name="amount" defaultValue={selectedIssue?.amount} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-secondary outline-none transition-all" required />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Description</label>
                    <textarea name="description" defaultValue={selectedIssue?.description} rows="3" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white focus:border-secondary outline-none transition-all resize-none" required />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <label className="font-bold text-slate-400 text-sm">Report Status</label>
                  <select name="status" defaultValue={selectedIssue?.status} className="bg-secondary text-secondary-content font-black rounded-lg px-3 py-1 outline-none text-xs">
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-5 bg-secondary text-secondary-content font-black rounded-2xl shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm">
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 🔹 Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedIssue && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsDeleteModalOpen(false)} className="absolute inset-0 bg-[#050b18]/90 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
               className="bg-[#0f172a] border border-red-500/20 w-full max-w-sm rounded-[2.5rem] p-10 shadow-3xl relative z-10 text-center"
             >
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <AlertCircle size={40} className="text-red-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Are you sure?</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                    You are about to delete <strong>"{selectedIssue?.title}"</strong>. This action cannot be undone.
                </p>

                <div className="flex gap-4">
                  <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-4 bg-white/5 text-slate-400 font-bold rounded-2xl hover:bg-white/10 transition-all">Cancel</button>
                  <button onClick={() => handleDelete(selectedIssue._id)} className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 hover:scale-105 transition-all">Delete</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyIssues;