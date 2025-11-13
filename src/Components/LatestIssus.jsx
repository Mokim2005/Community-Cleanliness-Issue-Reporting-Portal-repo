import React from "react";
import { useLoaderData } from "react-router";

import LatestIssusCard from "./LatestIssusCard";

const LatestIssus = () => {
  const latestData = useLoaderData();

  return (
    <div>
        <h1>Latest Issus Card</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {latestData?.map((data) => (
          <LatestIssusCard data={data}></LatestIssusCard>
        ))}
      </div>
    </div>
  );
};

export default LatestIssus;
