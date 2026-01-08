import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  Edit3,
  Trash2,
  AlertCircle,
  X,
  CheckCircle2,
  Clock,
} from "lucide-react";

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

    fetch(
      `https://community-cleanliness-issue-reporti.vercel.app/issues/${selectedIssue._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        setMyIssus((prev) =>
          prev.map((issue) =>
            issue._id === selectedIssue._id
              ? { ...issue, ...updatedData }
              : issue
          )
        );
        setIsEditModalOpen(false);
        toast.success("✅ Issue updated successfully!");
      })
      .catch(() => toast.error("❌ Failed to update issue"));
  };

  const handleDelete = (id) => {
    fetch(
      `https://community-cleanliness-issue-reporti.vercel.app/issues/${id}`,
      { method: "DELETE" }
    )
      .then((res) => res.json())
      .then(() => {
        setMyIssus((prev) => prev.filter((issue) => issue._id !== id));
        setIsDeleteModalOpen(false);
        toast.info("🗑 Issue removed successfully");
      })
      .catch(() => toast.error("❌ Failed to delete"));
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-10 relative overflow-hidden bg-base-100 text-base-content transition-colors duration-500">
      <title>My Issues | Management</title>

      {/* Bg Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-base-content uppercase tracking-tight italic">
            Manage <span className="text-primary">Your Reports</span>
          </h2>
          <p className="text-neutral mt-2 font-medium opacity-75">
            Keep track of the issues you've reported to the community
          </p>
        </header>

        {/* 🔹 Table Container */}
        <div className="bg-base-200 border border-base-300 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="table w-full text-center">
              {/* head */}
              <thead className="bg-base-300">
                <tr className="text-primary font-black uppercase text-[11px] tracking-[0.2em] border-none">
                  <th className="py-6 px-6 text-left">Issue Info</th>
                  <th className="py-6 px-6">Budget</th>
                  <th className="py-6 px-6">Status</th>
                  <th className="py-6 px-6 text-right pr-12">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myIssus.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-20 text-neutral font-bold uppercase tracking-widest text-sm italic opacity-50"
                    >
                      No issues reported yet
                    </td>
                  </tr>
                ) : (
                  myIssus.map((issue) => (
                    <motion.tr
                      key={issue._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-base-300/50 transition-colors border-b border-base-300/50"
                    >
                      <td className="py-6 px-6 text-left">
                        <p className="text-base-content font-bold text-lg">
                          {issue.title}
                        </p>
                        <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-black uppercase tracking-wider border border-primary/20">
                          {issue.category}
                        </span>
                      </td>
                      <td className="py-6 px-6 text-base-content font-black">
                        ৳{issue.amount}
                      </td>
                      <td className="py-6 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            issue.status === "ongoing"
                              ? "bg-warning/10 text-warning border-warning/20"
                              : "bg-success/10 text-success border-success/20"
                          }`}
                        >
                          {issue.status === "ongoing" ? (
                            <Clock size={12} />
                          ) : (
                            <CheckCircle2 size={12} />
                          )}
                          {issue.status}
                        </div>
                      </td>
                      <td className="py-6 px-6 text-right pr-8">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              setSelectedIssue(issue);
                              setIsEditModalOpen(true);
                            }}
                            className="btn btn-square btn-sm md:btn-md bg-base-300 hover:btn-primary border-none shadow-lg"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedIssue(issue);
                              setIsDeleteModalOpen(true);
                            }}
                            className="btn btn-square btn-sm md:btn-md bg-base-300 hover:btn-error border-none shadow-lg"
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-base-100 border border-base-300 w-full max-w-lg rounded-[2.5rem] p-8 md:p-10 shadow-3xl relative z-10 text-base-content"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black italic tracking-tight flex items-center gap-3">
                  <Edit3 className="text-primary" /> Update Report
                </h3>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-ghost btn-circle btn-sm"
                >
                  <X />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="form-control w-full">
                  <label className="label uppercase text-[10px] font-black text-neutral opacity-70">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={selectedIssue?.title}
                    className="input input-bordered bg-base-200 rounded-2xl focus:border-primary"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label uppercase text-[10px] font-black text-neutral opacity-70">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      defaultValue={selectedIssue?.category}
                      className="input input-bordered bg-base-200 rounded-2xl focus:border-primary"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label uppercase text-[10px] font-black text-neutral opacity-70">
                      Budget (৳)
                    </label>
                    <input
                      type="number"
                      name="amount"
                      defaultValue={selectedIssue?.amount}
                      className="input input-bordered bg-base-200 rounded-2xl focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label uppercase text-[10px] font-black text-neutral opacity-70">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedIssue?.description}
                    rows="3"
                    className="textarea textarea-bordered bg-base-200 rounded-2xl focus:border-primary resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-base-200 rounded-2xl border border-base-300">
                  <label className="font-bold text-neutral text-sm">
                    Report Status
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedIssue?.status}
                    className="select select-sm bg-primary text-primary-content font-black rounded-lg"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full h-14 rounded-2xl uppercase tracking-widest font-black"
                >
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-base-100 border border-error/20 w-full max-w-sm rounded-[2.5rem] p-10 shadow-3xl relative z-10 text-center text-base-content"
            >
              <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-error/20">
                <AlertCircle size={40} className="text-error" />
              </div>
              <h3 className="text-2xl font-black mb-2 uppercase italic">
                Are you sure?
              </h3>
              <p className="text-neutral text-sm leading-relaxed mb-8">
                You are about to delete{" "}
                <strong>"{selectedIssue?.title}"</strong>. This action cannot be
                undone.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn flex-1 bg-base-200 border-none rounded-2xl"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedIssue._id)}
                  className="btn flex-1 btn-error text-white rounded-2xl shadow-xl shadow-error/20"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyIssues;
