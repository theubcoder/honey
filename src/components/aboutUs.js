import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <section className="py-10 sm:py-20">
      <div className="container mx-auto px-5 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Image Container */}
        <div className="flex justify-center">
          <Image
            src={"/images/about-img-1.jpg"}
            alt="Natural Honey"
            height={550}
            width={550}
            className="rounded-xl object-cover w-full h-auto max-w-[550px]"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col space-y-5">
          <h1 className="font-great-vibes text-4xl text-black">About Us</h1>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Natural Honey Is A Very Good Food For Health.
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry has been the industry&apos;s standard dummy text ever since the
            1500s when an type and scrambled it to make a type specimen book.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[200px]">
              <h3 className="font-bold my-2 text-lg">Best Organic Honey</h3>
              <p className="text-sm text-gray-500">There are many passages lorem Ipsum available.</p>
            </div>

            <div className="flex-1 min-w-[200px]">
              <h3 className="font-bold my-2 text-lg">Organic Honey Shop</h3>
              <p className="text-sm text-gray-500">There are many passages lorem Ipsum available.</p>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href={"#"}
              className="inline-block w-40 bg-primary text-black py-3 rounded-full text-[13px] font-bold hover:bg-black hover:text-white text-center transition-all duration-300 shadow-md"
            >
              READ MORE
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;