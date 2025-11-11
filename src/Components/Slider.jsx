import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image:
      "https://i.ibb.co.com/Ld09m7Dj/photo-1572213426852-0e4ed8f41ff6-ixlib-rb-4-1.jpg",
    text: "🌊 Refresh the Earth — Keep It Clean",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co.com/Hf3jQ833/what-happens-when-you-cleanup-the-great-pacific-garbage-patch.jpg",
    text: "🌿 Nature is our Home — Protect It",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/Lhx59txg/free-video-3186590.jpg",
    text: "☀️ Together for a Greener Future",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000); // auto change every 4 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={slides[current].id}
          src={slides[current].image}
          alt="slider"
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <motion.h2
          key={slides[current].text}
          className="text-white text-2xl md:text-4xl font-semibold text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {slides[current].text}
        </motion.h2>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
