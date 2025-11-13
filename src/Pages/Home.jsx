import React from "react";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import Cards from "../Components/Card";
import TotalUser from "../Components/TotalUser";
import { ToastContainer } from "react-toastify";

import { useLoaderData } from "react-router";
import LatestIssusCard from "../Components/LatestIssusCard";
import VolunteerCTA from "../Components/VolunteerCTA";

const Home = () => {
  const latestData = useLoaderData();
  return (
    <div>
      <title>Home</title>
      <Banner></Banner>
      <TotalUser></TotalUser>
      {/* <VolunteerCTA></VolunteerCTA> */}
      <Slider></Slider>
      <Cards></Cards>
      <ToastContainer></ToastContainer>
      <div>
        <h1 className="text-3xl text-primary text-center my-4 font-bold">
          Latest Complain
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
          {latestData?.map((data) => (
            <LatestIssusCard data={data}></LatestIssusCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
