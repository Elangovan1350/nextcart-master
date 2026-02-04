"use client";

import axios from "axios";
import { Heart, Star, Filter, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Favorite {
  id: number;
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
}

const Favorites = () => {
  const router = useRouter();
  const [allFavorites, setAllFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [removingId, setRemovingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get<Favorite[]>("/api/favorites");
      setAllFavorites(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      setRemovingId(id);
     const res = await axios.delete(`/api/favorites/${id}`);
     if(res.status === 200){
      setAllFavorites(allFavorites.filter((fav) => fav.id !== id));
      setRemovingId(null);
     }
    } catch (error) {
      console.error("Error removing favorite:", error);
      setRemovingId(null);
    }
  };

  // Filter and sort favorites
  const filteredFavorites = allFavorites
    .filter((favorite) => {
      const matchesSearch = favorite.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "recent")
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return 0;
    });

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="space-y-2 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Your
            <span className="text-transparent bg-clip-text bg-linear-to-r from-pink-400 to-rose-400">
              {" "}
              Favorites
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl">
            {allFavorites.length > 0
              ? `You have ${allFavorites.length} favorite ${
                  allFavorites.length === 1 ? "product" : "products"
                }. Keep track of items you love!`
              : "Start adding products to your favorites to see them here."}
          </p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="max-w-7xl mx-auto sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-linear-to-b from-slate-900 via-slate-800 to-transparent">
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search favorites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition"
          />

          {/* Sort Controls */}
          <div className="flex flex-row gap-2 sm:gap-3 justify-between items-stretch sm:items-center">
            <div className="flex gap-2 items-center">
              <Heart className="w-5 h-5 text-pink-400 fill-pink-400" />
              <span className="text-slate-300 text-xs sm:text-sm">
                {filteredFavorites.length}{" "}
                {filteredFavorites.length === 1 ? "item" : "items"}
              </span>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500 transition"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Favorites Grid */}
      {loading ? (
        <div className="bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center py-32 px-4">
          <div className="text-center">
            <div className="animate-bounce text-4xl sm:text-5xl mb-3 sm:mb-4">
              ❤️
            </div>
            <p className="text-slate-400 flex items-center justify-center gap-2 text-sm sm:text-base">
              <Loader2 className="animate-spin w-4 h-4 sm:w-5 sm:h-5" /> Loading
              your favorites...
            </p>
          </div>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {filteredFavorites.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredFavorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/20 transition transform hover:scale-105 group"
                >
                  {/* Product Image */}
                  <div
                    onClick={() => {
                      router.push(`/products/${favorite.productId}`);
                    }}
                    className="bg-linear-to-br from-slate-700 to-slate-800 h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition cursor-pointer"
                  >
                    {favorite.imageUrl}
                  </div>

                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div
                        onClick={() => {
                          router.push(`/products/${favorite.productId}`);
                        }}
                        className="flex-1 min-w-0 cursor-pointer"
                      >
                        <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                          {favorite.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Added{" "}
                          {new Date(favorite.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Price and Remove Button */}
                    <div className="flex justify-between items-center gap-2 mt-3">
                      <span className="text-base sm:text-lg font-bold text-pink-400">
                        ${favorite.price}
                      </span>
                      <button
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        disabled={removingId === favorite.id}
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {removingId === favorite.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-20">
              <div className="text-6xl sm:text-7xl mb-4">💔</div>
              <p className="text-lg sm:text-2xl text-slate-400 mb-4">
                {searchTerm
                  ? "No favorites match your search"
                  : "No favorites yet"}
              </p>
              <p className="text-sm sm:text-base text-slate-500 mb-6">
                {searchTerm
                  ? "Try a different search term"
                  : "Start exploring and add products to your favorites!"}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => router.push("/products")}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition text-sm sm:text-base"
                >
                  Browse Products
                </button>
              )}
            </div>
          )}
        </section>
      )}

      {filteredFavorites.length > 0 && (
        <div className="flex justify-center items-center pb-8 sm:pb-12 px-4">
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-semibold transition text-sm sm:text-base"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;
