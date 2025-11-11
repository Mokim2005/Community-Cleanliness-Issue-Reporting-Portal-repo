import React, { use } from "react";
import { NavLink } from "react-router";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthContext";

const Navber = () => {
  const { user, logOut } = use(AuthContext);

  const handleLogOut = () => {
    console.log("logout");
    logOut()
      .then(() => {
        alert("you log out succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/issus">All Issus</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/addIssus">Add Issus</NavLink>
          </li>
          <li>
            <NavLink to="/myIssus">My Issus</NavLink>
          </li>
          <li>
            <NavLink to="/myContribution">My Contribution</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink to="/" className="">
          <img className="w-[60px] cursor-pointer" src={logo} alt="" />
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <NavLink onClick={handleLogOut} className="btn btn-primary">
            SignOut
          </NavLink>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navber;
