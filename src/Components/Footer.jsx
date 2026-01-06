import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { FaFacebook, FaXTwitter, FaYoutube, FaLinkedin, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-300 pt-16 pb-8 px-6 lg:px-20 mt-20 border-t border-white/5">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-30"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* --- Brand & Description --- */}
        <div className="space-y-5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
              <img src={logo} alt="CleanCity Logo" className="w-10 h-10 object-contain" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white">
              Clean<span className="text-secondary">City</span>
            </h2>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400">
            Building a sustainable future through community action. Join our mission to keep our urban spaces clean, green, and healthy for everyone. 🌱
          </p>
          <div className="flex gap-4 pt-2">
            {[ 
              { icon: <FaFacebook />, color: "hover:bg-blue-600", link: "https://facebook.com" },
              { icon: <FaXTwitter />, color: "hover:bg-slate-700", link: "https://x.com" },
              { icon: <FaYoutube />, color: "hover:bg-red-600", link: "https://youtube.com" },
              { icon: <FaLinkedin />, color: "hover:bg-blue-700", link: "https://linkedin.com" }
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.link} 
                target="_blank" 
                className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white transition-all duration-300 ${social.color} hover:-translate-y-1 shadow-lg`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* --- Quick Navigation --- */}
        <div>
          <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span> Quick Links
          </h6>
          <ul className="space-y-4 text-sm font-medium">
            {["Home", "All Issues", "Add Issue", "My Contribution"].map((item) => (
              <li key={item}>
                <Link 
                  to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`} 
                  className="hover:text-secondary hover:translate-x-2 flex items-center transition-all duration-300"
                >
                  <span className="opacity-0 hover:opacity-100 transition-opacity mr-2">→</span> {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Support & Contact --- */}
        <div>
          <h6 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span> Contact Info
          </h6>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 group">
              <FaLocationDot className="mt-1 text-secondary group-hover:scale-120 transition-transform" />
              <span>123 Green Way, Eco District<br />Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaPhone className="text-secondary group-hover:scale-120 transition-transform" />
              <span>+880 1234 567 890</span>
            </li>
            <li className="flex items-center gap-3 group">
              <FaEnvelope className="text-secondary group-hover:scale-120 transition-transform" />
              <span className="hover:text-white cursor-pointer transition-colors">support@cleancity.com</span>
            </li>
          </ul>
        </div>

        {/* --- Newsletter/Call to Action --- */}
        <div className="space-y-5">
          <h6 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-secondary rounded-full"></span> Stay Updated
          </h6>
          <p className="text-sm text-slate-400">Get the latest news on cleanup drives and community rewards.</p>
          <div className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-secondary transition-all text-sm w-full"
            />
            <button className="bg-secondary hover:bg-secondary/80 text-secondary-content font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-secondary/10">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider uppercase font-semibold text-slate-500">
          <p>© {new Date().getFullYear()} CleanCity. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
          <p className="text-secondary animate-pulse">Together for a greener tomorrow 🌍</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;