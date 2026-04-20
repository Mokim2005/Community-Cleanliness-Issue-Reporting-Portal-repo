import React from "react";

const HowItWorks = () => {
  return (
    <div className="my-12 px-4">
      <h1 className="text-3xl text-primary text-center font-bold mb-8">
        How It Works
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        
        {/* Step 1 */}
        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-primary">1</h2>
          <h3 className="text-xl font-semibold mt-2">Report Issue</h3>
          <p className="mt-2 text-sm">
            Users can report problems like garbage, potholes or water leakage.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-primary">2</h2>
          <h3 className="text-xl font-semibold mt-2">Admin Review</h3>
          <p className="mt-2 text-sm">
            Authorities verify and assign the issue to responsible teams.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 bg-base-200 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-primary">3</h2>
          <h3 className="text-xl font-semibold mt-2">Problem Solved</h3>
          <p className="mt-2 text-sm">
            The issue gets resolved and users can track the progress.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HowItWorks;