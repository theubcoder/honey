import Link from "next/link";
import Image from "next/image";
import React from "react";

const card = [
  {
    image: "/icons/organic.svg",
    title: "Organics Honey",
    paragraph: "Lorem Ipsum is simply dummy text the printin industry.",
  },
  {
    image: "/icons/forest.svg",
    title: "Forest Honey",
    paragraph: "Lorem Ipsum is simply dummy text the printin industry.",
  },
  {
    image: "/icons/farming.svg",
    title: "Farming Honey",
    paragraph: "Lorem Ipsum is simply dummy text the printin industry.",
  },
  {
    image: "/icons/creamed.svg",
    title: "Creamed Honey",
    paragraph: "Lorem Ipsum is simply dummy text the printin industry.",
  },
];

const Feature = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10">
      <div className="max-w-[85rem] mx-auto">
      {/* Main container */}
      <div className="mt-10">
        {/* Scrollable + Responsive Wrapper */}
        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {card.map((e, idx) => {
            return (
              <div
                key={idx}
                className="min-w-[260px] sm:min-w-[280px] border rounded-[10px] text-center p-6 sm:p-8 snap-center"
              >
                <Image
                  src={e.image}
                  alt={e.title}
                  width={60}
                  height={60}
                  className="mx-auto transition-transform duration-300 transform hover:-translate-y-2"
                  priority={idx === 0}
                />

                <h1 className="font-medium text-base sm:text-[18px] py-2">{e.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600">{e.paragraph}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* shop now cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 my-16 sm:my-20">

        <div className="flex flex-col-reverse sm:flex-row bg-primary p-6 sm:p-10 rounded-[5px]">
          <div className="text-center sm:text-start mb-4 sm:mb-0 flex-1">
            <h3 className="text-2xl sm:text-4xl font-great-vibes">100% natural</h3>
            <h5 className="sm:text-4xl text-xl font-bold mt-2 mb-6 sm:mb-10">Best Summer Sale 50% OFF</h5>
            <Link
              href={"/"}
              className="inline-block bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
          <div className="flex-shrink-0 sm:ml-6">
            <Image
              src="/images/cup-tea.png"
              alt="Honey Image"
              width={260}
              height={260}
              className="w-[180px] sm:w-[260px] mx-auto overflow-hidden transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row text-start bg-primary p-6 sm:p-10 rounded-[5px]">
          <div className="text-center sm:text-start mb-4 sm:mb-0 flex-1">
            <h3 className="text-2xl sm:text-4xl font-great-vibes">Delight taste</h3>
            <h5 className="sm:text-4xl text-xl font-bold mt-2 mb-6 sm:mb-10">100% Natural Bee Honeycomb</h5>
            <Link
              href={""}
              className="inline-block bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
          <div className="flex-shrink-0 sm:ml-6">
            <Image
              src="/images/honey-jar.png"
              alt="Honey Image"
              width={260}
              height={260}
              className="w-[180px] sm:w-[260px] mx-auto overflow-hidden transition-transform duration-300 transform hover:scale-110"
            />
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Feature;
