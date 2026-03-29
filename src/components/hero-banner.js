"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    subtitle: "Best of spicy taste",
    title: "Lemon Creamed\nHoney Stash",
    image: "/images/banner1.png",
    link: "/shop/all",
    imageClass: "object-contain",
  },
  {
    subtitle: "Pure & Natural",
    title: "Golden Honey\nCollection",
    image: "/images/banner2.png",
    link: "/shop/all",
    imageClass: "object-contain sm:scale-125",
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);


  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-10 sm:py-16 min-h-[200px] sm:min-h-[500px] flex items-center">
        {/* Slide Content */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center px-8 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-2 sm:gap-4">
              {/* Text */}
              <div className="flex-1 space-y-3 sm:space-y-6 z-10">
                <p className="text-xl sm:text-2xl md:text-5xl text-gray-800 font-great-vibes">
                  {slide.subtitle}
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-black whitespace-pre-line leading-tight">
                  {slide.title}
                </h2>
                <Link
                  href={slide.link}
                  className="inline-block bg-black text-white px-5 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={400}
                  height={600}
                  className={`${slide.imageClass} max-h-[220px] sm:max-h-[500px]`}
                  priority={index === 0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 h-3 bg-black"
                : "w-3 h-3 bg-black/30 hover:bg-black/50"
            }`}
          />
        ))}
      </div>

      {/* Honey Dripping Border */}
      {/* <div
        className="absolute bottom-0 left-0 w-full z-20 h-[150px]"
        style={{
          backgroundImage: `url("/images/dropping-border.png")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "auto 100%",
          backgroundPosition: "top center",
        }}
      /> */}
    </section>
  );
}
