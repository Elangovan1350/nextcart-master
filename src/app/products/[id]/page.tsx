"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, ArrowLeft, Star, Loader } from "lucide-react";
import axios from "axios";
import useStore from "@/store/usestore";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import useSWR from "swr";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  reviews: number;
  createdAt: string;
  updatedAt: string;
}
interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface Favorite {
  id: number;
  userId: string;
  productId: number;
  name: string;
  imageUrl: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = useSession();
  const { id } = use(params);
  const [cartButtonLoading, setCartButtonLoading] = useState(false);
  const [favoreteLoading, setFavoreteLoading] = useState(false);
  const { setCart: setCartCount } = useStore();

  const { data: product, isLoading: productLoading } = useSWR<Product>(
    id ? `/api/products/${id}` : null,
    fetcher,
  );
  const {
    data: cartlist,
    mutate: cartMutate,
    isLoading: cartLoading,
  } = useSWR<CartItem[]>("/api/cart", fetcher);
  const {
    data: favorites,
    mutate: favMutate,
    isLoading: favLoading,
  } = useSWR<Favorite[]>("/api/favorites", fetcher);

  const isAddedToCart = useMemo(
    () => cartlist?.some((item) => item.productId === product?.id),
    [cartlist, product],
  );
  const favoriteItem = useMemo(
    () => favorites?.find((fav) => fav.productId === product?.id),
    [favorites, product],
  );
  const isFavorite = !!favoriteItem;

  if (!product || productLoading || cartLoading || favLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce text-4xl sm:text-5xl mb-3 sm:mb-4">
            🛒
          </div>
          <p className="text-slate-400 flex items-center justify-center gap-2 text-sm sm:text-base">
            <Loader className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> Loading
            your product...
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (session.data === null) {
      toast.error("Please log in to add items to your cart.");
      return;
    }
    if (isAddedToCart) {
      toast.error("This item is already in your cart.");
      return;
    }

    setCartButtonLoading(true);

    try {
      const response = await axios.post("/api/cart", {
        productId: product?.id,
        quantity: 1,
      });
      if (response.status === 201) {
        const data = await cartMutate();
        setCartCount(data?.length ?? 0);
        toast.success("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartButtonLoading(false);
    }

    return;
  };

  const handleFavorite = async (id: number) => {
    if (session.data === null) {
      console.log("User not authenticated");

      toast.error("Please log in to add items to your wishlist.");

      return;
    }

    setFavoreteLoading(true);

    if (isFavorite == false) {
      const response = await axios.post("/api/favorites", {
        productId: id,
        name: product?.name,
        imageUrl: product?.imageUrl,
        price: product?.price,
      });
      if (response.status === 201) {
        await favMutate();
        toast.success("Added to favorites");
      }
    } else {
      const response = await axios.delete(`/api/favorites/${favoriteItem?.id}`);
      if (response.status === 200) {
        await favMutate();
        toast.success("Removed from favorites");
      }
    }
    setFavoreteLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm overflow-x-auto">
          <Link
            href="/"
            className="text-slate-400 hover:text-blue-400 transition flex items-center gap-1 whitespace-nowrap"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/products"
            className="text-slate-400 hover:text-blue-400 transition whitespace-nowrap"
          >
            Products
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-blue-400 font-semibold truncate">
            {product?.name}
          </span>
        </div>
      </div>

      {/* Product Section */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Product Image */}
          <div className="flex items-center justify-center pt-10 sm:pt-12 md:pt-14 lg:pt-16 bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl  hover:border-blue-500 transition">
            <div className="text-6xl sm:text-8xl lg:text-9xl animate-bounce">
              {product?.imageUrl}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Category Badge */}
            <div className="flex items-center gap-2">
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white">
                {product?.category}
              </span>
            </div>
            {/* Product Name */}
            <div className="space-y-2 sm:space-y-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {product?.name}
              </h1>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(product?.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base sm:text-lg font-bold text-white">
                  {product?.rating}
                </span>
                <span className="text-xs sm:text-sm text-slate-400">
                  ({product?.reviews} reviews)
                </span>
              </div>
            </div>
            {/* Price */}
            <div className="space-y-2 border-t border-b border-slate-700 py-4 sm:py-6">
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                ${product?.price.toFixed(2)}
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Inclusive of all taxes
              </p>
            </div>
            {/* Description */}
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-sm sm:text-base font-semibold text-white">
                About this product
              </h2>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                {product?.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 sm:pt-4">
              <button
                onClick={handleAddToCart}
                disabled={cartButtonLoading}
                className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition transform hover:scale-105 ${
                  isAddedToCart
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                }`}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {cartButtonLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />{" "}
                    Adding...
                  </span>
                ) : isAddedToCart ? (
                  "✓ Added to Cart"
                ) : (
                  "Add to Cart"
                )}
              </button>
              <button
                onClick={() => {
                  handleFavorite(product.id);
                }}
                className={`py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition transform hover:scale-105 ${
                  isFavorite
                    ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer border-2 border-red-600 hover:border-red-500"
                    : "border-2 border-slate-600 hover:border-blue-500 text-white hover:text-blue-400 cursor-pointer"
                }`}
              >
                {favoreteLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />{" "}
                  </span>
                ) : (
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${isFavorite ? "fill-current" : ""}`}
                  />
                )}
              </button>
            </div>
            {/* Product Info */}
            <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-xl p-4 sm:p-6 space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Product ID:</span>
                <span className="text-white font-semibold">{product?.id}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Category:</span>
                <span className="text-white font-semibold">
                  {product?.category}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Stock Status:</span>
                <span className="text-green-400 font-semibold">In Stock</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-slate-400">Last Updated:</span>
                <span className="text-slate-400">
                  {new Date(product.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
