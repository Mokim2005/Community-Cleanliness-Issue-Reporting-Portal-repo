import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLeaf, FaShieldAlt, FaRocket } from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    { icon: <FaUsers size={24} />, label: "Community Members", value: "500+" },
    { icon: <FaLeaf size={24} />, label: "Issues Resolved", value: "120+" },
    {
      icon: <FaShieldAlt size={24} />,
      label: "Verified Reports",
      value: "100%",
    },
    { icon: <FaRocket size={24} />, label: "Response Rate", value: "24/7" },
  ];

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-16 px-4 md:px-8 relative overflow-hidden transition-colors duration-500">
      <title>About Us | CleanCity</title>

      {/* Decorative Background Elements - থিম অনুযায়ী অপাসিটি কমানো হয়েছে */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Our Mission for a <span className="text-primary">Greener</span>{" "}
            Future
          </h1>
          <p className="opacity-70 max-w-3xl mx-auto text-lg leading-relaxed font-medium">
            CleanCity is a community-driven platform designed to empower
            citizens to take direct action in keeping their neighborhoods clean
            and healthy.
          </p>
          <div className="h-1.5 w-24 bg-primary rounded-full mx-auto"></div>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold italic">Why CleanCity?</h2>
            <div className="space-y-4 opacity-80 leading-relaxed text-base">
              <p>
                Often, community cleanliness issues like overflowing garbage,
                broken drainage, or pollution go unnoticed for days. CleanCity
                bridges the gap between residents and action.
              </p>
              <p>
                Our platform allows anyone to report an issue, contribute funds
                for a cleanup, and track the progress in real-time. Transparent,
                efficient, and community-focused.
              </p>
            </div>

            <ul className="space-y-3">
              {[
                "Real-time Reporting & Tracking",
                "Transparent Funding System",
                "Verified Volunteer Network",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-primary font-black uppercase text-xs tracking-widest"
                >
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Glass Card with Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-96 bg-base-200 border border-base-300 rounded-[3rem] overflow-hidden group shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
              alt="Cleaning Community"
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/20 backdrop-blur-md p-6 rounded-full border border-primary/30">
                <FaLeaf className="text-primary text-4xl animate-bounce" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-base-200 border border-base-300 rounded-[2rem] text-center space-y-3 hover:bg-base-300 transition-all group shadow-sm"
            >
              <div className="text-primary mx-auto group-hover:scale-110 transition-transform flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-black">{stat.value}</h3>
              <p className="opacity-50 text-[10px] font-black uppercase tracking-[0.2em]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-12 bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 border border-base-300 rounded-[3rem] text-center space-y-6"
        >
          <h2 className="text-3xl md:text-5xl font-black">
            Ready to make a difference?
          </h2>
          <p className="opacity-60 max-w-xl mx-auto font-medium">
            Join hundreds of volunteers and citizens who are already working to
            make our city a better place to live.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button className="btn btn-primary px-10 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-primary/20">
              Join Now
            </button>
            <button className="btn btn-ghost border-base-300 px-10 rounded-2xl font-black uppercase tracking-widest bg-base-300/30">
              Our Work
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
