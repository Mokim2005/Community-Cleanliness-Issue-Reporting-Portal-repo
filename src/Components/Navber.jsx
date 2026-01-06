import React, { use, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaCog,
  FaBell,
  FaChevronDown,
} from "react-icons/fa";

const Navber = () => {
  const { user, logOut } = use(AuthContext);
  const [theme, setTheme] = useState("light");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    localStorage.setItem("theme", savedTheme);
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
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  // Protected routes for logged-in users
  const protectedRoutes = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
    { path: "/settings", label: "Settings" },
    { path: "/notifications", label: "Notifications" },
  ];

  // Public routes (minimum 3)
  const publicRoutes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/services", label: "Services" },
  ];

  // Menu links based on authentication
  const getLinks = () => {
    const baseLinks = (
      <>
        {publicRoutes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-white px-3 py-2 rounded-lg"
                  : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
              }
              end
            >
              {route.label}
            </NavLink>
          </li>
        ))}
      </>
    );

    if (user) {
      return (
        <>
          {baseLinks}
          {protectedRoutes.map((route) => (
            <li key={route.path}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white px-3 py-2 rounded-lg"
                    : "hover:bg-primary hover:text-white px-3 py-2 rounded-lg"
                }
              >
                {route.label}
              </NavLink>
            </li>
          ))}
        </>
      );
    }

    return baseLinks;
  };

  // Advanced Profile Dropdown Menu
  const ProfileDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-base-200 transition-colors"
      >
        <div className="flex items-center gap-2">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-primary object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <FaUser size={16} />
            </div>
          )}
          <span className="font-medium hidden md:inline">
            {user.displayName || user.email?.split("@")[0]}
          </span>
          <FaChevronDown
            className={`transition-transform ${
              profileMenuOpen ? "rotate-180" : ""
            }`}
            size={12}
          />
        </div>
      </button>

      {profileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setProfileMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50">
            <div className="p-4 border-b border-base-300">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-primary object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <FaUser size={20} />
                  </div>
                )}
                <div>
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-base-content/70">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <NavLink
                to="/profile"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                <FaUser size={14} />
                <span>Profile</span>
              </NavLink>

              <NavLink
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                <FaCog size={14} />
                <span>Settings</span>
              </NavLink>

              <NavLink
                to="/notifications"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
                onClick={() => setProfileMenuOpen(false)}
              >
                <FaBell size={14} />
                <span>Notifications</span>
                <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                  3
                </span>
              </NavLink>
            </div>

            <div className="p-2 border-t border-base-300">
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  handleLogOut();
                }}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-error hover:text-error-content text-error transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50 px-4 lg:px-8 border-b border-base-300">
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
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box mt-3 w-64 p-3 shadow-lg border border-base-300"
          >
            {getLinks()}
            {user && <div className="divider my-2"></div>}
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2"
                    onClick={() => document.activeElement.blur()}
                  >
                    <FaUser size={14} />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogOut();
                      document.activeElement.blur();
                    }}
                    className="text-error hover:bg-error hover:text-error-content"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className="btn btn-primary btn-sm normal-case"
                  onClick={() => document.activeElement.blur()}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <img className="w-10" src={logo} alt="Logo" />
          <span className="font-bold text-xl md:text-2xl">CleanCity</span>
        </NavLink>
      </div>

      {/* Center - Desktop Navigation */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{getLinks()}</ul>
      </div>

      {/* Right side */}
      <div className="navbar-end flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle tooltip"
          data-tip={theme === "light" ? "Dark Mode" : "Light Mode"}
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>

        {/* Notifications (for logged in users) */}
        {user && (
          <button className="btn btn-ghost btn-circle relative">
            <FaBell size={20} />
            <span className="absolute -top-1 -right-1 bg-error text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        )}

        {/* User Section */}
        {user ? (
          <ProfileDropdown />
        ) : (
          <div className="flex items-center gap-2">
            <NavLink
              to="/login"
              className="btn btn-primary btn-sm md:btn-md normal-case"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-outline btn-sm md:btn-md normal-case"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navber;
