"use client";

import axios from "axios";
import { ShoppingCart, Star, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
}

const Products = () => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get<Product[]>("/api/products");
      setAllProducts(res.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    "Audio",
    "Wearables",
    "Cables & Chargers",
    "Power & Charging",
    "Electronics",
    "Computing",
    "Lighting",
    "Smart Home",
    "Storage",
    "Accessories",
    "Camera & Video",
    "Gadgets",
    "Gaming",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Filter products
  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen  bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white">
            Explore Our
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              Products
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Discover {allProducts.length} amazing products across{" "}
            {categories.length - 1} categories. Find exactly what you're looking
            for.
          </p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="max-w-7xl mx-auto sticky top-0 z-30 px-4 sm:px-6 lg:px-8  py-6   bg-linear-to-b from-slate-900 via-slate-800 to-transparent ">
        <div className=" flex flex-col gap-2">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition"
          />

          {/* Sort and Filter Controls */}
          <div className="flex gap-2 sm:gap-4 justify-between items-center flex-nowrap">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white hover:border-blue-500 transition flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? "Hide" : "Show"} Filters
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>

            <div className="text-slate-300 text-sm hidden md:block">
              {filteredProducts.length} products
            </div>
          </div>

          {/* Category Filter */}

          {showFilters && (
            <div className="grid md:grid-cols-5 lg:grid-cols-7 grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition  shrink-0 flex justify-center items-center ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500"
                  }`}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      {Loading ? (
        <div className="h-36 flex items-center justify-center bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
          <p className="text-xl text-slate-400">Loading products...</p>
        </div>
      ) : (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  onClick={() => {
                    router.push(`/products/${product.id}`);
                  }}
                  key={product.id}
                  className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition transform hover:scale-105 group"
                >
                  {/* Product Image */}
                  <div className="bg-linear-to-br from-slate-700 to-slate-800 h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition">
                    {product.imageUrl}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-white line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-blue-400 mt-1">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price and Button */}
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-400">
                        {product.price}
                      </span>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-slate-400 mb-4">No products found</p>
            </div>
          )}
        </section>
      )}
      <div className="flex justify-center items-center pb-12">
        <button
          onClick={() => {
            setSearchTerm("");
            setSelectedCategory("All");
          }}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Products;
