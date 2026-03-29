"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChartNoAxesColumn,
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  LoaderCircle,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "@/context/CartContext";

const RatingStars = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((num) => (
      <Star
        key={num}
        className={`w-4 h-4 ${
          num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export function Products() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [imgLoading, setImgLoading] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    fetch("/api/mock-data")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const handleAddToCart = (product, quantity = 1) => {
    setLoadingId(product.id);
    setTimeout(() => {
      addToCart({
        id: product.id,
        image: product.images[0],
        description: product.description,
        price: parseInt(product.pricing),
      }, quantity);
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

  return (
    <>
      <div className="flex max-w-[85rem] m-auto justify-center items-center mt-10 sm:p-0 px-10">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="-ml-2 sm:-ml-4">
            {products.map((e, idx) => (
              <CarouselItem key={idx} className="pl-2 sm:pl-4 basis-1/2 lg:basis-1/4">
                <div className="p-1 relative">
                  <Card className="pt-0 group relative overflow-hidden">
                    <CardContent className="flex flex-col p-0">
                      {/* Hover icons */}
                      <div className="flex flex-col absolute top-8 right-3 gap-2 translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-10">
                        <div
                          className="bg-white p-1 rounded-full cursor-pointer hover:bg-primary"
                          onClick={() => toggleWishlist({ id: e.id, image: e.images[0], description: e.description, price: parseInt(e.pricing) })}
                        >
                          <Heart size={20} className={isInWishlist(e.id) ? "fill-black text-black" : ""} />
                        </div>
                        <div className="bg-white p-1 rounded-full cursor-pointer hover:bg-primary">
                          <ChartNoAxesColumn size={20} />
                        </div>
                        <div
                          className="bg-white p-1 rounded-full cursor-pointer hover:bg-primary"
                          onClick={() => openModal(e)}
                        >
                          <Eye size={20} />
                        </div>
                      </div>

                      {/* Card image */}
                      <Link href={`/product/${e.id}`}>
                      <div className="bg-[#F5F5F5] w-full h-full flex items-center justify-center p-4 sm:p-10 rounded-t-lg">
                        <Image
                          src={e.images[0]}
                          alt={e.description}
                          width={200}
                          height={200}
                          className="object-contain max-h-[140px] sm:max-h-[200px]"
                        />
                      </div>
                      </Link>

                      <div className="flex flex-col items-center px-2 sm:px-3">
                        <Link href={`/product/${e.id}`}>
                        <h3 className="line-clamp-2 my-2 sm:my-4 text-xs sm:text-base text-center hover:text-primary transition-colors">
                          {e.description}
                        </h3>
                        </Link>
                        <RatingStars rating={e.rating} />
                        <span className="flex gap-2 font-bold justify-center my-2 sm:my-4 text-sm sm:text-base">
                          <h3 className="text-gray-500 line-through">{e.discount}</h3>
                          <h3>${e.pricing}</h3>
                        </span>
                        <button
                          onClick={() => handleAddToCart(e)}
                          disabled={loadingId === e.id}
                          className={`inline-block w-28 sm:w-40 bg-primary hover:text-white py-2 sm:py-3 rounded-full text-[11px] sm:text-[13px] font-bold hover:bg-black transition-all mb-3 cursor-pointer ${
                            loadingId === e.id ? "opacity-60 pointer-events-none" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center gap-1 sm:gap-2">
                            <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px]" />
                            ADD TO CART
                            {loadingId === e.id && (
                              <LoaderCircle size={16} className="animate-spin" />
                            )}
                          </div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="z-20 left-0 sm:left-2 md:-left-4" />
          <CarouselNext className="z-20 right-0 sm:right-2 md:-right-4" />
        </Carousel>
      </div>

      {/* Quick View Modal */}
      {modalProduct && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 ${isClosing ? "animate-overlay-out" : "animate-overlay-in"}`}
          onClick={closeModal}
        >
          <div
            className={`relative bg-white rounded-xl overflow-hidden w-full max-w-3xl flex flex-col sm:flex-row shadow-2xl max-h-[85vh] ${
              isClosing ? "animate-flip-out" : "animate-flip-in"
            }`}
            onClick={(ev) => ev.stopPropagation()}
            onAnimationEnd={handleAnimationEnd}
          >
            {/* Close */}
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20 text-gray-500 hover:text-black transition-colors cursor-pointer"
              onClick={closeModal}
            >
              <X className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
            </button>

            {/* Left — image slider */}
            <div className="relative bg-[#F5F5F5] w-full sm:w-[45%] h-[180px] sm:h-[380px] shrink-0">
              <div className="absolute inset-0 bottom-7 sm:bottom-9 flex items-center justify-center p-3 sm:p-6">
                {imgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5F5F5]/80 z-10">
                    <LoaderCircle size={30} className="animate-spin text-primary sm:w-[38px] sm:h-[38px]" />
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

              <button
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-1.5 shadow hover:bg-primary transition-colors cursor-pointer"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </button>

              <button
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 sm:p-1.5 shadow hover:bg-primary transition-colors cursor-pointer"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
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
                  onClick={() => handleAddToCart(modalProduct, qty)}
                  disabled={loadingId === modalProduct.id}
                  className={`flex-1 bg-primary hover:bg-yellow-500 text-black font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer ${
                    loadingId === modalProduct.id ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  ADD TO CART
                  {loadingId === modalProduct.id && (
                    <LoaderCircle className="w-3.5 h-3.5 sm:w-[15px] sm:h-[15px] animate-spin" />
                  )}
                </button>
              </div>

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

export default Products;
