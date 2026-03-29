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
    <section className="px-5 max-w-[85rem] m-auto ">
      {/* Main container */}
      <div className="flex justify-center mt-10">
        {/* Scrollable + Responsive Wrapper */}
        <div className="custom-scroll flex gap-5 overflow-x-auto md:overflow-hidden px-2 pb-4">
          {card.map((e, idx) => {
            return (
              <div
                key={idx}
                className="min-w-[260px] md:min-w-0 border rounded-[10px] text-center p-8"
              >
                <Image
                  src={e.image}
                  alt={e.title}
                  width={80}
                  height={70}
                  className="mx-auto transition-transform duration-300 transform hover:-translate-y-2"
                  priority={idx === 0}
                />

                <h1 className="font-medium text-[18px] py-2">{e.title}</h1>
                <p>{e.paragraph}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* shop now cards  */}
      <div className="flex flex-wrap gap-10 my-20">
    
        <div className="flex bg-primary p-10 rounded-[5px] w-full xl:w-[48%]">
          <div className="w-90 text-start">
            <h3 className="text-4xl font-great-vibes">100% natural</h3>
            <h5 className="sm:text-4xl text-2xl font-bold mt-2 mb-10">Best Summer Sale 50% OFF</h5>
            <Link
              href={"/"}
              className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
          <Image
            src="/images/cup-tea.png"
            alt="Honey Image"
            width={260}
            height={30}
            className="mx-auto overflow-hidden transition-transform duration-300 transform hover:scale-110"
            // priority={idx === 0}
          />
        </div>

        <div className="flex text-start bg-primary p-10 rounded-[5px] w-full xl:w-[48%]">
          <div className="w-90">
            <h3 className="text-4xl font-great-vibes">Delight taste</h3>
            <h5 className="sm:text-4xl text-2xl font-bold mt-2 mb-10">100% Natural Bee Honeycomb</h5>
            <Link
              href={""}
              className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              SHOP NOW
            </Link>
          </div>
          <Image
            src="/images/honey-cumb.png"
            alt="Honey Image"
            width={260}
            height={30}
            className="mx-auto overflow-hidden transition-transform duration-300 transform hover:scale-110"
            // priority={idx === 0}
          />
        </div>
      </div>
    </section>
  );
};

export default Feature;
