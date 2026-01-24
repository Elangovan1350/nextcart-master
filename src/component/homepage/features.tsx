import { Shield, Truck, Zap } from "lucide-react";
import React from "react";

const features = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-3 gap-8">
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-blue-500 transition">
        <Truck className="w-12 h-12 text-blue-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Free Shipping</h3>
        <p className="text-slate-400">
          Free shipping on all orders over $50. Fast delivery to your doorstep.
        </p>
      </div>
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-cyan-500 transition">
        <Shield className="w-12 h-12 text-cyan-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
        <p className="text-slate-400">
          100% secure checkout with SSL encryption. Your data is always
          protected.
        </p>
      </div>
      <div className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-purple-500 transition">
        <Zap className="w-12 h-12 text-purple-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Fast Support</h3>
        <p className="text-slate-400">
          24/7 customer support. We are here to help whenever you need us.
        </p>
      </div>
    </section>
  );
};

export default features;
