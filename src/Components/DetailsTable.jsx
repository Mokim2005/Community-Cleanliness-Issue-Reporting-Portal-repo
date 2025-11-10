import React from "react";

const DetailsTable = ({contributors}) => {
  return (
    <div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Contributors</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-200">
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Amount (৳)</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c) => (
              <tr key={c._id} className="hover:bg-green-50">
                <td className="p-2 border">
                  <img
                    src={c.image || "https://via.placeholder.com/40"}
                    alt={c.contributorName}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-2 border">{c.contributorName}</td>
                <td className="p-2 border">৳{c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsTable;
