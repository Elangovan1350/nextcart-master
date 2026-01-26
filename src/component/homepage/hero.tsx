import { ArrowRight } from "lucide-react";
import Link from "next/link";

const herosection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 md:py-32">
      <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Shop Everything You
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                {" "}
                Love
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-400">
              Discover amazing products at unbeatable prices. Fast shipping,
              secure checkout, and 30-day guarantee.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/products"
              className="px-4 sm:px-8 py-2.5 sm:py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition transform hover:scale-105 text-sm sm:text-base"
            >
              Shop Now <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <button className="px-4 sm:px-8 py-2.5 sm:py-4 border-2 border-slate-600 hover:border-slate-400 text-white rounded-lg font-semibold transition text-sm sm:text-base">
              Watch Demo
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12 md:mt-0">
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl animate-bounce">
            🛍️
          </div>
        </div>
      </div>
    </section>
  );
};

export default herosection;
