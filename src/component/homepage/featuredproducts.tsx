"use client";
import axios from "axios";
import { ArrowRight, Loader2, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
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
const featuredproducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get<Product[]>("/api/productshomepage");
      setFeaturedProducts(res.data);
      setLoading(false);
    };

    fetchProducts();
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          Featured Products
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400">
          Checkout our best-selling items loved by thousands of customers
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin flex justify-center items-center rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500">
            <Loader2 className="animate-spin w-8 h-8" />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                router.push(`/products/${product.id}`);
              }}
              className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition transform hover:scale-105"
            >
              <div className="bg-linear-to-br from-slate-700 to-slate-800 h-32 sm:h-40 md:h-48 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl">
                {product.imageUrl}
              </div>
              <div className="p-3 sm:p-4 lg:p-6">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-slate-400">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-blue-400">
                    {product.price}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 sm:p-2 rounded-lg transition">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 sm:mt-12 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm sm:text-base transition transform hover:scale-105"
        >
          View All Products <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
};

export default featuredproducts;
