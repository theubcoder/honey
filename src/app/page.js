import HeroBanner from "@/components/hero-banner";
import Feature from "@/components/feature";
import Products from "@/components/products";
import ChooseUs from "@/components/chooseUs";
import AboutUs from "@/components/aboutUs";
import Feature_products from "@/components/feature_products";
import Testimonials from "@/components/testimonials";
import Blogs from "@/components/blogs";
import Subscribe from "@/components/subscribe";

export default function Home() {
  return (
    <div>
      {/* Hero Section  */}
      <HeroBanner />

      {/* Feature Section  */}
      <div className="flex-col text-center mt-20">
        <h2 className="text-4xl font-great-vibes">Best Feature</h2>
        <h1 className="text-3xl sm:text-4xl font-bold">
          We Provide The Best Quality
        </h1>
        <Feature />
      </div>

      {/* Products Section  */}
      <div className="text-center mt-20">
        <h2 className="text-4xl font-great-vibes">New Arrivals</h2>
        <h1 className="text-3xl sm:text-4xl  font-bold">latest products</h1>
        <Products />
      </div>

      {/* Choose us  */}
      <div className="my-10">
        <ChooseUs />
      </div>

      {/* About Us  */}
      <div className="my-10">
        <AboutUs />
      </div>

      {/* Feature_products */}

      <div className="text-center mt-20">
        <h2 className="text-4xl font-great-vibes">Popular Products</h2>
        <h1 className="text-3xl sm:text-4xl  font-bold">Featured Products</h1>
        <Feature_products />
      </div>

      {/* Testimonials */}
      <Testimonials />


      {/* Blogs  */}

      <div className="text-center mt-20">
        <h2 className="text-4xl font-great-vibes">From The Blog</h2>
        <h1 className="text-3xl sm:text-4xl  font-bold">Our Latest Blog</h1>
        <Blogs />
      </div>
      <Subscribe/>
    </div>
  );
}
