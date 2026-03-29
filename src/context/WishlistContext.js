"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Load from localStorage on mount
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const saved = localStorage.getItem("wishlist");
      if (saved) {
        try {
          setWishlistItems(JSON.parse(saved));
        } catch {}
      }
    }
  }, [isLoaded, isSignedIn]);

  // Save to localStorage on change
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded, isSignedIn]);

  const toggleWishlist = (product) => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const getWishlistCount = () => wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
