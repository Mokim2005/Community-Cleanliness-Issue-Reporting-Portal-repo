import React, { use } from "react";
import { useLoaderData } from "react-router";
import { FileDown } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";

const MyContribution = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData(); // dynamic data from loader

  // filter only logged-in user's data
  const myContributions = Array.isArray(data)
    ? data.filter((item) => item.email === user?.email)
    : [];
  console.log(myContributions);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 md:px-10">
      <title>My Contributions</title>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Contributions
      </h2>

      {myContributions.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You haven’t made any contributions yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-xl bg-white rounded-2xl">
          <table className="min-w-full text-sm text-center">
            <thead className="bg-blue-600 text-white text-sm uppercase tracking-wide">
              <tr>
                <th className="py-4 px-6">Issue Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Paid Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Download Report</th>
              </tr>
            </thead>

            <tbody>
              {myContributions.map((issue, index) => (
                <tr
                  key={issue._id}
                  className={`${
                    index % 2 === 0 ? "bg-blue-50" : "bg-white"
                  } hover:bg-blue-100 transition-all duration-300`}
                >
                  <td className="py-3 px-6 font-medium text-gray-800 text-left">
                    {issue.title}
                  </td>
                  <td className="py-3 px-6 text-gray-700">{issue?.category}</td>
                  <td className="py-3 px-6 text-blue-700 font-semibold">
                    ${issue.amount || 0}
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {issue.date || "N/A"}
                  </td>
                  <td className="py-3 px-6">
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                      <FileDown className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-5 text-center text-gray-500 text-sm">
        View your previous issue payments and reports.
      </p>
    </div>
  );
};

export default MyContribution;
