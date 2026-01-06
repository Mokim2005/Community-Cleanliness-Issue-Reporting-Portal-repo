import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router"; 
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import { FaSun, FaMoon, FaSignOutAlt, FaUser, FaCompass, FaPlusSquare, FaHistory } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = React.use(AuthContext); 
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your session!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6", // Primary Blue
      cancelButtonColor: "#ef4444",  // Error Red
      confirmButtonText: "Yes, Logout!",
      background: "#0f172a",         // ডার্ক থিমের সাথে ম্যাচিং ব্যাকগ্রাউন্ড
      color: "#fff",                 // সাদা টেক্সট
      backdrop: `rgba(0,0,123,0.1)`  // হালকা ব্লু ব্যাকড্রপ
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been logged out successfully.",
              icon: "success",
              background: "#0f172a",
              color: "#fff",
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch((error) => {
            console.error(error);
            toast.error("Logout failed! Please try again.");
          });
      }
    });
  };

  // Modern Link Styles with Animated Underline
  const navLinkStyles = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
      isActive
        ? "text-secondary font-bold"
        : "text-white/80 hover:text-white"
    }`;

  const linkIndicator = (isActive) => (
    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-secondary transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}`}></span>
  );

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          {({ isActive }) => (<>Home {linkIndicator(isActive)}</>)}
        </NavLink>
      </li>
      <li>
        <NavLink to="/issus" className={navLinkStyles}>
          {({ isActive }) => (<>All Issues {linkIndicator(isActive)}</>)}
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addIssus" className={navLinkStyles}>
              {({ isActive }) => (<>Add Issue {linkIndicator(isActive)}</>)}
            </NavLink>
          </li>
          <li>
            <NavLink to="/myIssus" className={navLinkStyles}>
              {({ isActive }) => (<>My Issues {linkIndicator(isActive)}</>)}
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/about" className={navLinkStyles}>
          {({ isActive }) => (<>About Us {linkIndicator(isActive)}</>)}
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-[100] w-full bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 shadow-2xl backdrop-blur-md bg-opacity-90 border-b border-white/10">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden text-white mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-50 p-4 shadow-2xl bg-slate-800 rounded-2xl w-64 border border-white/10 text-white">
              {links}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105">
            <div className="p-1.5 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.3)]">
               <img className="w-9 h-9 object-contain" src={logo} alt="Logo" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-white">
              Clean<span className="text-secondary">City</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-6 list-none">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden sm:flex btn btn-circle btn-ghost text-white/80 hover:text-secondary hover:bg-white/5 transition-all duration-500 ring-1 ring-white/10"
          >
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar transition-all duration-300 hover:ring-4 hover:ring-secondary/50 ring-2 ring-white/20 ring-offset-2 ring-offset-slate-900">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://ui-avatars.com/api/?name=User"} alt="Profile" />
                </div>
              </label>
              <ul tabIndex={0} className="mt-4 p-3 shadow-2xl menu dropdown-content bg-slate-900 border border-white/10 rounded-2xl w-64 text-white animate-in slide-in-from-top-2">
                <li className="px-4 py-3 mb-2 bg-white/5 rounded-xl">
                  <p className="text-xs text-secondary font-bold uppercase tracking-widest">Signed in as</p>
                  <p className="font-semibold truncate">{user?.displayName || "CleanCity Member"}</p>
                </li>
                <li>
                  <Link to="/profile" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
                    <FaUser className="text-secondary" /> Profile
                  </Link>
                </li>
                <li>
                  <Link to="/myContribution" className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-colors">
                    <FaHistory className="text-secondary" /> Contributions
                  </Link>
                </li>
                <div className="divider opacity-10 my-1"></div>
                <li>
                  <button onClick={handleLogOut} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors font-medium">
                    <FaSignOutAlt /> Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn bg-secondary border-none hover:bg-secondary/80 text-secondary-content font-bold px-8 rounded-xl shadow-lg shadow-secondary/20 transition-all hover:-translate-y-0.5 active:scale-95">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;