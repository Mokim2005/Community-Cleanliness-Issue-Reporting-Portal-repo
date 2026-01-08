import React, { useContext } from "react";
import { useLoaderData } from "react-router";
import { FileDown, History, CreditCard, Layers } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MyContribution = () => {
  const { user } = useContext(AuthContext);
  const data = useLoaderData();

  // ডাটা ফিল্টার করা
  const myContributions = Array.isArray(data)
    ? data.filter((item) => item.email === user?.email)
    : [];

  const downloadToPdf = (issue) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Contribution Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Contributor: ${user?.displayName || "Anonymous"}`, 14, 30);
    doc.text(`Email: ${user?.email || "N/A"}`, 14, 38);
    doc.text(`Date: ${issue.date || "N/A"}`, 14, 46);

    autoTable(doc, {
      startY: 60,
      head: [["Issue Title", "Category", "Paid Amount"]],
      body: [[issue.title, issue.category, `BDT ${issue.amount || 0}`]],
      headStyles: { fillColor: [16, 185, 129] }, // Emerald color
    });

    doc.text(
      "Thank you for your valuable contribution to the community!",
      14,
      doc.lastAutoTable.finalY + 20
    );

    doc.save(`Contribution_${issue.title}.pdf`);
    toast.success("✅ PDF downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-500 pb-20 relative overflow-hidden">
      <title>My Contributions | City Fix</title>

      {/* 🔹 Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4 pt-10"
        >
          <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic">
            My <span className="text-primary">Contributions</span>
          </h2>
          <p className="opacity-60 font-medium">
            History of your support for a cleaner community
          </p>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        {myContributions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-base-200 border-2 border-dashed border-base-300 rounded-[3rem] shadow-inner"
          >
            <History size={64} className="mx-auto opacity-20 mb-6" />
            <p className="opacity-50 text-lg font-black uppercase tracking-[0.3em]">
              No contributions found yet.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden shadow-2xl bg-base-200 border border-base-300 rounded-[2.5rem]"
          >
            <div className="overflow-x-auto">
              <table className="table w-full text-center border-collapse">
                {/* Table Head */}
                <thead className="bg-base-300/50 text-base-content/70 text-xs uppercase font-black tracking-[0.2em]">
                  <tr>
                    <th className="py-6 px-8 text-left">Issue Title</th>
                    <th className="py-6 px-6">Category</th>
                    <th className="py-6 px-6">Paid Amount</th>
                    <th className="py-6 px-6">Date</th>
                    <th className="py-6 px-8 text-right">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-base-300">
                  {myContributions.map((issue, index) => (
                    <motion.tr
                      key={issue._id || index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group hover:bg-base-300/40 transition-colors duration-300"
                    >
                      <td className="py-5 px-8 font-bold text-left max-w-xs">
                        <div className="flex items-center gap-3">
                          <Layers
                            size={18}
                            className="text-primary opacity-70 group-hover:scale-110 transition-transform"
                          />
                          <span className="truncate">{issue.title}</span>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="badge badge-outline badge-primary font-black uppercase text-[10px] py-3 px-4 tracking-widest">
                          {issue?.category}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-2 font-black text-lg">
                          <CreditCard size={16} className="text-secondary" />৳
                          {issue.amount || 0}
                        </div>
                      </td>
                      <td className="py-5 px-6 opacity-70 font-bold text-sm">
                        {issue.date || "N/A"}
                      </td>
                      <td className="py-5 px-8 text-right">
                        <button
                          onClick={() => downloadToPdf(issue)}
                          className="btn btn-primary btn-sm rounded-xl font-black text-[10px] uppercase tracking-tighter hover:scale-105 shadow-md shadow-primary/20"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          PDF
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Footer Info */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-40 italic text-sm font-medium">
          <History size={16} />
          <span>Keep up the great work! Your support makes a difference.</span>
        </div>
      </div>
    </div>
  );
};

export default MyContribution;
