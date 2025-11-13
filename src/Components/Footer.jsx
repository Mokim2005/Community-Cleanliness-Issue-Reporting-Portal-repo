import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { FaFacebook, FaXTwitter, FaYoutube, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-6 px-6 lg:px-20 mt-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* --- Brand Section --- */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-3">
            <img src={logo} alt="CleanCity Logo" className="w-[60px]" />
            <h2 className="text-2xl font-bold text-primary">CleanCity</h2>
          </Link>
          <p className="text-sm text-gray-600 leading-relaxed">
            CleanCity is a community-driven platform dedicated to promoting
            cleanliness, sustainability, and public awareness. Report issues,
            contribute to cleanups, and make your city a better place 🌱.
          </p>
        </div>

        {/* --- Quick Links --- */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-primary  hover:text-green-600">
            Quick Links
          </h6>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/issus"
                className="hover:text-primary transition-colors duration-200"
              >
                All Issues
              </Link>
            </li>
            <li>
              <Link
                to="/addIssus"
                className="hover:text-primary transition-colors duration-200"
              >
                Add Issue
              </Link>
            </li>
            <li>
              <Link
                to="/myContribution"
                className="hover:text-primary transition-colors duration-200"
              >
                My Contribution
              </Link>
            </li>
          </ul>
        </div>

        {/* --- About --- */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-primary  hover:text-green-600">About</h6>
          <ul className="space-y-2 text-gray-600">
            <li>
              <a className="hover:text-primary transition-colors duration-200">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors duration-200">
                Our Mission
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors duration-200">
                Community Support
              </a>
            </li>
            <li>
              <a className="hover:text-primary transition-colors duration-200">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* --- Social Media --- */}
        <div>
          <h6 className="text-lg font-semibold mb-3 text-primary  hover:text-green-600">
            Connect With Us
          </h6>
          <p className="text-gray-600 text-sm mb-3">
            Follow us on social media to stay updated on upcoming cleanup
            events, awareness campaigns, and community drives.
          </p>
          <div className="flex items-center gap-4 text-2xl text-gray-600">
            <Link
              to="https://x.com/"
              target="_blank"
              className="hover:text-primary transition-all duration-200"
            >
              <FaXTwitter />
            </Link>
            <Link
              to="https://www.youtube.com/"
              target="_blank"
              className="hover:text-error transition-all duration-200"
            >
              <FaYoutube />
            </Link>
            <Link
              to="https://www.facebook.com/"
              target="_blank"
              className="hover:text-primary transition-all duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              to="https://www.linkedin.com/"
              target="_blank"
              className="hover:text-sky-600 transition-all duration-200"
            >
              <FaLinkedin />
            </Link>
          </div>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="border-t border-gray-300 mt-10 pt-4 text-center text-primary  hover:text-green-600 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold">CleanCity</span> — All Rights Reserved.
        <br />
        <span className="text-primary font-medium">
          Together for a cleaner tomorrow 🌍
        </span>
      </div>
    </footer>
  );
};

export default Footer;
