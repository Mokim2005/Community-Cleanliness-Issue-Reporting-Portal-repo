import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Garbage Issue",
    subtitle: "Help us clean our streets!",
    image:
      "https://images.unsplash.com/photo-1593531158912-d1c0f90a1443?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Community Cleaning",
    subtitle: "Join community clean-up drives",
    image:
      "https://images.unsplash.com/photo-1581091870620-d33bb51b4c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Sustainability Action",
    subtitle: "Make the earth greener and cleaner",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 overflow-hidden rounded-lg shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${
            index === current ? "block" : "hidden"
          } w-full h-64 md:h-96 relative`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center text-white p-4">
            <h2 className="text-2xl md:text-4xl font-bold">{slide.title}</h2>
            <p className="mt-2 text-lg md:text-xl">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Prev/Next Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-100"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 text-black rounded-full p-2 hover:bg-opacity-100"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`h-3 w-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
