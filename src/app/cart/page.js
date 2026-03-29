"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  Truck,
  Heart,
  RotateCcw,
  Gift,
  Star,
  ShoppingCart,
  LoaderCircle,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Subscribe from "@/components/subscribe";

/* ── Testimonials ── */
const testimonials = [
  {
    stars: 5,
    title: "Best Online Fashion Site",
    quote:
      "Fashion lover combining classic elegance with modern trends. Curating stylish, wearable outfits that express confidence and personality every day!",
    avatar: "/images/products/Product.png",
    name: "Marie Forleo",
    role: "Founder",
  },
  {
    stars: 5,
    title: "Chic Styles, Timeless Trends",
    quote:
      "Style enthusiast mixing timeless pieces with trendy looks, curating outfits that express individuality, confidence, and creativity for every occasion.",
    avatar: "/images/products/Product2.png",
    name: "Tarsen Key",
    role: "Manager",
  },
  {
    stars: 4,
    title: "Bold Looks, Brave Souls",
    quote:
      "Fashion enthusiast blending bold trends with timeless pieces, creating unique, confident outfits with individuality and refine every experience.",
    avatar: "/images/products/Product3.png",
    name: "Jarves Lance",
    role: "Developer",
  },
];

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    amountForFreeDelivery,
    FREE_DELIVERY_THRESHOLD,
    addToCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [shipping, setShipping] = useState("local");
  const [interested, setInterested] = useState([]);
  const [productLoadingId, setProductLoadingId] = useState(null);
  const [now, setNow] = useState(Date.now());

  const subtotal = getSubtotal();
  const remaining = amountForFreeDelivery();
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);
  const shippingCost = shipping === "local" ? 5 : 10;
  const total = subtotal + shippingCost;

  useEffect(() => {
    fetch("/api/mock-data")
      .then((r) => r.json())
      .then((data) => {
        setInterested(data.categoryProducts?.slice(0, 4) || []);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getCountdown = useCallback(
    (target) => {
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      return `${days}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
    },
    [now]
  );

  const handleAddToCart = (product) => {
    setProductLoadingId(product.id);
    setTimeout(() => {
      addToCart({
        id: product.id,
        image: product.images[0],
        description: product.description,
        price: parseInt(product.pricing),
      });
      setProductLoadingId(null);
    }, 800);
  };

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
              <span className="text-black font-medium">Cart</span>
            </div>
            <h1 className="text-3xl font-bold">Cart</h1>
          </div>
        </div>

        {/* ──────── Main Cart Section ──────── */}
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <ShoppingCart size={64} className="text-gray-300" />
              <h2 className="text-2xl font-bold text-gray-400">
                Your cart is empty
              </h2>
              <Link
                href="/"
                className="bg-primary hover:bg-black hover:text-white text-black font-bold py-3 px-8 rounded-full text-sm transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* ── LEFT: Cart Summary ── */}
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-5">Cart Summary</h2>

                {/* Coupon Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-dashed border-gray-300 rounded-xl p-4 mb-6 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Use{" "}
                    <span className="font-bold text-black">GET20OFF</span>{" "}
                    coupon code to get 20% off on minimum order above $100
                  </p>
                  <button className="border-2 border-black text-black text-xs font-bold py-2 px-5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer whitespace-nowrap">
                    APPLY COUPON
                  </button>
                </div>

                {/* Cart Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-semibold text-gray-500 w-[50%]">
                          Product
                        </th>
                        <th className="text-center py-3 font-semibold text-gray-500">
                          Price
                        </th>
                        <th className="text-center py-3 font-semibold text-gray-500">
                          Quantity
                        </th>
                        <th className="text-right py-3 font-semibold text-gray-500">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-100"
                        >
                          {/* Product */}
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                              >
                                <X size={16} />
                              </button>
                              <div className="w-[60px] h-[60px] bg-[#F5F5F5] rounded-lg flex items-center justify-center shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.description}
                                  width={48}
                                  height={48}
                                  className="object-contain max-h-[48px]"
                                />
                              </div>
                              <p className="text-sm line-clamp-2 min-w-0">
                                {item.description}
                              </p>
                            </div>
                          </td>
                          {/* Price */}
                          <td className="text-center py-4 font-medium">
                            ${item.price}
                          </td>
                          {/* Quantity */}
                          <td className="py-4">
                            <div className="flex items-center justify-center">
                              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                  <Minus size={13} />
                                </button>
                                <span className="px-3 py-1.5 text-sm font-semibold select-none min-w-[32px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-2.5 py-1.5 hover:bg-gray-100 transition-colors cursor-pointer"
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                            </div>
                          </td>
                          {/* Subtotal */}
                          <td className="text-right py-4 font-bold">
                            ${item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Coupon Input + Update Cart */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code"
                      className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-gray-500 w-[180px]"
                    />
                    <button className="bg-primary hover:bg-black hover:text-white text-black text-xs font-bold py-2.5 px-5 rounded-full transition-colors cursor-pointer">
                      APPLY COUPON
                    </button>
                  </div>
                  <button className="border border-gray-300 text-gray-600 text-xs font-bold py-2.5 px-5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                    UPDATE CART
                  </button>
                </div>

                {/* ── Trust Badges ── */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 border-t border-gray-100 pt-8">
                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart size={22} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-sm">Loved By Thousands</h4>
                    <p className="text-xs text-gray-500">
                      Join Thousands of Happy and Satisfied Customers!
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <RotateCcw size={22} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-sm">Easy Returns</h4>
                    <p className="text-xs text-gray-500">
                      Enjoy Hassle-Free Returns and Exchanges – Shop Now!
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2 p-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift size={22} className="text-primary" />
                    </div>
                    <h4 className="font-bold text-sm">
                      Order Now & Get Gift!
                    </h4>
                    <p className="text-xs text-gray-500">
                      Order & Receive a Special Gift, Limited Time Only!
                    </p>
                  </div>
                </div>
              </div>

              {/* ── RIGHT: Cart Totals ── */}
              <div className="lg:w-[380px] shrink-0">
                <div className="border border-gray-200 rounded-xl p-6 sticky top-28">
                  {/* Free Delivery Progress */}
                  <div className="mb-5">
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

                  <h3 className="font-bold text-lg mb-4">Cart Totals</h3>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold">${subtotal}</span>
                  </div>

                  {/* Shipping */}
                  <div className="py-3 border-b border-gray-100">
                    <span className="text-gray-500 block mb-2">Shipping</span>
                    <label className="flex items-center justify-between cursor-pointer mb-1.5">
                      <span className="flex items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name="shipping"
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
                          name="shipping"
                          value="flat"
                          checked={shipping === "flat"}
                          onChange={() => setShipping("flat")}
                          className="accent-black"
                        />
                        Flat rate
                      </span>
                      <span className="text-sm font-semibold">$10</span>
                    </label>
                    <p className="text-xs text-gray-400 mt-2">
                      Shipping to Gujarat.{" "}
                      <button className="text-primary font-semibold hover:underline cursor-pointer">
                        Change address
                      </button>
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between py-4">
                    <span className="font-bold text-base">Total</span>
                    <span className="font-bold text-lg">${total}</span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="block w-full bg-primary hover:bg-black hover:text-white text-black font-bold py-3.5 rounded-full text-sm transition-colors cursor-pointer text-center"
                  >
                    PROCEED TO CHECKOUT
                  </Link>

                  {/* Safe Checkout */}
                  <div className="mt-4 text-center">
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
                </div>
              </div>
            </div>
          )}

          {/* ──────── Testimonials ──────── */}
          <div className="py-12 border-t border-gray-100 mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-4 h-4 ${
                          n <= t.stars
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-sm mb-2">{t.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed mb-5 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ──────── You May Be Interested In ──────── */}
          {interested.length > 0 && (
            <div className="py-10 border-t border-gray-100">
              <h2 className="text-2xl font-bold text-center mb-8">
                You May Be Interested In...
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {interested.map((product) => {
                  const discountPct =
                    product.originalPrice && product.pricing
                      ? Math.round(
                          (1 - product.pricing / product.originalPrice) * 100
                        )
                      : null;
                  const isSelectOptions = product.type === "select_options";
                  return (
                    <div
                      key={product.id}
                      className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      {/* Image */}
                      <div className="relative bg-[#F5F5F5] h-[200px] flex items-center justify-center p-4">
                        {discountPct && (
                          <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-bold w-10 h-10 flex items-center justify-center rounded-full z-10">
                            -{discountPct}%
                          </span>
                        )}
                        <Link href={`/product/${product.id}`}>
                          <Image
                            src={product.images[0]}
                            alt={product.description}
                            width={140}
                            height={140}
                            className="object-contain max-h-[160px] group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        {product.hasCountdown && product.countdownTarget && (
                          <span className="absolute bottom-3 left-3 bg-white text-[#e91e63] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-sm">
                            {getCountdown(product.countdownTarget)}
                          </span>
                        )}
                      </div>
                      {/* Info */}
                      <div className="p-4 flex flex-col items-center gap-2 text-center">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="text-sm font-medium line-clamp-2 leading-snug min-h-[2.5rem] hover:text-amber-600 transition-colors">
                            {product.description}
                          </h3>
                        </Link>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                              key={n}
                              className={`w-4 h-4 ${
                                n <= product.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {product.originalPrice && (
                            <span className="text-gray-400 line-through font-normal text-xs">
                              ${product.originalPrice}
                            </span>
                          )}
                          {product.priceMin && product.priceMax ? (
                            <span>
                              ${product.priceMin} – ${product.priceMax}
                            </span>
                          ) : (
                            <span>${product.pricing}</span>
                          )}
                        </div>
                        {isSelectOptions ? (
                          <Link
                            href={`/product/${product.id}`}
                            className="flex items-center justify-center gap-2 bg-primary hover:bg-black hover:text-white text-[11px] font-bold py-2.5 px-5 rounded-full transition-colors cursor-pointer mt-1 w-full"
                          >
                            <ShoppingCart size={13} /> SELECT OPTIONS
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product)}
                            disabled={productLoadingId === product.id}
                            className={`flex items-center justify-center gap-2 bg-primary hover:bg-black hover:text-white text-[11px] font-bold py-2.5 px-5 rounded-full transition-colors cursor-pointer mt-1 w-full ${
                              productLoadingId === product.id
                                ? "opacity-60 pointer-events-none"
                                : ""
                            }`}
                          >
                            <ShoppingCart size={13} />
                            ADD TO CART
                            {productLoadingId === product.id && (
                              <LoaderCircle
                                size={13}
                                className="animate-spin"
                              />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <Subscribe />
    </>
  );
}
