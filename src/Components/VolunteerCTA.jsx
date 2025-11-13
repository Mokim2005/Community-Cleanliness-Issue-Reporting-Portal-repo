import React from "react";

const JoinCleanDrive = () => {
  return (
    <section className="bg-green-50 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Join Our Community Clean Drive!
          </h2>
          <p className="text-gray-700 mb-6 text-lg">
            Become a volunteer and help make our community cleaner and greener.
            Participate in local clean-up drives and inspire others to
            contribute.
          </p>
          <a
            href="#signup"
            className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
          >
            Sign Up Now
          </a>
        </div>

        {/* Image or Illustration */}
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1596495577886-d920f1b3c7b2?auto=format&fit=crop&w=800&q=80"
            alt="Community Clean Drive"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinCleanDrive;
