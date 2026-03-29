"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Heart,
  BarChart2,
  Share2,
  ChevronRight,
  ChevronLeft,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Minus,
  Plus,
  LoaderCircle,
  Check,
  X,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import Subscribe from "@/components/subscribe";

/* ── Rating Stars ── */
function RatingStars({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${
            n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      {count !== undefined && (
        <span className="text-gray-400 text-sm ml-1">({count} Reviews)</span>
      )}
    </div>
  );
}

/* ── Tabs ── */
const tabList = ["Description", "Reviews (0)", "Q & A", "Shipping & Returns"];

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="flex border-b border-gray-200 gap-1">
        {tabList.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-3 text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === i
                ? "border-b-2 border-yellow-400 text-black"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-6 text-sm text-gray-600 leading-relaxed min-h-[120px]">
        {activeTab === 0 && (
          <div>
            <h3 className="font-bold text-black text-base mb-3">Product Description</h3>
            <p>{product.details || product.description}</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 100% Pure and Natural Honey</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> No added sugar or preservatives</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Rich in antioxidants and natural enzymes</li>
              <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Cold-extracted to retain nutrients</li>
            </ul>
          </div>
        )}
        {activeTab === 1 && <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>}
        {activeTab === 2 && <p className="text-gray-400">No questions have been asked about this product yet.</p>}
        {activeTab === 3 && (
          <div>
            <h4 className="font-bold text-black mb-2">Shipping</h4>
            <p>Free shipping on orders over $100. Standard delivery takes 3-5 business days.</p>
            <h4 className="font-bold text-black mb-2 mt-4">Returns</h4>
            <p>Easy 30-day returns. Product must be unopened and in original packaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── About This Item ── */
function AboutSection({ product }) {
  return (
    <div className="py-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold mb-6">About This Item</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-4">
        <p>
          {product.details || product.description} Our honey is carefully sourced from trusted beekeepers who follow sustainable and ethical beekeeping practices. Each batch is tested for purity to ensure you receive only the finest quality honey.
        </p>
        <h3 className="text-lg font-bold text-black">The Honey</h3>
        <p>
          Honey is nature&apos;s oldest sweetener, valued through centuries for its incredible health benefits. It contains natural antioxidants, enzymes, and minerals that support your immune system, improve digestion, and provide sustained energy throughout the day.
        </p>
        {/* Wild Honey image banner */}
        <div className="relative w-full h-[250px] rounded-xl overflow-hidden my-6">
          <Image
            src="/images/chooseUs-honey.png"
            alt="Wild Honey"
            fill
            className="object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 to-transparent flex items-center">
            <div className="p-8 max-w-sm">
              <h3 className="text-3xl font-bold text-amber-900 font-great-vibes">Wild Honey</h3>
              <p className="text-sm text-gray-700 mt-2">
                Honey supports healthy digestion and serves as a natural alternative to refined sugar, potentially aiding in weight management by providing energy without spiking blood sugar levels excessively.
              </p>
            </div>
          </div>
        </div>
        <p>
          Our honey undergoes minimal processing to preserve its natural goodness. Unlike commercial honey brands that use high heat pasteurization, our cold-extraction process maintains all the beneficial enzymes and nutrients that make raw honey so valuable.
        </p>
      </div>
    </div>
  );
}

/* ── Quick Comparison ── */
function QuickComparison({ products }) {
  if (!products || products.length === 0) return null;
  const compareItems = products.slice(0, 5);

  return (
    <div className="py-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-8">Quick Comparison</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <td className="p-3 font-bold text-gray-500 w-[120px]"></td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3 text-center min-w-[150px]">
                  <div className="bg-[#F5F5F5] rounded-xl p-4 mb-3 h-[140px] flex items-center justify-center">
                    <Image
                      src={p.images[0]}
                      alt={p.description}
                      width={100}
                      height={100}
                      className="object-contain max-h-[110px]"
                    />
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 leading-snug">{p.description}</p>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-100">
              <td className="p-3 font-bold text-gray-500">Price</td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3 text-center font-bold">${p.pricing}</td>
              ))}
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3 font-bold text-gray-500">Rating</td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3">
                  <div className="flex justify-center"><RatingStars rating={p.rating} /></div>
                </td>
              ))}
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3 font-bold text-gray-500">Action</td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  <Link
                    href={`/product/${p.id}`}
                    className="inline-flex items-center gap-1 bg-primary hover:bg-black hover:text-white text-[11px] font-bold py-2 px-4 rounded-full transition-colors"
                  >
                    <ShoppingCart size={12} /> ADD TO CART
                  </Link>
                </td>
              ))}
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3 font-bold text-gray-500">Availability</td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3 text-center">
                  <span className="text-green-600 text-xs font-semibold">In Stock</span>
                </td>
              ))}
            </tr>
            <tr className="border-t border-gray-100">
              <td className="p-3 font-bold text-gray-500">Brand</td>
              {compareItems.map((p) => (
                <td key={p.id} className="p-3 text-center text-gray-600 text-xs">
                  {p.brand || "Honey Store"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Related Products ── */
function RelatedProducts({ products }) {
  if (!products || products.length === 0) return null;
  return (
    <div className="py-10 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-center mb-8">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.slice(0, 4).map((p) => {
          const discountPct =
            p.originalPrice && p.pricing
              ? Math.round((1 - p.pricing / p.originalPrice) * 100)
              : null;
          return (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <div className="relative bg-[#F5F5F5] h-[200px] flex items-center justify-center p-6">
                {discountPct && (
                  <span className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                    -{discountPct}%
                  </span>
                )}
                <Image
                  src={p.images[0]}
                  alt={p.description}
                  width={140}
                  height={140}
                  className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 text-center">
                <h3 className="text-sm font-medium line-clamp-2 leading-snug min-h-[2.5rem]">
                  {p.description}
                </h3>
                <div className="flex justify-center">
                  <RatingStars rating={p.rating} />
                </div>
                <div className="flex justify-center items-center gap-2 font-bold text-sm">
                  {p.originalPrice && (
                    <span className="text-gray-400 line-through font-normal text-xs">
                      ${p.originalPrice}
                    </span>
                  )}
                  <span>${p.pricing}</span>
                </div>
                <button className="mx-auto flex items-center justify-center gap-2 bg-primary hover:bg-black hover:text-white text-xs font-bold py-2 px-5 rounded-full transition-colors cursor-pointer mt-1">
                  <ShoppingCart size={13} /> ADD TO CART
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Share Modal ── */
function ShareModal({ open, onClose, productUrl }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    }
  }, [open]);

  const handleClose = () => {
    setClosing(true);
  };

  const handleAnimationEnd = () => {
    if (closing) {
      setMounted(false);
      setClosing(false);
      onClose();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!mounted) return null;

  const socials = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      ),
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      ),
    },
    {
      name: "TikTok",
      url: `https://www.tiktok.com/`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
      ),
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(productUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      ),
    },
    {
      name: "Pinterest",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(productUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
      ),
    },
    {
      name: "X",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
    },
    {
      name: "YouTube",
      url: `https://www.youtube.com/`,
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      ),
    },
  ];

  return (
    <>
      {/* Keyframes for flip animation */}
      <style jsx>{`
        @keyframes flipIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) perspective(800px) rotateY(90deg) scale(0.8);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) perspective(800px) rotateY(0deg) scale(1);
          }
        }
        @keyframes flipOut {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) perspective(800px) rotateY(0deg) scale(1);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) perspective(800px) rotateY(-90deg) scale(0.8);
          }
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes overlayOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-[300]"
        onClick={handleClose}
        style={{
          animation: closing ? "overlayOut 0.4s ease-in forwards" : "overlayIn 0.3s ease-out forwards",
        }}
      />
      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 z-[301] bg-white rounded-2xl shadow-2xl w-[90%] max-w-[480px] p-6"
        style={{
          animation: closing ? "flipOut 0.4s ease-in forwards" : "flipIn 0.5s cubic-bezier(0.17, 0.67, 0.35, 1.2) forwards",
          transformOrigin: "center center",
          backfaceVisibility: "hidden",
        }}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Share</h3>
          <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              title={s.name}
              className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* URL Copy */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-500 truncate select-all" ref={inputRef}>
            {productUrl}
          </div>
          <button
            onClick={handleCopy}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-colors cursor-pointer ${
              copied ? "bg-green-500 text-white" : "bg-primary text-black hover:bg-[#e6b615]"
            }`}
          >
            {copied ? "COPIED!" : "COPY"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ═════════════════════════════════════════════
   MAIN PRODUCT PAGE
═════════════════════════════════════════════ */
export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/mock-data?id=${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setRelated(data.related || []);
        setLoading(false);
        setSelectedImg(0);
        setQty(1);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setAddingToCart(true);
    setTimeout(() => {
      addToCart({
        id: product.id,
        image: product.images[0],
        description: product.description,
        price: parseInt(product.pricing),
      }, qty);
      setAddingToCart(false);
    }, 800);
  };

  const prevImage = () => {
    if (!product) return;
    setImgLoading(true);
    setSelectedImg((i) => (i - 1 + product.images.length) % product.images.length);
  };

  const nextImage = () => {
    if (!product) return;
    setImgLoading(true);
    setSelectedImg((i) => (i + 1) % product.images.length);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoaderCircle size={48} className="animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <Link href="/" className="text-primary hover:underline">Go back to Home</Link>
      </div>
    );
  }

  const price = product.pricing;
  const originalPrice = product.originalPrice || product.discount;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3 px-4">
          <div className="max-w-[85rem] justify-center mx-auto flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={13} />
            <Link href="/" className="hover:text-black transition-colors">Shop</Link>
            <ChevronRight size={13} />
            <span className="text-black font-medium line-clamp-1 max-w-[300px]">{product.description}</span>
          </div>
        </div>

        {/* ──────── Product Top Section ──────── */}
        <div className="max-w-[85rem] mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT — Image Gallery */}
            <div className="lg:w-[50%] flex  gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3 w-[80px] shrink-0">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setImgLoading(true); setSelectedImg(i); }}
                    className={`border-2 rounded-lg overflow-hidden p-2 bg-[#F5F5F5] cursor-pointer transition-all ${
                      selectedImg === i ? "border-yellow-400" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      width={60}
                      height={60}
                      className="object-contain w-full h-[50px]"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="relative flex-1 bg-[#F5F5F5] rounded-xl overflow-hidden flex items-center justify-center min-h-[400px]">
                {imgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]/80 z-10">
                    <LoaderCircle size={38} className="animate-spin text-primary" />
                  </div>
                )}
                <Image
                  src={product.images[selectedImg]}
                  alt={product.description}
                  width={400}
                  height={400}
                  className="object-contain max-h-[380px] p-6"
                  onLoad={() => setImgLoading(false)}
                />
                {/* Prev / Next arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-primary transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-primary transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="lg:w-[50%] flex flex-col gap-4">
              {/* Title */}
              <h1 className="text-2xl font-bold leading-snug">{product.description}</h1>

              {/* Price & Rating row */}
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-3xl font-bold">${price}</span>
                {originalPrice && (
                  <span className="text-gray-400 line-through text-lg">{typeof originalPrice === "number" ? `$${originalPrice}` : originalPrice}</span>
                )}
                <RatingStars rating={product.rating} count={product.ratingCount || product.rating} />
              </div>

              {/* Details */}
              <p className="text-sm text-gray-500 leading-relaxed">
                {product.details || product.description}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    className="px-4 py-3 text-base font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-5 py-3 text-sm font-semibold select-none min-w-[40px] text-center">{qty}</span>
                  <button
                    className="px-4 py-3 text-base font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className={`flex-1 max-w-[280px] bg-primary hover:bg-black hover:text-white text-black font-bold py-3 rounded-full text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    addingToCart ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  <ShoppingCart size={18} />
                  ADD TO CART
                  {addingToCart && <LoaderCircle size={16} className="animate-spin" />}
                </button>
              </div>

              {/* Buy Now */}
              <button className="w-full max-w-[440px] bg-black text-white font-bold py-3 rounded-full text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                BUY NOW
              </button>

              {/* Action icons row */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mt-1">
                <button
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isInWishlist(product.id) ? "text-black" : "hover:text-black"}`}
                  onClick={() => toggleWishlist({ id: product.id, image: product.images[0], description: product.description, price: parseInt(product.pricing) })}
                >
                  <Heart size={16} className={isInWishlist(product.id) ? "fill-black" : ""} />
                  {isInWishlist(product.id) ? "In Wishlist" : "Add To Wishlist"}
                </button>
                <button className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
                  <BarChart2 size={16} /> Compare
                </button>
                <button onClick={() => setShareOpen(true)} className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer">
                  <Share2 size={16} /> Share
                </button>
              </div>

              {/* Trust badges */}
              <div className="border border-gray-200 rounded-xl p-4 mt-2">
                <p className="text-sm text-gray-500 mb-3 font-medium">Guaranteed Safe Checkout</p>
                <Image src="/images/payment.png" alt="Payment Methods" width={300} height={30} className="object-contain" />
              </div>

              {/* Info badges */}
              <div className="grid grid-cols-2 gap-3 mt-1">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Truck size={20} className="text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold">Free Shipping</p>
                    <p className="text-[11px] text-gray-400">On orders $100+</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <RotateCcw size={20} className="text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold">Easy Returns</p>
                    <p className="text-[11px] text-gray-400">30 day returns</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <ShieldCheck size={20} className="text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold">Secure Checkout</p>
                    <p className="text-[11px] text-gray-400">100% Protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Headphones size={20} className="text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold">24/7 Support</p>
                    <p className="text-[11px] text-gray-400">Always available</p>
                  </div>
                </div>
              </div>

              {/* SKU / Brand */}
              <div className="text-xs text-gray-400 mt-2 flex flex-col gap-1">
                {product.sku && <p>SKU: <span className="text-gray-600">{product.sku}</span></p>}
                {product.brand && <p>Brand: <span className="text-gray-600">{product.brand}</span></p>}
                {product.stock && <p>Availability: <span className="text-green-600 font-semibold">{product.stock} in stock</span></p>}
              </div>
            </div>
          </div>

          {/* ──────── Tabs Section ──────── */}
          <div className="mt-12">
            <ProductTabs product={product} />
          </div>

          {/* ──────── About This Item ──────── */}
          <AboutSection product={product} />

          {/* ──────── Quick Comparison ──────── */}
          <QuickComparison products={[product, ...related.slice(0, 4)]} />

          {/* ──────── Related Products ──────── */}
          <RelatedProducts products={related} />
        </div>
      </div>

      {/* ──────── Newsletter ──────── */}
      <Subscribe />

      {/* ──────── Share Modal ──────── */}
      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        productUrl={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
}
