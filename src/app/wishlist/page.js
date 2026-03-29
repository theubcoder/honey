"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart({ id: item.id, image: item.image, description: item.description, price: item.price });
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
          <Heart size={36} className="text-gray-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Your Wishlist is Empty</h1>
        <p className="text-gray-500 text-center max-w-md">
          Looks like you haven't added anything to your wishlist yet. Browse our products and tap the heart icon to save your favorites!
        </p>
        <Link
          href="/"
          className="mt-2 bg-black text-white font-bold py-3 px-8 rounded-full text-sm hover:bg-gray-800 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[85rem] mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">
        My Wishlist <span className="text-gray-400 font-normal text-lg">({wishlistItems.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
            {/* Image */}
            <Link href={`/product/${item.id}`}>
              <div className="bg-[#F5F5F5] h-[220px] flex items-center justify-center p-6">
                <Image
                  src={item.image}
                  alt={item.description}
                  width={160}
                  height={160}
                  className="object-contain max-h-[180px] group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Details */}
            <div className="p-4">
              <Link href={`/product/${item.id}`}>
                <p className="text-sm line-clamp-2 hover:text-[#c17d10] transition-colors">
                  {item.description}
                </p>
              </Link>
              <p className="text-lg font-bold mt-2">${item.price}</p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-black text-white text-xs font-bold py-2.5 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <ShoppingCart size={14} /> MOVE TO CART
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                >
                  <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
