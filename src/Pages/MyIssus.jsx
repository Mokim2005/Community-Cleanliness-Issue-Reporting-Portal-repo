import React, { useContext, useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();

  // 🔹 State
  const [myIssus, setMyIssus] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 🔹 Filter logged-in user issues on load
  useEffect(() => {
    if (Array.isArray(data)) {
      const filtered = data.filter(
        (item) => item.email?.toLowerCase() === user?.email?.toLowerCase()
      );
      setMyIssus(filtered);
    }
  }, [data, user]);

  // 🔹 Update issue
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

    fetch(`http://localhost:3000/issues/${selectedIssue._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then(() => {
        // Update frontend state
        setMyIssus((prev) =>
          prev.map((issue) =>
            issue._id === selectedIssue._id ? { ...issue, ...updatedData } : issue
          )
        );
        setIsEditModalOpen(false);
        toast("✅ Issue updated successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast("❌ Failed to update issue");
      });
  };

  // 🔹 Delete issue
  const handleDelete = (id) => {
    fetch(`http://localhost:3000/issues/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setMyIssus((prev) => prev.filter((issue) => issue._id !== id));
        setIsDeleteModalOpen(false);
        toast("🗑 Issue deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast("❌ Failed to delete issue");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4 md:px-10">
      <title>My Issues</title>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Reported Issues
      </h2>

      {/* 🔹 Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full border text-center">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myIssus.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-gray-500">
                  You haven't reported any issues yet.
                </td>
              </tr>
            ) : (
              myIssus.map((issue) => (
                <tr
                  key={issue._id}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="py-3 px-4 font-semibold">{issue.title}</td>
                  <td className="py-3 px-4">{issue.category}</td>
                  <td className="py-3 px-4 text-gray-700">৳{issue.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        issue.status === "ongoing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsEditModalOpen(true);
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setSelectedIssue(issue);
                        setIsDeleteModalOpen(true);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && selectedIssue && (
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
              className="bg-white rounded-2xl p-6 w-[90%] md:w-[500px] shadow-2xl"
            >
              <h3 className="text-xl font-semibold text-center mb-4 text-blue-700">
                ✏️ Update Issue
              </h3>
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  type="text"
                  name="title"
                  defaultValue={selectedIssue?.title}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedIssue?.category}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="amount"
                  defaultValue={selectedIssue?.amount}
                  className="w-full p-2 border rounded"
                  required
                />
                <textarea
                  name="description"
                  defaultValue={selectedIssue?.description}
                  className="w-full p-2 border rounded"
                  required
                ></textarea>

                <div className="flex gap-3 items-center">
                  <label className="font-medium">Status:</label>
                  <select
                    name="status"
                    defaultValue={selectedIssue?.status}
                    className="border rounded px-2 py-1"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>

                <div className="flex justify-between pt-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Delete Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedIssue && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-[90%] md:w-[400px] shadow-2xl text-center"
            >
              <h3 className="text-xl font-bold text-red-600 mb-3">
                ⚠️ Confirm Delete
              </h3>
              <p className="text-gray-700 mb-5">
                Are you sure you want to delete{" "}
                <strong>{selectedIssue?.title}</strong>?
              </p>

              <div className="flex justify-center gap-5">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedIssue._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyIssues;
