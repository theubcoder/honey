"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, X, ChevronDown, ChevronLeft, ChevronRight, Truck, Star, ShoppingCart, LoaderCircle } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ShoppingCart as OrdersIcon, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const mobileMenuLinks = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    children: [
      { label: "Clover Honey", href: "/categories/acacia-honey" },
      { label: "Raw Honey", href: "/categories/wild-honey" },
      { label: "Organic Honey", href: "/categories/kashmiri-honey" },
    ],
  },
  {
    label: "Categories",
    badge: "SALE",
    children: [
      { label: "Burst Honey", href: "/categories/lychee-honey" },
      { label: "Manuka Honey", href: "/categories/sage-honey" },
      { label: "Tupelo Honey", href: "/categories/jarrah-honey" },
      { label: "Flavored Honey", href: "/categories/flavored-honey" },
    ],
  },
  {
    label: "Products",
    badge: "HOT",
    children: [
      { label: "Kashmiri Honey", href: "/categories/kashmiri-honey" },
      { label: "Wild Honey", href: "/categories/wild-honey" },
      { label: "Forest Honey", href: "/categories/forest-honey" },
      { label: "Coffee Honey", href: "/categories/coffee-honey" },
    ],
  },
  {
    label: "Quick Links",
    children: [
      { label: "Shopping Cart", href: "/cart" },
      { label: "Checkout", href: "/checkout" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

function MobileMenuItem({ item, onClose }) {
  const [open, setOpen] = useState(false);

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block px-4 py-3 text-gray-800 font-medium border-b border-gray-100 cursor-pointer"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-gray-800 font-medium cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {item.label}
          {item.badge && (
            <span className="bg-[#e91e63] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">
              {item.badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        {item.children.map((child) => (
          <Link
            key={child.href}
            href={child.href}
            onClick={onClose}
            className="block px-8 py-2.5 text-gray-600 text-sm cursor-pointer"
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    getSubtotal,
    amountForFreeDelivery,
    FREE_DELIVERY_THRESHOLD,
  } = useCart();

  const [cartClosing, setCartClosing] = useState(false);

  const handleCartClose = () => {
    setCartClosing(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setCartClosing(false);
    }, 300);
  };

  const subtotal = getSubtotal();
  const remaining = amountForFreeDelivery();
  const progress = Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100);

  return (
    <>
      {/* Overlay */}
      {(isCartOpen || cartClosing) && (
        <div
          className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${
            cartClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleCartClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[201] transform transition-transform duration-300 ease-in-out ${
          isCartOpen && !cartClosing ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Shopping Cart</h2>
            <button
              onClick={handleCartClose}
              className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Progress */}
          <div className="px-4 py-3">
            <div className="relative w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-[#f5c518] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute -top-3 transform -translate-x-1/2 transition-all duration-300"
                style={{ left: `${progress}%` }}
              >
                <Truck className="w-6 h-6 text-[#f5c518]" />
              </div>
            </div>
            <p className="text-center text-sm mt-3 text-gray-600">
              {remaining > 0 ? (
                <>
                  Add items worth <span className="font-bold text-black">${remaining}</span> for{" "}
                  <span className="font-bold text-black">FREE Delivery!</span>
                </>
              ) : (
                <span className="font-bold text-green-600">You get FREE Delivery!</span>
              )}
            </p>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4">
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Your cart is empty
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 py-4">
                    <div className="w-16 h-16 bg-[#F5F5F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.description}
                        width={60}
                        height={60}
                        className="object-contain max-h-[50px]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm line-clamp-2 pr-4">{item.description}</p>
                      <p className="text-sm mt-1">
                        {item.quantity} &times;{" "}
                        <span className="font-bold">${item.price}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 flex-shrink-0 self-start cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 italic">Subtotal:</span>
              <span className="text-xl font-bold">${subtotal}</span>
            </div>
            <div className="flex gap-3">
              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="flex-1 bg-black text-white py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors cursor-pointer text-center"
              >
                VIEW CART
              </Link>
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="flex-1 bg-[#f5c518] text-black py-3 rounded-full font-bold text-sm hover:bg-[#e6b615] transition-colors cursor-pointer text-center"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const categoryMegaMenu = [
  {
    name: "Clover Honey",
    items: ["Acacia Honey", "Flavored Honey", "Honey Powder", "Honey Sticks"],
  },
  {
    name: "Raw Honey",
    items: ["Monofloral Honey", "Multifloral Honey", "Wild Honey", "Black Honey"],
  },
  {
    name: "Burst Honey",
    items: ["Lychee Honey", "Ajwain Honey", "Coffee Honey", "Artisanal Honey"],
  },
  {
    name: "Organic Honey",
    items: ["Kashmiri Honey", "Jungali Honey", "Forest Honey", "Coriander Honey"],
  },
  {
    name: "Manuka Honey",
    items: ["Sage Honey", "Pinetree Honey", "Mad Honey", "Linden Honey"],
  },
  {
    name: "Tupelo Honey",
    items: ["Jarrah Honey", "Aster Honey", "Alfalfa Honey", "Uniflora Honey"],
  },
];

const shopByCategories = [
  { name: "Clover Honey", image: "/images/products/Product.png", href: "/categories/clover-honey" },
  { name: "Honey Sticks", image: "/images/products/Product2.png", href: "/categories/honey-sticks" },
  { name: "Raw Honey", image: "/images/products/Product3.png", href: "/categories/raw-honey" },
  { name: "Wild Honey", image: "/images/products/Product4.png", href: "/categories/wild-honey" },
  { name: "Aster Honey", image: "/images/products/Product5.png", href: "/categories/aster-honey" },
  { name: "Organic Honey", image: "/images/products/Product6.png", href: "/categories/organic-honey" },
  { name: "Burst Honey", image: "/images/products/Product7.png", href: "/categories/burst-honey" },
  { name: "Uniflora Honey", image: "/images/products/Product8.png", href: "/categories/uniflora-honey" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuClosing, setMobileMenuClosing] = useState(false);
  const [bestSelling, setBestSelling] = useState([]);
  const [organicProducts, setOrganicProducts] = useState([]);
  const [rawProducts, setRawProducts] = useState([]);
  const [productTab, setProductTab] = useState("organic");
  const [topRated, setTopRated] = useState([]);
  const [productLoadingId, setProductLoadingId] = useState(null);
  const [productSlideIdx, setProductSlideIdx] = useState(0);
  const sliderRef = useRef(null);
  const [now, setNow] = useState(Date.now());
  const [navValue, setNavValue] = useState("");
  const { getCartCount, setIsCartOpen, addToCart } = useCart();
  const cartCount = getCartCount();

  const handleMobileMenuClose = () => {
    setMobileMenuClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setMobileMenuClosing(false);
    }, 300);
  };

  const closeNav = () => setNavValue("");

  useEffect(() => {
    fetch("/api/mock-data")
      .then((res) => res.json())
      .then((data) => {
        setBestSelling(data.featuredProducts.slice(0, 4));
        setTopRated(data.categoryProducts?.slice(0, 6) || []);
        setOrganicProducts(data.organicHoneyProducts || []);
        setRawProducts(data.rawHoneyProducts || []);
      });
  }, []);

  // Countdown timer tick
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getCountdown = useCallback((target) => {
    const diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${days}d : ${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(2, "0")}m : ${String(seconds).padStart(2, "0")}s`;
  }, [now]);

  const handleProductAddToCart = (product) => {
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

  const activeProducts = productTab === "organic" ? organicProducts : rawProducts;
  const VISIBLE_CARDS = 4;
  const maxSlideIdx = Math.max(0, activeProducts.length - VISIBLE_CARDS);

  const handleTabSwitch = (tab) => {
    setProductTab(tab);
    setProductSlideIdx(0);
  };

  const slideNext = () => {
    setProductSlideIdx((prev) => Math.min(prev + 1, maxSlideIdx));
  };

  const slidePrev = () => {
    setProductSlideIdx((prev) => Math.max(prev - 1, 0));
  };

  return (
    <>
    {/* Mobile Header */}
    <header
      className="sm:hidden bg-cover bg-center bg-no-repeat sticky top-0 z-50"
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      <div className="flex items-center justify-between px-4 py-4">
        {/* Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button className="p-1 cursor-pointer" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="HoneyWeb Logo"
              width={120}
              height={60}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button className="cursor-pointer">
            <Search className="w-5 h-5 text-black" />
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="cursor-pointer">
                <User className="w-5 h-5 text-black" />
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Link label="My Orders" labelIcon={<OrdersIcon className="w-4 h-4" />} href="/orders" />
                <UserButton.Link label="Wishlist" labelIcon={<Heart className="w-4 h-4" />} href="/wishlist" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
          <button className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
            <ShoppingBag className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 bg-[#00bcd4] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-medium">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Drawer */}
    {(mobileMenuOpen || mobileMenuClosing) && (
      <div className="fixed inset-0 z-[100] sm:hidden">
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuClosing ? "opacity-0" : "opacity-100"
          }`}
          onClick={handleMobileMenuClose}
        />
        {/* Drawer */}
        <div className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileMenuOpen && !mobileMenuClosing ? "translate-x-0" : "-translate-x-full"
        }`}>
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" onClick={handleMobileMenuClose}>
              <Image
                src="/images/logo.png"
                alt="HoneyWeb Logo"
                width={100}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <button
              onClick={handleMobileMenuClose}
              className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Menu Links */}
          <nav>
            {mobileMenuLinks.map((item) => (
              <MobileMenuItem
                key={item.label}
                item={item}
                onClose={handleMobileMenuClose}
              />
            ))}
          </nav>
        </div>
      </div>
    )}

    {/* Desktop Header */}
    <header
      className="relative hidden sm:block bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/pattern.jpg")` }}
    >
      {/* Logo */}
      <div className="py-6">
        <div className="container mx-auto flex items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="HoneyWeb Logo"
              width={200}
              height={100}
              className="h-auto"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="pb-4">
        <div className="max-w-[85rem] mx-auto px-4">
          <div className="bg-white rounded-full shadow-lg px-6 py-6 flex items-center justify-between">
            {/* Navigation Menu */}
            <NavigationMenu viewport={false} className="w-full" value={navValue} onValueChange={setNavValue}>
              <NavigationMenuList className="gap-1">
                {/* Home - Active */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="inline-flex h-10 items-center justify-center rounded-full bg-[#f5c518] px-6 py-2 text-sm font-medium text-black hover:bg-[#e6b615] transition-colors cursor-pointer">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Shop — Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent  rounded-full text-gray-700 font-medium cursor-pointer">
                    Shop
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[750px]" style={{ left: "-30%" }}>
                    <div className="flex w-[750px]" onClick={(e) => { if (e.target.closest('a')) closeNav(); }}>
                      <div className="flex-1 grid grid-cols-2 gap-8 p-7">
                        {/* Honey Categories */}
                        <div>
                          <h4 className="font-bold text-sm mb-4">Honey Categories</h4>
                          <ul className="space-y-2.5">
                            <li><Link href="/categories/acacia-honey" className="text-sm text-gray-500 hover:text-black transition-colors">Clover Honey</Link></li>
                            <li><Link href="/categories/wild-honey" className="text-sm text-gray-500 hover:text-black transition-colors">Raw Honey</Link></li>
                            <li>
                              <Link href="/categories/lychee-honey" className="text-sm text-gray-500 hover:text-black transition-colors">
                                Burst Honey
                                <span className="ml-1.5 bg-[#00bcd4] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">NEW</span>
                              </Link>
                            </li>
                            <li><Link href="/categories/kashmiri-honey" className="text-sm text-gray-500 hover:text-black transition-colors">Organic Honey</Link></li>
                            <li>
                              <Link href="/categories/sage-honey" className="text-sm text-gray-500 hover:text-black transition-colors">
                                Manuka Honey
                                <span className="ml-1.5 bg-[#e91e63] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">SALE</span>
                              </Link>
                            </li>
                            <li><Link href="/categories/jarrah-honey" className="text-sm text-gray-500 hover:text-black transition-colors">Tupelo Honey</Link></li>
                          </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                          <h4 className="font-bold text-sm mb-4">Quick Links</h4>
                          <ul className="space-y-2.5">
                            <li><Link href="/cart" className="text-sm text-gray-500 hover:text-black transition-colors">Shopping Cart</Link></li>
                            <li><Link href="/checkout" className="text-sm text-gray-500 hover:text-black transition-colors">Checkout</Link></li>
                            <li><Link href="/wishlist" className="text-sm text-gray-500 hover:text-black transition-colors">Wishlist</Link></li>
                          </ul>
                        </div>
                      </div>

                      {/* Right — Promo Banner */}
                      <div className="w-[230px] shrink-0 p-4 flex items-stretch">
                        <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col justify-center p-6">
                          <span className="border border-black text-black text-xs font-semibold px-2.5 py-1 rounded-sm inline-block w-fit mb-3">
                            Special sale!
                          </span>
                          <h3 className="text-2xl font-bold leading-tight mb-3">
                            Up To 30% OFF
                          </h3>
                          <Link href="/categories/sage-honey" className="text-sm font-bold text-black underline underline-offset-4 hover:no-underline">
                            SHOP NOW
                          </Link>
                          <Image
                            src="/images/products/Product.png"
                            alt="Special Sale"
                            width={120}
                            height={120}
                            className="absolute bottom-2 right-0 object-contain opacity-80"
                          />
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Categories with SALE badge — Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent rounded-full text-gray-700 font-medium cursor-pointer">
                    Categories
                    <span className="ml-2 bg-[#e91e63] text-white text-xs px-2 py-0.5 rounded-sm font-semibold">
                      SALE
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[1100px]" style={{ left: "-50%",}}>
                    <div className="flex gap-0 p-7 w-[1100px]" onClick={(e) => { if (e.target.closest('a')) closeNav(); }}>
                      {/* Left — Category grid */}
                      <div className="flex-1 grid grid-cols-3 gap-x-10 gap-y-7 pr-8 border-r border-gray-100">
                        {categoryMegaMenu.map((cat) => (
                          <div key={cat.name}>
                            <h4 className="font-bold text-sm mb-3">{cat.name}</h4>
                            <ul className="space-y-2">
                              {cat.items.map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`/categories/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-gray-500 text-sm hover:text-black transition-colors block"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Right — Best Selling */}
                      <div className="w-[440px] shrink-0 pl-8">
                        <h4 className="font-bold text-base text-center mb-4">Best Selling</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {bestSelling.map((product) => (
                            <div
                              key={product.id}
                              className="bg-gray-50 rounded-xl p-3 flex flex-row items-center gap-3 hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <div className="bg-white rounded-lg flex items-center justify-center w-[60px] h-[60px] shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.description}
                                  width={52}
                                  height={52}
                                  className="object-contain max-h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 min-w-0">
                                <p className="text-xs leading-snug line-clamp-2">
                                  {product.description}
                                </p>
                                <div className="flex items-center gap-1 text-xs font-bold">
                                  {product.discount && (
                                    <span className="text-gray-400 line-through font-normal text-[10px]">
                                      {product.discount}
                                    </span>
                                  )}
                                  <span>${product.pricing}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products with HOT badge — Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent  rounded-full text-gray-700 font-medium cursor-pointer">
                    Products
                    <span className="ml-2 bg-[#e91e63] text-white text-xs px-2 py-0.5 rounded-sm font-semibold">
                      HOT
                    </span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[880px]" style={{ left: "-160%" }}>
                    <div className="p-5 w-[880px]" onClick={(e) => { if (e.target.closest('a')) closeNav(); }}>
                      {/* Tabs — Organic Honey | Raw Honey */}
                      <div className="flex items-center justify-center gap-5 mb-4">
                        <button
                          onClick={() => handleTabSwitch("organic")}
                          className={`text-sm font-semibold transition-colors cursor-pointer pb-1 ${
                            productTab === "organic"
                              ? "text-black border-b-2 border-yellow-400"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          Organic Honey
                        </button>
                        <span className="text-gray-300 text-lg font-light select-none">|</span>
                        <button
                          onClick={() => handleTabSwitch("raw")}
                          className={`text-sm font-semibold transition-colors cursor-pointer pb-1 ${
                            productTab === "raw"
                              ? "text-black border-b-2 border-yellow-400"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          Raw Honey
                        </button>
                      </div>

                      {/* Product Cards Slider */}
                      <div className="relative">
                        {/* Prev Arrow */}
                        <button
                          onClick={slidePrev}
                          disabled={productSlideIdx === 0}
                          className={`absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200 transition-all cursor-pointer ${
                            productSlideIdx === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50 hover:shadow-xl"
                          }`}
                        >
                          <ChevronLeft size={14} className="text-gray-700" />
                        </button>

                        {/* Slider Track */}
                        <div className="overflow-hidden" ref={sliderRef}>
                          <div
                            className="flex gap-3 transition-transform duration-300 ease-in-out"
                            style={{ transform: `translateX(-${productSlideIdx * (100 / VISIBLE_CARDS + 1.4)}%)` }}
                          >
                            {activeProducts.map((product) => {
                              const discountPct =
                                product.originalPrice && product.pricing
                                  ? Math.round((1 - product.pricing / product.originalPrice) * 100)
                                  : null;
                              const isSelectOptions = product.type === "select_options";
                              return (
                                <div
                                  key={product.id}
                                  className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow group flex-shrink-0"
                                  style={{ width: `calc((100% - ${(VISIBLE_CARDS - 1) * 12}px) / ${VISIBLE_CARDS})` }}
                                >
                                  {/* Image area */}
                                  <div className="relative bg-[#F5F5F5] h-[120px] flex items-center justify-center p-2">
                                    {discountPct && (
                                      <span className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold w-7 h-7 flex items-center justify-center rounded-full z-10">
                                        -{discountPct}%
                                      </span>
                                    )}
                                    <Link href={`/product/${product.id}`}>
                                      <Image
                                        src={product.images[0]}
                                        alt={product.description}
                                        width={90}
                                        height={90}
                                        className="object-contain max-h-[100px] group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </Link>
                                    {/* Countdown */}
                                    {product.hasCountdown && product.countdownTarget && (
                                      <span className="absolute bottom-1.5 left-1.5 bg-white text-[#e91e63] text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
                                        {getCountdown(product.countdownTarget)}
                                      </span>
                                    )}
                                  </div>

                                  {/* Info */}
                                  <div className="p-2.5 flex flex-col items-center gap-1 text-center">
                                    <Link href={`/product/${product.id}`}>
                                      <h3 className="text-xs font-medium line-clamp-2 leading-snug min-h-[2rem] hover:text-amber-600 transition-colors">
                                        {product.description}
                                      </h3>
                                    </Link>
                                    {/* Stars */}
                                    <div className="flex gap-0.5">
                                      {[1, 2, 3, 4, 5].map((n) => (
                                        <Star
                                          key={n}
                                          className={`w-3 h-3 ${
                                            n <= product.rating
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    {/* Pricing */}
                                    <div className="flex items-center gap-1.5 font-bold text-xs">
                                      {product.originalPrice && (
                                        <span className="text-gray-400 line-through font-normal text-[10px]">
                                          ${product.originalPrice}
                                        </span>
                                      )}
                                      {product.priceMin && product.priceMax ? (
                                        <span>${product.priceMin} – ${product.priceMax}</span>
                                      ) : (
                                        <span>${product.pricing}</span>
                                      )}
                                    </div>
                                    {/* Button */}
                                    {isSelectOptions ? (
                                      <Link
                                        href={`/product/${product.id}`}
                                        className="flex items-center justify-center gap-1.5 bg-primary hover:bg-black hover:text-white text-[10px] font-bold py-1.5 px-3 rounded-full transition-colors cursor-pointer mt-0.5 w-full"
                                      >
                                        <ShoppingCart size={11} /> SELECT OPTIONS
                                      </Link>
                                    ) : (
                                      <button
                                        onClick={() => handleProductAddToCart(product)}
                                        disabled={productLoadingId === product.id}
                                        className={`flex items-center justify-center gap-1.5 bg-primary hover:bg-black hover:text-white text-[10px] font-bold py-1.5 px-3 rounded-full transition-colors cursor-pointer mt-0.5 w-full ${
                                          productLoadingId === product.id ? "opacity-60 pointer-events-none" : ""
                                        }`}
                                      >
                                        <ShoppingCart size={11} />
                                        ADD TO CART
                                        {productLoadingId === product.id && (
                                          <LoaderCircle size={11} className="animate-spin" />
                                        )}
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Next Arrow */}
                        <button
                          onClick={slideNext}
                          disabled={productSlideIdx >= maxSlideIdx}
                          className={`absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white shadow-lg flex items-center justify-center border border-gray-200 transition-all cursor-pointer ${
                            productSlideIdx >= maxSlideIdx ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-50 hover:shadow-xl"
                          }`}
                        >
                          <ChevronRight size={14} className="text-gray-700" />
                        </button>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Top Deals — Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent  rounded-full text-gray-700 font-medium cursor-pointer">
                    Top deals
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="!w-[1100px]" style={{ left: "-400%" }}>
                    <div className="flex w-[1100px]" onClick={(e) => { if (e.target.closest('a')) closeNav(); }}>
                      {/* Left — Shop By */}
                      <div className="flex-1 p-7 border-r border-gray-100">
                        <h4 className="font-bold text-lg text-center mb-6">Shop By</h4>
                        <div className="grid grid-cols-4 gap-x-6 gap-y-5">
                          {shopByCategories.map((cat) => (
                            <Link
                              key={cat.name}
                              href={cat.href}
                              className="flex flex-col items-center gap-2 group"
                            >
                              <div className="w-[120px] h-[120px] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  width={90}
                                  height={90}
                                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <span className="text-sm text-gray-700 font-medium group-hover:text-black transition-colors">
                                {cat.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Right — Top Rated */}
                      <div className="w-[480px] shrink-0 p-7">
                        <h4 className="font-bold text-lg text-center mb-6">Top Rated</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {topRated.map((product) => (
                            <Link
                              key={product.id}
                              href={`/product/${product.id}`}
                              className="flex items-center gap-3 border border-gray-100 rounded-xl p-3 hover:shadow-md transition-shadow"
                            >
                              <div className="bg-[#F5F5F5] rounded-lg flex items-center justify-center w-[70px] h-[70px] shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.description}
                                  width={55}
                                  height={55}
                                  className="object-contain max-h-full"
                                />
                              </div>
                              <div className="flex flex-col gap-1 min-w-0">
                                <p className="text-xs leading-snug line-clamp-3 text-gray-700">
                                  {product.description}
                                </p>
                                <div className="flex items-center gap-1.5 text-sm font-bold">
                                  {product.originalPrice && (
                                    <span className="text-gray-400 line-through font-normal text-xs">
                                      ${product.originalPrice}
                                    </span>
                                  )}
                                  <span>${product.pricing}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Elements Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent  rounded-full text-gray-700 font-medium cursor-pointer">
                    Elements
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col gap-1" onClick={(e) => { if (e.target.closest('a')) closeNav(); }}>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/about" className="block px-3 py-2  rounded-md text-gray-700 cursor-pointer">
                            About Us
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/contact" className="block px-3 py-2  rounded-md text-gray-700 cursor-pointer">
                            Contact
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/faq" className="block px-3 py-2  rounded-md text-gray-700 cursor-pointer">
                            FAQ
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <button className="p-2  rounded-full transition-colors cursor-pointer">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* User Icon / Clerk Auth */}
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="p-2 rounded-full transition-colors cursor-pointer">
                    <User className="w-5 h-5 text-gray-700" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/">
                  <UserButton.MenuItems>
                    <UserButton.Link label="My Orders" labelIcon={<OrdersIcon className="w-4 h-4" />} href="/orders" />
                    <UserButton.Link label="Wishlist" labelIcon={<Heart className="w-4 h-4" />} href="/wishlist" />
                      </UserButton.MenuItems>
                </UserButton>
              </SignedIn>

              {/* Cart Icon with Badge */}
              <button
                className="p-2  rounded-full transition-colors relative cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-[#00bcd4] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-medium">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    {/* Cart Drawer */}
    <CartDrawer />
    </>
  );
}
