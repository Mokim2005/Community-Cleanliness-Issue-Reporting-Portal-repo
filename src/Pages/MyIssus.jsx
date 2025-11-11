import React from "react";
import { useLoaderData } from "react-router";


const MyIssues = () => {
    const data = useLoaderData()
    console.log(data)


  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 md:px-10">
        <title>My Issus</title>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
        My Reported Issues
      </h2>

      <div className="overflow-x-auto shadow-lg bg-white rounded-xl">
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
            {data.map((issue) => (
              <tr
                key={issue._id}
                className="border-b hover:bg-blue-50 transition-all"
              >
                <td className="py-3 px-4 font-semibold">{issue.title}</td>
                <td className="py-3 px-4">{issue.category}</td>
                <td className="py-3 px-4 text-gray-700">${issue.amount}</td>
                <td className="py-3 px-4">
                  <select
                    defaultValue={issue.status}
                    className="border rounded px-3 py-1 text-sm"
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                  </select>
                </td>
                <td className="py-3 px-4 flex justify-center gap-3">
                  <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Update
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyIssues;
