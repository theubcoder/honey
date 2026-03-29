import Image from "next/image";
import React from "react";

const ChooseUs = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat w-full overflow-hidden" // overflow-hidden taake images screen se bahar na nikalein
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      {/* 1. Left Decorative Image - Container se bahar taake edge par lage */}
      <div className="absolute hidden lg:block left-0 top-1/5 -translate-y-1/2 z-0">
        <Image 
          alt="honey-decor" 
          src={'/images/chooseUs-honey.png'} 
          height={500} 
          width={400} 
          className="object-contain"
        />
      </div>

      {/* 2. Right Decorative Image - Container se bahar taake edge par lage */}
      <div className="absolute hidden lg:block right-0 bottom-10 z-0">
        <Image 
          alt="bee" 
          src={'/images/bee.png'} 
          height={200} 
          width={200} 
          className="object-contain"
        />
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-10">
        <div className="text-center py-12">
          <h2 className="text-4xl font-great-vibes text-primary">Why Choose Us</h2>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Why Choose Our Products
          </h1>
        </div>

        {/* Icons and Bottle Grid */}
        <div className="flex basis-1/2 lg:flex-row items-center justify-center px-6 pb-20 gap-10 lg:gap-20">
          
          {/* Left Side Icons */}
          <div className="flex flex-col gap-12 sm:gap-20">
            <div className="max-w-[200px] text-center flex flex-col items-center gap-3">
              <div className="bg-white rounded-full p-4 shadow-md">
                <Image alt="icon" src={'/icons/bee-honey-icon.svg'} height={50} width={50} />
              </div>
              <h5 className="font-bold text-sm uppercase">Honey Production</h5>
              <p className="text-[11px] text-gray-800 leading-tight">Lorem Ipsum is simply dummy text the printing industry.</p>
            </div>
            
            <div className="max-w-[200px] text-center flex flex-col items-center gap-3">
              <div className="bg-white rounded-full p-4 shadow-md">
                <Image alt="icon" src={'/icons/honeycomb-icon.svg'} height={50} width={50} />
              </div>
              <h5 className="font-bold text-sm uppercase">Naturally Sweet</h5>
              <p className="text-[11px] text-gray-800 leading-tight">Lorem Ipsum is simply dummy text the printing industry.</p>
            </div>
          </div>

          {/* Center Bottle */}
          <div className="hidden md:block shrink-0">
            <Image alt="honey-bottle" src={'/images/honeyBottle.png'} height={500} width={450} className="object-contain" />
          </div>

          {/* Right Side Icons */}
          <div className="flex flex-col gap-12 sm:gap-20">
            <div className="max-w-[200px] text-center flex flex-col items-center gap-3">
              <div className="bg-white rounded-full p-4 shadow-md">
                <Image alt="icon" src={"/icons/honeyShop.svg"} height={50} width={50} />
              </div>
              <h5 className="font-bold text-sm uppercase">Honey Shop</h5>
              <p className="text-[11px] text-gray-800 leading-tight">Lorem Ipsum is simply dummy text the printing industry.</p>
            </div>
            
            <div className="max-w-[200px] text-center flex flex-col items-center gap-3 ">
              <div className="bg-white rounded-full p-4 shadow-md">
                <Image alt="icon" src={'/icons/bee-honey-icon.svg'} height={50} width={50} />
              </div>
              <h5 className="font-bold text-sm uppercase">100% Natural</h5>
              <p className="text-[11px] text-gray-800 leading-tight">Lorem Ipsum is simply dummy text the printing industry.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;