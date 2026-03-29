"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Settings2,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Heart,
  BarChart2,
  Eye,
  X,
  LoaderCircle,
  SlidersHorizontal,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function slugToTitle(slug) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const categoryParents = {
  "acacia-honey": "Clover Honey",
  "flavored-honey": "Clover Honey",
  "honey-powder": "Clover Honey",
  "honey-sticks": "Clover Honey",
  "monofloral-honey": "Raw Honey",
  "multifloral-honey": "Raw Honey",
  "wild-honey": "Raw Honey",
  "black-honey": "Raw Honey",
  "lychee-honey": "Burst Honey",
  "ajwain-honey": "Burst Honey",
  "coffee-honey": "Burst Honey",
  "artisanal-honey": "Burst Honey",
  "kashmiri-honey": "Organic Honey",
  "jungali-honey": "Organic Honey",
  "forest-honey": "Organic Honey",
  "coriander-honey": "Organic Honey",
  "sage-honey": "Manuka Honey",
  "pinetree-honey": "Manuka Honey",
  "mad-honey": "Manuka Honey",
  "linden-honey": "Manuka Honey",
  "jarrah-honey": "Tupelo Honey",
  "aster-honey": "Tupelo Honey",
  "alfalfa-honey": "Tupelo Honey",
  "uniflora-honey": "Tupelo Honey",
};

function CountdownTimer({ targetMs }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = Math.max(0, targetMs - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  const pad = (n, len = 2) => String(n).padStart(len, "0");

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs font-mono py-1.5 text-center tracking-wide">
      {pad(time.d, 3)}d : {pad(time.h)}h : {pad(time.m)}m : {pad(time.s)}s
    </div>
  );
}

function RatingStars({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-3.5 h-3.5 ${
            n <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      {count !== undefined && (
        <span className="text-gray-400 text-xs ml-0.5">({count})</span>
      )}
    </div>
  );
}

function SidebarSection({ title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-2 cursor-pointer"
      >
        <span className="font-bold text-sm">{title}</span>
        {open ? <Minus size={13} /> : <Plus size={13} />}
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

function ActionIcons({ vertical, onQuickView, product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = product && isInWishlist(product.id);
  const base =
    "w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-primary hover:border-yellow-400 transition-colors cursor-pointer";
  return (
    <div className={`flex ${vertical ? "flex-col" : ""} gap-2`}>
      <button
        className={base}
        title="Wishlist"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); product && toggleWishlist({ id: product.id, image: product.images?.[0], description: product.description, price: parseInt(product.pricing) }); }}
      >
        <Heart size={15} className={inWishlist ? "fill-black text-black" : "text-gray-500"} />
      </button>
      <button className={base} title="Compare" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
        <BarChart2 size={15} className="text-gray-500" />
      </button>
      <button className={base} title="Quick View" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView?.(); }}>
        <Eye size={15} className="text-gray-500" />
      </button>
    </div>
  );
}

function ProductCardButton({ type, product, loadingId, onAddToCart }) {
  const labels = {
    add_to_cart: { icon: <ShoppingCart size={13} />, text: "ADD TO CART" },
    select_options: { icon: <Settings2 size={13} />, text: "SELECT OPTIONS" },
    buy_product: { icon: <ShoppingCart size={13} />, text: "BUY PRODUCT" },
  };
  const item = labels[type];
  if (!item) return null;

  const isAddToCart = type === "add_to_cart";
  const isLoading = isAddToCart && product && loadingId === product.id;

  return (
    <button
      onClick={isAddToCart && product && onAddToCart ? () => onAddToCart(product) : undefined}
      disabled={isLoading}
      className={`flex items-center justify-center gap-2 bg-primary hover:bg-black hover:text-white text-xs font-bold py-2.5 px-6 rounded-full transition-colors cursor-pointer mt-1 w-fit ${
        isLoading ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {item.icon} {item.text}
      {isLoading && <LoaderCircle size={14} className="animate-spin" />}
    </button>
  );
}

function ProductCard({ product, viewMode = "grid", onQuickView, loadingId, onAddToCart }) {
  const discountPct =
    product.originalPrice && product.pricing
      ? Math.round((1 - product.pricing / product.originalPrice) * 100)
      : null;

  /* ───── LIST VIEW ───── */
  if (viewMode === "list") {
    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col sm:flex-row group">
        {/* Image section */}
        <Link href={`/product/${product.id}`} className="relative bg-[#F5F5F5] w-full sm:w-55 md:w-65 shrink-0 flex items-center justify-center p-4 sm:p-6 h-50 sm:h-auto">
          {discountPct && (
            <span className="absolute top-3 left-3 bg-black text-white text-[11px] font-bold w-10 h-10 rounded-full flex items-center justify-center z-10">
              -{discountPct}%
            </span>
          )}
          <Image
            src={product.images[0]}
            alt={product.description}
            width={180}
            height={180}
            className="object-contain max-h-40 sm:max-h-45"
          />
          {/* Action icons - right edge, slide in from right on hover */}
          <div className="absolute top-3 right-3 translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <ActionIcons vertical product={product} onQuickView={() => onQuickView?.(product)} />
          </div>
          {product.hasCountdown && (
            <CountdownTimer targetMs={product.countdownTarget} />
          )}
        </Link>

        {/* Info section */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-2 justify-center">
          <Link href={`/product/${product.id}`}>
          <h3 className="text-sm sm:text-base font-semibold leading-snug hover:text-primary transition-colors">
            {product.description}
          </h3>
          </Link>

          <RatingStars rating={product.rating} count={product.ratingCount} />

          <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
            {product.originalPrice && (
              <span className="text-gray-400 line-through font-normal text-xs sm:text-sm">
                ${product.originalPrice}
              </span>
            )}
            {product.pricing ? (
              <span>${product.pricing}</span>
            ) : (
              <span>
                ${product.priceMin} – ${product.priceMax}
              </span>
            )}
          </div>

          {product.longDescription && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-3 mt-1">
              {product.longDescription}
            </p>
          )}

          <ProductCardButton type={product.type} product={product} loadingId={loadingId} onAddToCart={onAddToCart} />
        </div>
      </div>
    );
  }

  /* ───── GRID VIEW (default) ───── */
  return (
    <div className="border border-gray-200 rounded-xl flex-col overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={`/product/${product.id}`} className="relative bg-[#F5F5F5] h-40 sm:h-55 flex items-center justify-center p-4 sm:p-6">
        {discountPct && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-2 py-0.5 rounded z-10">
            -{discountPct}%
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.description}
          width={160}
          height={160}
          className="object-contain max-h-full"
        />
        {/* Hover action icons - slide in from right */}
        <div className="absolute  top-3 right-3  translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <ActionIcons vertical product={product} onQuickView={() => onQuickView?.(product)} />
        </div>
        {product.hasCountdown && (
          <CountdownTimer targetMs={product.countdownTarget} />
        )}
      </Link>

      <div className="p-2.5 sm:p-4 flex justify-center items-center flex-col gap-1.5 sm:gap-2 text-center">
        <Link href={`/product/${product.id}`}>
        <h3 className="text-xs sm:text-sm font-medium line-clamp-2 leading-snug min-h-8 sm:min-h-10 hover:text-primary transition-colors">
          {product.description}
        </h3>
        </Link>


        <RatingStars rating={product.rating} count={product.ratingCount} />


        <div className="flex justify-center items-center gap-2 font-bold text-sm">
          {product.originalPrice && (
            <span className="text-gray-400 line-through font-normal text-xs">
              ${product.originalPrice}
            </span>
          )}
          {product.pricing ? (
            <span >${product.pricing}</span>
          ) : (
            <span>
              ${product.priceMin} – ${product.priceMax}
            </span>
          )}
        </div>

        <ProductCardButton type={product.type} product={product} loadingId={loadingId} onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

const allCategories = [
  "Our Store",
  "Clover Honey",
  "Raw Honey",
  "Burst Honey",
  "Organic Honey",
  "Manuka Honey",
  "Tupelo Honey",
];
const weights = ["500g", "750g", "1kg", "2kg"];
const brands = [
  { name: "EcomZone", count: 2 },
  { name: "MegaMart", count: 2 },
  { name: "SmartShop", count: 1 },
];
const priceRanges = [
  { label: "All", key: "all" },
  { label: "$10–$20", key: "10-20" },
  { label: "$20–$30", key: "20-30" },
];
const ratingCounts = [2, 3, 0, 0, 0];

export default function CategoryPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const title = slugToTitle(slug);
  const parent = categoryParents[slug] || null;

  const [products, setProducts] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [activeHighlight, setActiveHighlight] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterMounted, setFilterMounted] = useState(false);
  const [filterClosing, setFilterClosing] = useState(false);

  const openFilter = () => {
    setFilterMounted(true);
    setFilterClosing(false);
    setTimeout(() => setFilterOpen(true), 10);
  };

  const closeFilter = () => {
    setFilterClosing(true);
    setFilterOpen(false);
    setTimeout(() => {
      setFilterMounted(false);
      setFilterClosing(false);
    }, 300);
  };

  // Quick View modal state
  const [modalProduct, setModalProduct] = useState(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imgLoading, setImgLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetch("/api/mock-data")
      .then((r) => r.json())
      .then((data) => setProducts(data.categoryProducts));
  }, []);

  const handleAddToCart = (product) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart({
        id: product.id,
        image: product.images[0],
        description: product.description,
        price: parseInt(product.pricing),
      });
      setLoadingId(null);
    }, 800);
  };

  const openModal = (product) => {
    setIsClosing(false);
    setModalProduct(product);
    setModalImgIdx(0);
    setQty(1);
    setImgLoading(false);
  };

  const closeModal = () => setIsClosing(true);

  const handleAnimationEnd = () => {
    if (isClosing) {
      setModalProduct(null);
      setIsClosing(false);
    }
  };

  const prevImage = () => {
    setImgLoading(true);
    setModalImgIdx((i) => (i - 1 + modalProduct.images.length) % modalProduct.images.length);
  };

  const nextImage = () => {
    setImgLoading(true);
    setModalImgIdx((i) => (i + 1) % modalProduct.images.length);
  };

  const toggleWeight = (w) =>
    setSelectedWeights((prev) =>
      prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]
    );
  const toggleBrand = (b) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]
    );

  let filtered = [...products];
  if (selectedWeights.length > 0)
    filtered = filtered.filter((p) =>
      p.weights?.some((w) => selectedWeights.includes(w))
    );
  if (selectedBrands.length > 0)
    filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
  if (selectedPrice !== "all") {
    const [min, max] = selectedPrice.split("-").map(Number);
    filtered = filtered.filter((p) => {
      const price = p.pricing || p.priceMin || 0;
      return price >= min && price <= max;
    });
  }
  if (selectedRating > 0)
    filtered = filtered.filter((p) => p.rating >= selectedRating);

  if (sortBy === "price-low")
    filtered.sort(
      (a, b) => (a.pricing || a.priceMin) - (b.pricing || b.priceMin)
    );
  if (sortBy === "price-high")
    filtered.sort(
      (a, b) => (b.pricing || b.priceMax) - (a.pricing || a.priceMax)
    );
  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}

      {/* Page Title */}
      <div className="text-center py-5 sm:py-8 border-b border-gray-100">
      <div className="bg-gray-50 border-b border-gray-100 mb-3 sm:mb-5 py-3 px-4">
        <div className="max-w-340 mx-auto justify-center flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          {parent && (
            <>
              <ChevronRight size={13} />
              <span>{parent}</span>
            </>
          )}
          <ChevronRight size={13} />
          <span className="text-black font-medium">{title}</span>
        </div>
      </div>
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
      </div>

      {/* Content */}
      <div className="max-w-340 mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

        {/* Mobile Filter Drawer */}
        {filterMounted && (
          <div className="fixed inset-0 z-100 lg:hidden">
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${filterOpen && !filterClosing ? "opacity-100" : "opacity-0"}`}
              onClick={closeFilter}
            />
            <div
              className={`absolute top-0 left-0 h-full w-70 bg-white shadow-xl overflow-y-auto p-5 transition-transform duration-300 ease-in-out ${filterOpen && !filterClosing ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Filters</h3>
                <button onClick={closeFilter} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
                  <X size={20} />
                </button>
              </div>

              <SidebarSection title="Shop By Categories">
                <ul className="space-y-2.5">
                  {allCategories.map((cat) => (
                    <li key={cat} className="flex items-center gap-2">
                      <input type="checkbox" id={`m-cat-${cat}`} className="w-3.5 h-3.5 accent-yellow-400 cursor-pointer" />
                      <label htmlFor={`m-cat-${cat}`} className="text-sm text-gray-600 cursor-pointer hover:text-black transition-colors">{cat}</label>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Highlight">
                <ul className="space-y-2">
                  {[
                    { label: "All Products", key: "all", count: products.length },
                    { label: "Best Seller", key: "bestseller" },
                    { label: "New Arrivals", key: "new" },
                    { label: "Sale", key: "sale" },
                    { label: "Hot Items", key: "hot" },
                  ].map((h) => (
                    <li key={h.key}>
                      <button
                        onClick={() => setActiveHighlight(h.key)}
                        className={`w-full text-left text-sm flex items-center gap-2 cursor-pointer transition-colors ${activeHighlight === h.key ? "text-yellow-500 font-semibold" : "text-gray-600 hover:text-black"}`}
                      >
                        {h.label}
                        {h.key === "all" && <span className="bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded">{products.length}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Filter By Weight">
                <div className="flex flex-wrap gap-2">
                  {weights.map((w) => (
                    <button key={w} onClick={() => toggleWeight(w)} className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${selectedWeights.includes(w) ? "bg-primary border-yellow-400 font-bold" : "border-gray-300 hover:border-yellow-400"}`}>{w}</button>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Brands">
                <ul className="space-y-2.5">
                  {brands.map((b) => (
                    <li key={b.name} className="flex items-center gap-2">
                      <input type="checkbox" id={`m-brand-${b.name}`} checked={selectedBrands.includes(b.name)} onChange={() => toggleBrand(b.name)} className="w-3.5 h-3.5 accent-yellow-400 cursor-pointer" />
                      <label htmlFor={`m-brand-${b.name}`} className="text-sm text-gray-600 cursor-pointer hover:text-black transition-colors">{b.name} <span className="text-gray-400">({b.count})</span></label>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Price Filter">
                <ul className="space-y-2">
                  {priceRanges.map((p) => (
                    <li key={p.key}>
                      <button onClick={() => setSelectedPrice(p.key)} className={`text-sm w-full text-left cursor-pointer transition-colors ${selectedPrice === p.key ? "text-yellow-500 font-semibold" : "text-gray-600 hover:text-black"}`}>{p.label}</button>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <SidebarSection title="Average Rating">
                <ul className="space-y-2.5">
                  {[5, 4, 3, 2, 1].map((stars, i) => (
                    <li key={stars}>
                      <button onClick={() => setSelectedRating(selectedRating === stars ? 0 : stars)} className={`flex items-center gap-2 w-full cursor-pointer transition-opacity ${selectedRating === stars ? "opacity-100" : "opacity-70 hover:opacity-100"}`}>
                        <RatingStars rating={stars} count={ratingCounts[i]} />
                      </button>
                    </li>
                  ))}
                </ul>
              </SidebarSection>

              <button onClick={closeFilter} className="w-full bg-primary hover:bg-black hover:text-white font-bold py-2.5 rounded-full text-sm transition-colors cursor-pointer mt-4">
                APPLY FILTERS
              </button>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="w-55 shrink-0 hidden lg:block">
          <SidebarSection title="Shop By Categories">
            <ul className="space-y-2.5">
              {allCategories.map((cat) => (
                <li key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`cat-${cat}`}
                    className="w-3.5 h-3.5 accent-yellow-400 cursor-pointer"
                  />
                  <label
                    htmlFor={`cat-${cat}`}
                    className="text-sm text-gray-600 cursor-pointer hover:text-black transition-colors"
                  >
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Highlight">
            <ul className="space-y-2">
              {[
                { label: "All Products", key: "all", count: products.length },
                { label: "Best Seller", key: "bestseller" },
                { label: "New Arrivals", key: "new" },
                { label: "Sale", key: "sale" },
                { label: "Hot Items", key: "hot" },
              ].map((h) => (
                <li key={h.key}>
                  <button
                    onClick={() => setActiveHighlight(h.key)}
                    className={`w-full text-left text-sm flex items-center gap-2 cursor-pointer transition-colors ${
                      activeHighlight === h.key
                        ? "text-yellow-500 font-semibold"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {h.label}
                    {h.key === "all" && (
                      <span className="bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {products.length}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Filter By Weight">
            <div className="flex flex-wrap gap-2">
              {weights.map((w) => (
                <button
                  key={w}
                  onClick={() => toggleWeight(w)}
                  className={`px-3 py-1 text-xs rounded border transition-colors cursor-pointer ${
                    selectedWeights.includes(w)
                      ? "bg-primary border-yellow-400 font-bold"
                      : "border-gray-300 hover:border-yellow-400"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Brands">
            <ul className="space-y-2.5">
              {brands.map((b) => (
                <li key={b.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`brand-${b.name}`}
                    checked={selectedBrands.includes(b.name)}
                    onChange={() => toggleBrand(b.name)}
                    className="w-3.5 h-3.5 accent-yellow-400 cursor-pointer"
                  />
                  <label
                    htmlFor={`brand-${b.name}`}
                    className="text-sm text-gray-600 cursor-pointer hover:text-black transition-colors"
                  >
                    {b.name}{" "}
                    <span className="text-gray-400">({b.count})</span>
                  </label>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Price Filter">
            <ul className="space-y-2">
              {priceRanges.map((p) => (
                <li key={p.key}>
                  <button
                    onClick={() => setSelectedPrice(p.key)}
                    className={`text-sm w-full text-left cursor-pointer transition-colors ${
                      selectedPrice === p.key
                        ? "text-yellow-500 font-semibold"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {p.label}
                  </button>
                </li>
              ))}
            </ul>
          </SidebarSection>

          <SidebarSection title="Average Rating">
            <ul className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars, i) => (
                <li key={stars}>
                  <button
                    onClick={() =>
                      setSelectedRating(selectedRating === stars ? 0 : stars)
                    }
                    className={`flex items-center gap-2 w-full cursor-pointer transition-opacity ${
                      selectedRating === stars ? "opacity-100" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <RatingStars rating={stars} count={ratingCounts[i]} />
                  </button>
                </li>
              ))}
            </ul>
          </SidebarSection>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-3">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                onClick={openFilter}
                className="lg:hidden flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <SlidersHorizontal size={15} />
                Filters
              </button>
              <span className="text-sm text-gray-500 hidden sm:inline">
                Showing all{" "}
                <span className="font-semibold text-black">{filtered.length}</span>{" "}
                results
              </span>
              <span className="text-sm text-gray-500 sm:hidden">
                <span className="font-semibold text-black">{filtered.length}</span> results
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 text-xs sm:text-sm focus:outline-none cursor-pointer"
              >
                <option value="default">Default sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="hidden sm:flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-primary" : "hover:bg-gray-50"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-primary" : "hover:bg-gray-50"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} onQuickView={openModal} loadingId={loadingId} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-gray-400">
              No products found for selected filters.
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Quick View Modal */}
    {modalProduct && (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 ${isClosing ? "animate-overlay-out" : "animate-overlay-in"}`}
        onClick={closeModal}
      >
        <div
          className={`relative bg-white rounded-xl overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row shadow-2xl max-h-[85vh] sm:max-h-[85vh] ${isClosing ? "animate-flip-out" : "animate-flip-in"}`}
          onClick={(ev) => ev.stopPropagation()}
          onAnimationEnd={handleAnimationEnd}
        >
          {/* Close */}
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 text-gray-500 hover:text-black transition-colors cursor-pointer"
            onClick={closeModal}
          >
            <X className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </button>

          {/* Left — image slider */}
          <div className="relative bg-[#F5F5F5] w-full sm:w-[45%] h-45 sm:h-95 shrink-0">
            <div className="absolute inset-0 bottom-7 sm:bottom-9 flex items-center justify-center p-3 sm:p-6">
              {imgLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]/80 z-10">
                  <LoaderCircle size={30} className="animate-spin text-primary sm:w-9.5 sm:h-9.5" />
                </div>
              )}
              <Image
                src={modalProduct.images[modalImgIdx]}
                alt={modalProduct.description}
                width={300}
                height={300}
                className="object-contain max-h-full w-auto"
                onLoad={() => setImgLoading(false)}
              />
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-0 left-0 right-0 h-7 sm:h-9 flex gap-1.5 sm:gap-2 items-center justify-center">
              {modalProduct.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setImgLoading(true); setModalImgIdx(i); }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors cursor-pointer ${
                    i === modalImgIdx ? "bg-gray-800" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Prev arrow */}
            <button
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-1.5 shadow hover:bg-primary transition-colors cursor-pointer"
              onClick={prevImage}
            >
              <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Next arrow */}
            <button
              className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-1.5 shadow hover:bg-primary transition-colors cursor-pointer"
              onClick={nextImage}
            >
              <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>

          {/* Right — product details */}
          <div className="w-full sm:w-[55%] p-3 sm:p-6 flex flex-col gap-1.5 sm:gap-3 overflow-y-auto flex-1">
            <h2 className="text-sm sm:text-lg font-semibold leading-snug pr-6">
              {modalProduct.description}
            </h2>

            <div className="flex items-center gap-2">
              <RatingStars rating={modalProduct.rating} />
              <span className="text-xs sm:text-sm text-gray-500">
                ({modalProduct.rating} review{modalProduct.rating !== 1 ? "s" : ""})
              </span>
            </div>

            <p className="text-lg sm:text-2xl font-bold">${modalProduct.pricing}</p>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-none">
              {modalProduct.details}
            </p>

            <span className="inline-block bg-green-100 text-green-700 text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-md w-fit font-medium">
              {modalProduct.stock} in stock
            </span>

            {/* Quantity + Add to Cart */}
            <div className="flex gap-2 sm:gap-3 items-center mt-0.5 sm:mt-1">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm sm:text-base font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm select-none">{qty}</span>
                <button
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-sm sm:text-base font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(modalProduct)}
                disabled={loadingId === modalProduct.id}
                className={`flex-1 bg-primary hover:bg-yellow-500 text-black font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                  loadingId === modalProduct.id ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ADD TO CART
                {loadingId === modalProduct.id && (
                  <LoaderCircle className="w-3.5 h-3.5 sm:w-3.75 sm:h-3.75 animate-spin" />
                )}
              </button>
            </div>

            {/* Buy Now */}
            <button className="w-full bg-black text-white font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition-colors cursor-pointer">
              BUY NOW
            </button>

            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">SKU: {modalProduct.sku}</p>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
