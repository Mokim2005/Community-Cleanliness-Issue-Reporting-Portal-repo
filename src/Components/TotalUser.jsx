import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";

const TotalUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[200px] bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600  shadow-xl p-6 text-white text-center">
      <div className="space-y-3">
        <div className="flex justify-center">
          <FaUsers className="text-5xl animate-bounce" />
        </div>
        <h2 className="text-3xl font-bold tracking-wide">
          Total Registered Users
        </h2>
        <p className="text-6xl font-extrabold">{users.length}</p>
        <p className="text-sm opacity-80">
          People have joined our community 🎉
        </p>
      </div>
    </div>
  );
};

export default TotalUser;
