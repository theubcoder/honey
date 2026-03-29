"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Subscribe from "@/components/subscribe";
import {
  UserRound,
  MessageCircle,
  BadgeCheck,
  Plus,
  Minus,
} from "lucide-react";

const faqQuestions = [
  {
    title: "How Can You Help?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    title: "What Is A Return Policy?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    title: "What Payment Methods Do You Accept?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
  {
    title: "Do You Sell Gift Cards?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  },
];

const features = [
  {
    icon: UserRound,
    title: "Submit A Task",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: MessageCircle,
    title: "Send Message",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
];

const accordions = [
  {
    title: "Google search engine optimization",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "Complete Social Media Integration",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    title: "End-to-end encryption for messages",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

export default function FaqPage() {
  const [openAccordion, setOpenAccordion] = useState(0);

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
            <span className="font-medium text-gray-900">FAQs</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            FAQs
          </h1>
        </div>
      </section>

      {/* FAQ Info Section */}
      <section className="max-w-[85rem] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Title + Image */}
          <div>
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">
              FAQs
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Question
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <div className="relative">
              <Image
                src="/images/faq-banner.jpg"
                alt="FAQ"
                width={600}
                height={350}
                className="w-full rounded-xl object-cover"
              />
              {/* Bee mascot */}
              <Image
                src="/images/bee.png"
                alt="Bee"
                width={100}
                height={100}
                className="absolute -bottom-8 -right-4 md:right-4 w-20 md:w-24"
              />
            </div>
          </div>

          {/* Right - FAQ Questions */}
          <div className="space-y-6 pt-2">
            {faqQuestions.map((faq) => (
              <div key={faq.title}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards with bouncing icons */}
      <section className="max-w-[85rem] mx-auto px-4 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group text-center bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 mx-auto rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-5 group-hover:animate-bounce-twice">
                <feature.icon className="w-7 h-7 text-gray-700" strokeWidth={1.5} />
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

      {/* Display FAQ Accordions */}
      <section className="max-w-[85rem] mx-auto px-4 pb-12 md:pb-16">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">
            Pick one of 3 FAQ styles
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Display FAQ Accordions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto border border-gray-200 rounded-xl overflow-hidden">
          {accordions.map((item, index) => (
            <div
              key={item.title}
              className={index !== accordions.length - 1 ? "border-b border-gray-200" : ""}
            >
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === index ? -1 : index)
                }
                className={`w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer transition-colors ${
                  openAccordion === index
                    ? "bg-[#f5c518] text-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="font-semibold text-sm md:text-base">
                  {item.title}
                </span>
                {openAccordion === index ? (
                  <Minus className="w-5 h-5 shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAccordion === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 py-5">
                  {item.content.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-gray-500 text-sm leading-relaxed mb-3 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <Subscribe />
    </>
  );
}
