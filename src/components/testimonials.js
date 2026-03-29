"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    image: "/images/profile.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/profile2.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/profile3.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/profile4.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat w-full overflow-hidden mt-20"
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      {/* Heading */}
      <div className="relative z-10 text-center mt-20 px-4">
        <h2 className="text-4xl font-great-vibes">Our Testimonials</h2>
        <h1 className="text-3xl sm:text-4xl font-bold">
          Our Client&apos;s Feedback
        </h1>
      </div>

      {/* Top Background Shape */}
      <Image
        src="/images/testimonials_bg_1.png"
        alt="bg-shape-top"
        height={250}
        width={250}
        className="absolute left-0 top-0 -z-10 pointer-events-none"
      />

      {/* Carousel Section */}
      <div className="relative flex max-w-[85rem] m-auto  mt-10 sm:p-0  z-10 justify-center items-center my-12 px-4 sm:px-8 md:px-16 lg:px-24">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((e, idx) => (
              <CarouselItem
                key={idx}
                className="basis-full md:basis-1/2"
              >
                <Card className="group relative overflow-hidden px-6 py-10 rounded-[5px] shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    
                    {/* Profile Image */}
                    <div className="w-[110px] h-[110px] rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={e.image}
                        alt={e.title}
                        width={110}
                        height={110}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col">
                      <h3 className="font-bold text-lg">
                        {e.title}
                      </h3>
                      <p className="my-4 text-gray-600 text-sm sm:text-base">
                        {e.description}
                      </p>
                      <Link href="">
                        <h5 className="font-bold text-primary">
                          Lawrence L. Nones
                        </h5>
                      </Link>
                    </div>

                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows (Thore Andar) */}
          <CarouselPrevious className="z-20 left-2 sm:left-4 md:left-[-15]" />
          <CarouselNext className="z-20 right-2 sm:right-4 md:right-[-15]" />
        </Carousel>
      </div>

      {/* Bottom Background Shape */}
      <Image
        src="/images/testimonials_bg_2.png"
        alt="bg-shape-bottom"
        height={300}
        width={300}
        className="absolute right-0 bottom-0 -z-10 pointer-events-none"
      />
    </section>
  );
}
