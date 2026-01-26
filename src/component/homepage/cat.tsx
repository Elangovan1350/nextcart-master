import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const cat = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="bg-linear-to-r from-blue-600 to-cyan-600 rounded-3xl p-6 sm:p-12 md:p-16 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
          Ready to Start Shopping?
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Sign up today and get 15% off your first purchase!
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-blue-600 hover:bg-slate-100 rounded-lg font-bold text-sm sm:text-base transition transform hover:scale-105"
        >
          Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  );
};

export default cat;
