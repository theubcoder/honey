"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  Star,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Subscribe from "@/components/subscribe";

/* ── Testimonial ── */
const testimonial = {
  stars: 5,
  title: "Best Online Fashion Site",
  quote:
    "Fashion lover combining classic elegance with modern trends. Curating stylish, wearable outfits that express confidence and personality every day.",
  avatar: "/images/products/Product.png",
  name: "Marie Forleo",
  role: "Founder",
};

export default function CheckoutPage() {
  const {
    cartItems,
    getSubtotal,
    amountForFreeDelivery,
    FREE_DELIVERY_THRESHOLD,
  } = useCart();

  const [showLogin, setShowLogin] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [shipping, setShipping] = useState("local");
  const [payment, setPayment] = useState("bank");
  const [shipDifferent, setShipDifferent] = useState(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = getSubtotal();
  const remaining = amountForFreeDelivery();
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const shippingCost = shipping === "local" ? 5 : 10;
  const total = subtotal + shippingCost;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div
          className="bg-cover bg-center bg-no-repeat py-8"
          style={{ backgroundImage: `url("/images/pattern.jpg")` }}
        >
          <div className="max-w-[85rem] mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight size={13} />
              <span className="text-black font-medium">Checkout</span>
            </div>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
        </div>

        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10">
          {/* Login Banner */}
          <div className="border border-gray-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600">
              Returning customer?{" "}
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="text-primary font-semibold hover:underline cursor-pointer"
              >
                Click here to login
              </button>
            </p>
            {showLogin && (
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 flex-1"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 flex-1"
                />
                <button className="bg-primary hover:bg-black hover:text-white text-black font-bold py-2.5 px-6 rounded-full text-sm transition-colors cursor-pointer">
                  LOGIN
                </button>
              </div>
            )}
          </div>

          {/* ── Two Column Layout ── */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* ── LEFT: Billing Details ── */}
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-6">Billing Details</h2>

              <div className="space-y-4">
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Last name (optional)
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Country / Region <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 appearance-none bg-white cursor-pointer">
                      <option>India</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Australia</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="House number, Area and Street"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    State / County <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 appearance-none bg-white cursor-pointer">
                      <option>Gujarat</option>
                      <option>Maharashtra</option>
                      <option>Rajasthan</option>
                      <option>Delhi</option>
                      <option>Karnataka</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Postcode */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Postcode / ZIP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                  />
                </div>

                {/* Create Account */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createAccount}
                    onChange={(e) => setCreateAccount(e.target.checked)}
                    className="accent-black w-4 h-4"
                  />
                  <span className="text-sm text-gray-600">
                    Create an account?
                  </span>
                </label>

                {/* Ship to Different Address */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shipDifferent}
                    onChange={(e) => setShipDifferent(e.target.checked)}
                    className="accent-black w-4 h-4"
                  />
                  <span className="text-sm font-semibold">
                    Ship To A Different Address?
                  </span>
                </label>

                {/* Order Notes */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Order notes (optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Notes about your order, e.g. special notes for delivery"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="lg:w-[420px] shrink-0">
              <div className="sticky top-28 space-y-6">
                {/* Free Delivery Progress */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute -top-3 transform -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${progress}%` }}
                    >
                      <Truck className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-center text-sm mt-3 text-gray-600">
                    {remaining > 0 ? (
                      <>
                        Add items worth{" "}
                        <span className="font-bold text-black">
                          ${remaining}
                        </span>{" "}
                        for{" "}
                        <span className="font-bold text-black">
                          FREE Delivery!
                        </span>
                      </>
                    ) : (
                      <span className="font-bold text-green-600">
                        You get FREE Delivery!
                      </span>
                    )}
                  </p>
                </div>

                {/* Your Order */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-bold text-lg mb-4">Your Order</h3>

                  {/* Product Header */}
                  <div className="flex items-center justify-between text-sm font-semibold text-gray-500 pb-3 border-b border-gray-100">
                    <span>Product</span>
                    <span>Price</span>
                  </div>

                  {/* Product List */}
                  {cartItems.length === 0 ? (
                    <p className="text-sm text-gray-400 py-4 text-center">
                      No items in cart
                    </p>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 py-3"
                        >
                          <div className="w-[50px] h-[50px] bg-[#F5F5F5] rounded-lg flex items-center justify-center shrink-0">
                            <Image
                              src={item.image}
                              alt={item.description}
                              width={40}
                              height={40}
                              className="object-contain max-h-[40px]"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm line-clamp-2 leading-snug">
                              {item.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              x{item.quantity}
                            </p>
                          </div>
                          <span className="text-sm font-bold shrink-0">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="py-3 border-t border-gray-100">
                    <span className="text-sm font-semibold block mb-2">
                      Shipping
                    </span>
                    <label className="flex items-center justify-between cursor-pointer mb-1.5">
                      <span className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="checkout-shipping"
                          value="local"
                          checked={shipping === "local"}
                          onChange={() => setShipping("local")}
                          className="accent-black"
                        />
                        Local pickup
                      </span>
                      <span className="text-sm font-semibold">$5</span>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="checkout-shipping"
                          value="flat"
                          checked={shipping === "flat"}
                          onChange={() => setShipping("flat")}
                          className="accent-black"
                        />
                        Flat rate
                      </span>
                      <span className="text-sm font-semibold">$10</span>
                    </label>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <span className="font-bold text-base">Total</span>
                    <span className="font-bold text-lg">${total}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <button
                    onClick={() => setShowPromo(!showPromo)}
                    className="text-sm text-gray-600 cursor-pointer w-full text-left"
                  >
                    Have a promo code?{" "}
                    <span className="text-primary font-semibold">
                      Click here to enter your code.
                    </span>
                  </button>
                  {showPromo && (
                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500"
                      />
                      <button className="bg-primary hover:bg-black hover:text-white text-black font-bold py-2.5 px-5 rounded-full text-sm transition-colors cursor-pointer">
                        APPLY
                      </button>
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                  {/* Direct Bank Transfer */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={payment === "bank"}
                        onChange={() => setPayment("bank")}
                        className="accent-black"
                      />
                      <span className="text-sm font-semibold">
                        Direct bank transfer
                      </span>
                    </label>
                    {payment === "bank" && (
                      <p className="text-xs text-gray-500 mt-2 ml-6 leading-relaxed">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
                      </p>
                    )}
                  </div>

                  {/* Check Payments */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="check"
                      checked={payment === "check"}
                      onChange={() => setPayment("check")}
                      className="accent-black"
                    />
                    <span className="text-sm font-semibold">
                      Check payments
                    </span>
                  </label>

                  {/* Cash on Delivery */}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="accent-black"
                    />
                    <span className="text-sm font-semibold">
                      Cash on delivery
                    </span>
                  </label>

                  {/* Privacy */}
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our{" "}
                    <span className="font-bold text-black">
                      privacy policy
                    </span>
                    .
                  </p>

                  {/* Place Order */}
                  <button className="w-full bg-primary hover:bg-black hover:text-white text-black font-bold py-3.5 rounded-full text-sm transition-colors cursor-pointer">
                    PLACE ORDER
                  </button>
                </div>

                {/* Safe Checkout */}
                <div className="border border-gray-200 rounded-xl p-5 text-center">
                  <p className="text-xs text-gray-400 mb-2">
                    Guaranteed Safe And Secure Checkout
                  </p>
                  <Image
                    src="/images/payment.png"
                    alt="Payment Methods"
                    width={250}
                    height={25}
                    className="object-contain mx-auto"
                  />
                </div>

                {/* Buy With Confidence */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-bold text-base mb-1">
                    Buy With Confidence
                  </h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Join Over 20,000+ Satisfied Customers Worldwide
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck size={16} className="text-primary shrink-0" />
                      Secure Payments, Guaranteed Privacy
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <RotateCcw size={16} className="text-primary shrink-0" />
                      Hassle-Free Returns and Refunds
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-600">
                      <Zap size={16} className="text-primary shrink-0" />
                      Fast and Reliable Shipping
                    </li>
                  </ul>
                </div>

                {/* Testimonial */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-4 h-4 ${
                          n <= testimonial.stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm mb-2">
                    {testimonial.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed italic mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{testimonial.name}</p>
                      <p className="text-xs text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <Subscribe />
    </>
  );
}
