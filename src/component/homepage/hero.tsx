import { ArrowRight } from "lucide-react";
import Link from "next/link";

const herosection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-12  items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Shop Everything You
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {" "}
                Love
              </span>
            </h1>
            <p className="text-xl text-slate-400">
              Discover amazing products at unbeatable prices. Fast shipping,
              secure checkout, and 30-day guarantee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              Shop Now <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 border-2 border-slate-600 hover:border-slate-400 text-white rounded-lg font-semibold transition">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-12 md:mt-0">
          <div className="text-9xl animate-bounce">🛍️</div>
        </div>
      </div>
    </section>
  );
};

export default herosection;
