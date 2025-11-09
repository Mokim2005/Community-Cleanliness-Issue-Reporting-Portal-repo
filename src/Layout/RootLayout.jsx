import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto">
      <Navber></Navber>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
