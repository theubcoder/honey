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
    image: "/images/blog.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/blog2.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/blog3.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    image: "/images/blog4.jpg",
    title: "Reliable Product, Consistently Delivers.",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

const honeySlider = [
  {
    image: "/images/honey_company.png",
    title: "Brand"
  },
  {
    image: "/images/honey_company2.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company3.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company4.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company5.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company2.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company3.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company4.png",
    title: "Brand"

  },
  {
    image: "/images/honey_company5.png",
    title: "Brand"

  },
];


export default function Blogs() {
  return (
    <section>
      {/* Carousel Section */}
      <div className="relative container m-auto z-10 flex justify-center items-center my-12 px-4 sm:px-8  lg:px-24">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((e, idx) => (
              <CarouselItem key={idx} className="basis-full md:basis-1/3">
                <Card className="group relative overflow-hidden border-none rounded-[5px] shadow-md hover:shadow-xl transition-all duration-300">
                  <CardContent className="flex flex-col items-center gap-0 p-0 text-center sm:text-left">
                    {/* Profile Image */}
                    <div className="w-full h-[300px] overflow-hidden flex-shrink-0">
                      <Image
                        src={e.image}
                        alt={e.title}
                        width={110}
                        height={110}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col px-6 py-4">
                      <h3 className="font-bold text-lg">{e.title}</h3>
                      <p className="my-4 text-gray-600 text-sm sm:text-base">
                        {e.description}
                      </p>
                      <Link href="">
                        <h5 className="font-bold text-black underline hover:text-primary">
                          Read More
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

      <div>
        {/* Conpany Brand */}
        <div className=" container relative  m-auto   flex justify-center items-center my-22 px-4 sm:px-8 md:px-16 lg:px-24">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {honeySlider.map((e, idx) => (
                <CarouselItem key={idx} className="basis-1/2 border-t-1  border-gray-300 pt-10 sm:basis-1/3 md:basis-1/5 lg:basis-1/6">
                  <Card className="group relative overflow-hidden transition-all duration-300 shadow-none border-none">
                    <CardContent className="flex flex-col items-center gap-6 text-center sm:text-left">
                      {/* Profile Image */}
                      <div className="w-full h-[120px]  overflow-hidden flex-shrink-0">
                        <Image
                          src={e.image}
                          alt={e.title}
                          width={200}
                          height={200}
                          className="object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Arrows (Thore Andar) */}
            {/* <CarouselPrevious className="z-20 left-2 sm:left-4 md:left-[-15]" />
            <CarouselNext className="z-20 right-2 sm:right-4 md:right-[-15]" /> */}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
