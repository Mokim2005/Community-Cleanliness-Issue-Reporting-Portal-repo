import React from "react";

const ImpactSection = () => {
  return (
    <div className="my-10 px-4">
      <h1 className="text-3xl text-primary text-center font-bold mb-6">
        Community Impact
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-4xl font-bold text-primary">120+</h2>
          <p className="mt-2 text-lg">Issues Resolved</p>
        </div>

        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-4xl font-bold text-primary">80+</h2>
          <p className="mt-2 text-lg">Active Volunteers</p>
        </div>

        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-4xl font-bold text-primary">25+</h2>
          <p className="mt-2 text-lg">Clean-up Drives</p>
        </div>

      </div>
    </div>
  );
};

export default ImpactSection;