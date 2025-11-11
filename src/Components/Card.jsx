import React from "react";
// import { Trash2, Home, MapPin, Tool } from "lucide-react";
import { motion } from "framer-motion";

// IssueCategoryCards.jsx
// Usage: import IssueCategoryCards from "./IssueCategoryCards"; then <IssueCategoryCards />

const cards = [
  {
    id: "garbage",
    title: "Garbage",
    desc: "Overflowing bins, littered streets and public waste spots that need cleaning.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    // icon: <Trash2 className="w-6 h-6" />,
  },
  {
    id: "illegal-construction",
    title: "Illegal Construction",
    desc: "Unauthorized structures and constructions that violate local rules.",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
    // icon: <Home className="w-6 h-6" />,
  },
  {
    id: "broken-property",
    title: "Broken Public Property",
    desc: "Damaged benches, lights, signs or other community-owned assets.",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    // icon: <Tool className="w-6 h-6" />,
  },
  {
    id: "road-damage",
    title: "Road Damage",
    desc: "Potholes, cracks and other road problems that cause accidents or delays.",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80",
    // icon: <MapPin className="w-6 h-6" />,
  },
];

export default function Cards() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800">
        Reportable Issues
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <motion.article
            key={c.id}
            layout
            whileHover={{
              translateY: -6,
              boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
            }}
            className="relative rounded-2xl overflow-hidden h-56 bg-gray-100"
          >
            {/* background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${c.image})` }}
              aria-hidden
            />

            {/* soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent" />

            {/* content */}
            <div className="relative z-10 flex h-full flex-col justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-md backdrop-blur-sm">
                  {c.icon}
                </div>
                <h4 className="text-white text-lg font-semibold">{c.title}</h4>
              </div>

              <div className="flex items-end justify-between">
                <p className="text-xs text-white/90 line-clamp-2">{c.desc}</p>
                <button
                  className="ml-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow-sm"
                  aria-label={`Report ${c.title}`}
                >
                  Report
                </button>
              </div>
            </div>

            {/* subtle border */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-white/10" />
          </motion.article>
        ))}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Choose a category to create or view reports.
      </p>
    </section>
  );
}
