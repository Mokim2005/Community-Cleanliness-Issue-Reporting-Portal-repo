import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { FaFacebook, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
      <nav>
        <Link to="/">
          <img className="w-[70px] cursor-pointer" src={logo} alt="" />
        </Link>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <Link to="https://x.com/">
            <FaXTwitter />
          </Link>
          <Link to="https://www.youtube.com/">
            <FaYoutube />
          </Link>
          <Link className="w-2"  to="https://www.facebook.com/">
            <FaFacebook></FaFacebook>
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
