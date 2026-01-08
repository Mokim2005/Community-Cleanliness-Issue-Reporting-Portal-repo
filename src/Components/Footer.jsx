import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import {
  FaFacebook,
  FaXTwitter,
  FaYoutube,
  FaLinkedin,
  FaEnvelope,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-base-200 text-base-content pt-16 pb-8 px-6 lg:px-20 mt-20 border-t border-base-300 transition-colors duration-500">
      {/* 🔹 Background Decorative Glow - থিম অনুযায়ী কালার অ্যাডজাস্ট হবে */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* --- Brand & Description --- */}
        <div className="space-y-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-primary/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
              <img
                src={logo}
                alt="CleanCity Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <h2 className="text-3xl font-black tracking-tighter">
              Clean<span className="text-primary">City</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed opacity-70">
            Building a sustainable future through community action. Join our
            mission to keep our urban spaces clean, green, and healthy for
            everyone. 🌱
          </p>
          <div className="flex gap-4 pt-2">
            {[
              {
                icon: <FaFacebook />,
                color: "hover:bg-blue-600",
                link: "https://facebook.com",
              },
              {
                icon: <FaXTwitter />,
                color: "hover:bg-slate-700",
                link: "https://x.com",
              },
              {
                icon: <FaYoutube />,
                color: "hover:bg-red-600",
                link: "https://youtube.com",
              },
              {
                icon: <FaLinkedin />,
                color: "hover:bg-blue-700",
                link: "https://linkedin.com",
              },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-base-300 border border-base-content/10 text-base-content transition-all duration-300 ${social.color} hover:text-white hover:-translate-y-1 shadow-md`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- Quick Navigation --- */}
        <div>
          <h6 className="font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span> Quick
            Links
          </h6>
          <ul className="space-y-4 text-sm font-bold">
            {[
              { name: "Home", path: "/" },
              { name: "All Issues", path: "/issus" }, 
              { name: "Add Issue", path: "/addIssus" },
              { name: "My Issues", path: "/myIssus" },
              { name: "About Us", path: "/aboutUs" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-primary hover:translate-x-2 flex items-center transition-all duration-300 opacity-70 hover:opacity-100"
                >
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Support & Contact --- */}
        <div>
          <h6 className="font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span> Contact
            Info
          </h6>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3 group">
              <FaLocationDot className="mt-1 text-primary group-hover:scale-125 transition-transform" />
              <span className="opacity-70">
                123 Green Way, Eco District
                <br />
                Dhaka, Bangladesh
              </span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaPhone className="text-primary group-hover:scale-125 transition-transform" />
              <span className="opacity-70">+880 1729 4343 23</span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaEnvelope className="text-primary group-hover:scale-125 transition-transform" />
              <span className="hover:text-primary cursor-pointer transition-colors opacity-70">
                support@cleancity.com , mamokim2005@gmail.com
              </span>
            </li>
          </ul>
        </div>

        {/* --- Newsletter/Call to Action --- */}
        <div className="space-y-5">
          <h6 className="font-bold text-lg mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span> Stay
            Updated
          </h6>
          <p className="text-sm opacity-70">
            Get the latest news on cleanup drives and community rewards.
          </p>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-base-300 border border-base-content/10 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm w-full"
            />
            <button className="btn btn-primary w-full rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="mt-16 pt-8 border-t border-base-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-widest uppercase font-black opacity-50">
          <p>© {new Date().getFullYear()} CleanCity. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-primary cursor-pointer transition-colors">
              Terms of Service
            </span>
          </div>
          <p className="text-primary font-bold">
            Together for a greener tomorrow 🌍
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
