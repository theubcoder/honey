"use client";

import { useState } from "react";
import Link from "next/link";
import Subscribe from "@/components/subscribe";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["60 29th Street San Francisco,", "507 - Union Trade Center"],
  },
  {
    icon: Phone,
    title: "Call us",
    lines: ["(+92) 312-094-3245", "(+92) 301-562-8127"],
  },
  {
    icon: Mail,
    title: "Mail us",
    lines: ["support@honeypot.com", "info@honeypot.com"],
  },
  {
    icon: Clock,
    title: "Open time",
    lines: ["10:00AM - 6:00PM", "Monday - Saturday"],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

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
            <span className="font-medium text-gray-900">Contact Us</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Map + Form Section */}
      <section className="max-w-[85rem] mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Google Map */}
          <div className="w-full h-[350px] lg:h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119263355!2d-0.38178107691408904!3d51.52873519753597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1709000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            />
          </div>

          {/* Contact Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Get In Touch With Us
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              If you wish to directly reach us, Please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 transition-all"
              />
              <textarea
                name="message"
                placeholder="Your message (optional)"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5c518] focus:ring-2 focus:ring-[#f5c518]/20 transition-all resize-none"
              />
              <button
                type="submit"
                className="bg-[#f5c518] hover:bg-[#e0b415] text-gray-900 font-bold text-sm px-8 py-3 rounded-full transition-colors cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-[85rem] mx-auto px-4 pb-12 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md py-8 px-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              {item.lines.map((line, i) => (
                <p key={i} className="text-gray-500 text-sm leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe Section */}
      <Subscribe />
    </>
  );
}
