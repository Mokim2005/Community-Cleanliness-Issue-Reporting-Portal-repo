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
    <div className="min-h-screen py-16 px-4 md:px-10 relative overflow-hidden">
      <title>My Contributions | CleanCity</title>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
            My <span className="text-secondary">Contributions</span>
          </h2>
          <p className="text-slate-400 font-medium">History of your support for a cleaner community</p>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full"></div>
        </motion.div>

        {myContributions.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/5 backdrop-blur-xl border border-dashed border-white/10 rounded-[3rem]"
          >
            <History size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg font-bold uppercase tracking-widest">
              No contributions found yet.
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="overflow-hidden shadow-2xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem]"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-center border-collapse">
                <thead className="bg-white/5 text-secondary text-xs uppercase font-black tracking-[0.2em]">
                  <tr>
                    <th className="py-6 px-6">Issue Title</th>
                    <th className="py-6 px-6">Category</th>
                    <th className="py-6 px-6">Paid Amount</th>
                    <th className="py-6 px-6">Date</th>
                    <th className="py-6 px-6 text-right pr-10">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/5">
                  {myContributions.map((issue, index) => (
                    <motion.tr
                      key={issue._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group hover:bg-white/[0.03] transition-colors duration-300"
                    >
                      <td className="py-5 px-6 font-bold text-white text-left max-w-xs truncate">
                        <div className="flex items-center gap-3">
                          <Layers size={16} className="text-secondary opacity-50" />
                          {issue.title}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-tighter border border-white/10">
                          {issue?.category}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-2 text-white font-black">
                          <CreditCard size={14} className="text-secondary" />
                          ৳{issue.amount || 0}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-slate-400 text-sm font-medium">
                        {issue.date || "N/A"}
                      </td>
                      <td className="py-5 px-6 text-right pr-10">
                        <button
                          onClick={() => downloadToPdf(issue)}
                          className="inline-flex items-center gap-2 bg-secondary text-secondary-content px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-secondary/20"
                        >
                          <FileDown className="w-4 h-4" />
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

        <div className="mt-10 flex items-center justify-center gap-2 text-slate-500 italic text-sm">
          <History size={14} />
          <span>Keep up the great work! Your support makes a difference.</span>
        </div>
      </div>
    </div>
  );
};

export default MyContribution;