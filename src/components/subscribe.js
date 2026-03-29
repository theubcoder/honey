"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Subscribe = () => {
  return (
    <section
      className=" m-auto relative isolate bg-cover bg-center bg-no-repeat overflow-hidden py-16 sm:py-20 px-4"
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      {/* Left / Center Background Shape */}
      <Image
        src="/images/subscribe1.png"
        alt="bg-shape-left"
        width={350}
        height={350}
        className="
          absolute 
          left-1/2 bottom-0 
          -translate-x-1/2 
          sm:left-0 sm:translate-x-0 
          -z-10 
          pointer-events-none
          opacity-30 sm:opacity-100
        "
      />

      {/* Content */}
      <div className="relative z-10 text-center flex flex-col gap-5 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Subscribe To Our Newsletter
        </h2>

        <p className="text-sm sm:text-base text-gray-700">
          Subscribe to our latest newsletter to get news about special discount.
        </p>

        {/* Input + Button */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
          <input
            className="
              bg-white 
              w-full sm:w-[400px] 
              rounded-full 
              px-5 py-3 
              outline-none 
              shadow-md
            "
            type="email"
            placeholder="Enter your email"
          />

          <Link
            href=""
            className="
              w-full sm:w-auto
              px-8 py-3 
              rounded-full 
              text-sm font-bold 
              bg-black text-white 
              text-center 
              transition-all duration-300
              hover:bg-gray-800
            "
          >
            SUBSCRIBE
          </Link>
        </div>
      </div>

      {/* Right Bottom Background Shape */}
      <Image
        src="/images/subscribe2.png"
        alt="bg-shape-right"
        width={300}
        height={300}
        className="absolute right-0 bottom-0 -z-10 pointer-events-none hidden sm:block"
      />
    </section>
  );
};

export default Subscribe;
