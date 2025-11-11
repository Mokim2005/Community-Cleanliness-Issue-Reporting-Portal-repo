import React from "react";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import Cards from "../Components/Card";
import TotalUser from "../Components/TotalUser";

const Home = () => {
  return (
    <div>
      <title>Home</title>
      <Banner></Banner>
      <TotalUser></TotalUser>
      <Slider></Slider>
      <Cards></Cards>
    </div>
  );
};

export default Home;
