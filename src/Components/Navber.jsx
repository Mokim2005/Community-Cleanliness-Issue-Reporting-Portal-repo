import React, { use, useEffect, useState } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Navber = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState("light");
  console.log("this is navber user info".user);

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    localStorage.setItem("theme", theme);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Logout
  const handleLogOut = () => {
    logOut()
      .then(() => {
        alert("You logged out successfully!");
      })
      .catch((error) => console.log(error));
  };

  // Menu links
  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  px-3 py-2 rounded-lg"
              : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/issus"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white px-3 py-2 rounded-lg"
              : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
          }
        >
          All Issues
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addIssus"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-3 py-2 rounded-lg"
                  : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
              }
            >
              Add Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myIssus"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-3 py-2 rounded-lg"
                  : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
              }
            >
              My Issues
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myContribution"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-3 py-2 rounded-lg"
                  : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
              }
            >
              My Contribution
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 lg:px-8">
      {/* Left side */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img className="w-[45px]" src={logo} alt="Logo" />
          <span className="font-bold text-xl">CleanCity</span>
        </NavLink>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost text-xl tooltip"
          data-tip={theme === "light" ? "Dark Mode" : "Light Mode"}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>

        {/* User Info */}
        {user ? (
          <div className="flex items-center gap-2">
            {user.photoURL && (
              <img
                src={user?.photoURL}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-primary object-cover"
              />
            )}
            <button
              onClick={handleLogOut}
              className="btn btn-primary btn-sm normal-case"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-primary btn-sm normal-case">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navber;
