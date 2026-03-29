"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Subscribe from "@/components/subscribe";
import {
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const tabs = [
  {
    label: "Development",
    content:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
    content2:
      "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.",
  },
  {
    label: "Qualified team",
    content:
      "Our team consists of highly qualified professionals with years of experience in their respective fields. Each team member brings unique skills and perspectives that contribute to our collective success. We believe in continuous learning and development.",
    content2:
      "From product development to customer service, every member of our team is dedicated to delivering excellence. We invest in training and professional growth to ensure our team stays at the cutting edge of industry trends.",
  },
  {
    label: "Strategy",
    content:
      "Our strategy is built on three core pillars: innovation, customer-centricity, and sustainable growth. We constantly analyze market trends and customer feedback to refine our approach and deliver exceptional value to our customers.",
    content2:
      "By combining data-driven insights with creative thinking, we develop strategies that not only meet current market demands but also anticipate future trends. Our goal is to create lasting relationships with our customers.",
  },
];

const features = [
  {
    icon: ClipboardList,
    title: "Submit A Task",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: MessageSquare,
    title: "Send Message",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
  },
];

const stats = [
  { target: 18, suffix: "+", label: "Years" },
  { target: 200, suffix: "+", label: "Employee" },
  { target: 85, suffix: "%", label: "Page views" },
  { target: 27, suffix: "+", label: "Awards" },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!start || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

function StatItem({ target, suffix, label, inView }) {
  const count = useCountUp(target, 2000, inView);
  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-[#f5c518] mb-2">
        {count}{suffix}
      </p>
      <p className="text-gray-300 text-sm font-medium">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Breadcrumb Section */}
      <section
        className="bg-cover bg-center bg-no-repeat py-10"
        style={{ backgroundImage: `url("/images/pattern.jpg")` }}
      >
        <div className="max-w-[85rem] mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            <Link href="/" className="hover:text-[#f5c518] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">About Us</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            About Us
          </h1>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-[85rem] mx-auto px-4 py-12 md:py-16">
        {/* Tab Buttons */}
        <div className="flex justify-center gap-6 md:gap-10 mb-8 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(index)}
              className={`pb-3 text-sm md:text-base font-semibold transition-colors cursor-pointer ${
                activeTab === index
                  ? "text-[#f5c518] border-b-2 border-[#f5c518]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {tabs[activeTab].content}
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {tabs[activeTab].content2}
          </p>
        </div>

        {/* Image Gallery - matching the design layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {/* Left - Tall image spanning full height */}
          <div className="overflow-hidden rounded-xl md:row-span-2">
            <Image
              src="/images/about-banner-01.jpg"
              alt="Digital Marketing"
              width={600}
              height={600}
              className="w-full h-full min-h-[300px] md:min-h-[580px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right top - Delivery truck (wide) */}
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/about-banner-02.jpg"
              alt="Delivery Service"
              width={600}
              height={280}
              className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Right bottom - 2 images side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/about-banner-03.jpg"
                alt="Shop Online"
                width={300}
                height={280}
                className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/about-banner-04.jpg"
                alt="Work From Home"
                width={300}
                height={280}
                className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration Section */}
      <section className="bg-gray-100">
        <div className="max-w-[85rem] mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                Inspiration, Innovation,
                <br />
                And Opportunities.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Many Desktop Publishing Packages And Web Page Editors Now Use
                Lorem Ipsum As Their Default Model Text.
              </p>

              {/* Bullet Points */}
              <div className="space-y-4">
                {["Business's vision", "Our mission", "Our support"].map(
                  (item) => (
                    <div key={item} className="flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-[#f5c518]" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <Image
                src="/images/about-banner-05.png"
                alt="Innovation & Ideas"
                width={450}
                height={450}
                className="max-w-full h-auto drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-[85rem] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-[#fff7e6] flex items-center justify-center mb-5">
                <feature.icon className="w-7 h-7 text-[#f5c518]" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Counter Section */}
      <section
        ref={statsRef}
        className="relative bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url("/images/about-parallax.jpg")` }}
      >
        <div className="absolute inset-0" />
        <div className="relative max-w-[85rem] mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatItem key={stat.label} {...stat} inView={statsInView} />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Info Section */}
      <section className="max-w-[85rem] mx-auto px-4 py-12 md:py-16 text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
          Contact us
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          About Us Info
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-2xl mx-auto mb-8">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using &apos;Content here&apos;.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-[#f5c518] hover:bg-[#e0b415] text-gray-900 font-bold text-sm px-8 py-3 rounded-full transition-colors uppercase tracking-wide"
        >
          Click Here To Contact Us
        </Link>
      </section>

      {/* Subscribe */}
      <Subscribe />
    </>
  );
}
