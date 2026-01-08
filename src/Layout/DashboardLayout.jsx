import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";

// Icons
import { FaHome, FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { SiContributorcovenant } from "react-icons/si";
import { HiMenuAlt2 } from "react-icons/hi";

const DashboardLayout = () => {
  // Active Link Styling
  const activeStyle = ({ isActive }) =>
    isActive
      ? "bg-primary text-primary-content font-bold shadow-md shadow-primary/20"
      : "text-base-content hover:bg-base-300 transition-all";

  return (
    // মেইন কন্টেইনার সব সময় ফুল হাইট থাকবে
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* 🔹 MAIN CONTENT AREA */}
      <div className="drawer-content flex flex-col bg-base-100">
        {/* Mobile Navbar */}
        <nav className="navbar w-full bg-base-200 lg:hidden px-4 sticky top-0 z-30 border-b border-base-300">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-square btn-ghost drawer-button"
          >
            <HiMenuAlt2 size={24} />
          </label>
          <div className="flex-1 px-4 font-black uppercase italic tracking-tighter">
            City <span className="text-primary">Fix</span>
          </div>
        </nav>

        {/* 🟢 FIXED WIDTH WRAPPER 🟢 */}
        {/* এখানে max-w-7xl দিয়ে কন্টেন্টকে মাঝখানে রাখা হয়েছে */}
        <div className="w-full flex justify-center">
          <main className="w-full max-w-[1400px] p-4 md:p-8 lg:p-10 min-h-screen">
            <Outlet />
            {/* নিচের দিকে কিছুটা গ্যাপ রাখার জন্য */}
            <div className="h-20" />
          </main>
        </div>
      </div>

      {/* 🔹 SIDEBAR AREA */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex flex-col h-full bg-base-200 border-r border-base-300 w-72 p-6 transition-all">
          {/* Logo Section */}
          <div className="mb-10 px-2 flex items-center gap-3">
            <img className="w-10 h-10 object-contain" src={logo} alt="logo" />
            <div className="flex flex-col">
              <span className="text-xl font-black uppercase italic tracking-tighter leading-none">
                City <span className="text-primary">Fix</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <ul className="menu menu-md gap-2 p-0 w-full text-base-content font-medium">
            <li className="menu-title opacity-40 mb-2 font-black uppercase text-[10px] tracking-widest">
              Main Menu
            </li>

            <li>
              <NavLink to="/" className={activeStyle}>
                <FaHome size={18} /> Homepage
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard" end className={activeStyle}>
                <FaHome size={18} /> Dashboard Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile" className={activeStyle}>
                <CgProfile size={18} /> Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/myContribution" className={activeStyle}>
                <SiContributorcovenant size={18} /> My Contribution
              </NavLink>
            </li>

            <div className="divider my-4 opacity-50"></div>
            <li className="menu-title opacity-40 mb-2 font-black uppercase text-[10px] tracking-widest">
              Community
            </li>

            <li>
              <NavLink to="/dashboard/all-reports" className={activeStyle}>
                <FaUsers size={18} /> Global Reports
              </NavLink>
            </li>
          </ul>

          {/* Logout button at bottom */}
          <div className="mt-auto">
            <button className="btn btn-outline btn-error w-full rounded-xl font-black uppercase tracking-widest text-xs">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
