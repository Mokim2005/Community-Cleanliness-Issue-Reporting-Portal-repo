import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import { FaSun, FaMoon, FaSignOutAlt, FaUser, FaHistory } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  // context থেকে ডাটা নেওয়ার সঠিক পদ্ধতি
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Logout!",
      // থিম অনুযায়ী ডায়ালগ কালার ফিক্স
      background: theme === "dark" ? "#1d232a" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "Successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: theme === "dark" ? "#1d232a" : "#fff",
              color: theme === "dark" ? "#fff" : "#000",
            });
          })
          .catch(() => toast.error("Logout failed!"));
      }
    });
  };

  // থিম ফ্রেন্ডলি লিংক স্টাইল
  const navLinkStyles = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-bold transition-all duration-300 group ${
      isActive ? "text-primary" : "text-base-content/80 hover:text-primary"
    }`;

  const linkIndicator = (isActive) => (
    <span
      className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 ${
        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
      }`}
    ></span>
  );

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          {({ isActive }) => <>Home {linkIndicator(isActive)}</>}
        </NavLink>
      </li>
      <li>
        <NavLink to="/issus" className={navLinkStyles}>
          {({ isActive }) => <>All Issues {linkIndicator(isActive)}</>}
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addIssus" className={navLinkStyles}>
              {({ isActive }) => <>Add Issue {linkIndicator(isActive)}</>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/myIssus" className={navLinkStyles}>
              {({ isActive }) => <>My Issues {linkIndicator(isActive)}</>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className={navLinkStyles}>
              {({ isActive }) => <>Dashboard {linkIndicator(isActive)}</>}
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/aboutUs" className={navLinkStyles}>
          {({ isActive }) => <>About Us {linkIndicator(isActive)}</>}
        </NavLink>
      </li>
    </>
  );

  return (
    // bg-base-100 এবং text-base-content থিম পরিবর্তন হ্যান্ডেল করবে
    <div className="sticky top-0 z-[100] w-full bg-base-100/80 backdrop-blur-md border-b border-base-300 shadow-sm transition-colors duration-300">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden text-base-content mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-2xl bg-base-200 rounded-2xl w-64 border border-base-300"
            >
              {links}
            </ul>
          </div>

          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="p-1.5 bg-primary/10 rounded-xl">
              <img className="w-9 h-9 object-contain" src={logo} alt="Logo" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-base-content">
              Clean<span className="text-primary">City</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 list-none">{links}</ul>
        </div>

        <div className="navbar-end gap-2 md:gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-circle btn-ghost text-base-content hover:bg-primary/10 transition-all duration-300"
          >
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100 overflow-hidden transition-all duration-300 hover:scale-110"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL || "https://ui-avatars.com/api/?name=User"
                    }
                    alt="Profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-4 p-3 shadow-2xl menu dropdown-content bg-base-200 border border-base-300 rounded-2xl w-64 animate-in slide-in-from-top-2"
              >
                <li className="px-4 py-3 mb-2 bg-base-300/50 rounded-xl">
                  <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                    Signed in as
                  </p>
                  <p className="font-bold truncate text-base-content">
                    {user?.displayName || "Member"}
                  </p>
                </li>
                <li>
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center gap-3 p-3 hover:bg-primary/10 rounded-xl transition-colors text-base-content"
                  >
                    <FaUser className="text-primary" /> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myContribution"
                    className="flex items-center gap-3 p-3 hover:bg-primary/10 rounded-xl transition-colors text-base-content"
                  >
                    <FaHistory className="text-primary" /> Contributions
                  </Link>
                </li>
                <div className="divider opacity-10 my-1"></div>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-3 p-3 text-error hover:bg-error/10 rounded-xl transition-colors font-bold"
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary btn-sm md:btn-md rounded-xl shadow-lg shadow-primary/20 px-6 font-black uppercase tracking-widest text-xs"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
