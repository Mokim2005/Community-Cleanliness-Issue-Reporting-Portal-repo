import React from "react";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import Cards from "../Components/Card";
import TotalUser from "../Components/TotalUser";
import { ToastContainer } from "react-toastify";

const Home = () => {
  return (
    <div>
      <title>Home</title>
      <Banner></Banner>
      <TotalUser></TotalUser>
      <Slider></Slider>
      <Cards></Cards>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Home;
