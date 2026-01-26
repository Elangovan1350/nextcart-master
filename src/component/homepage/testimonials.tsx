import { Star } from "lucide-react";
import React from "react";

const testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Customer",
      text: "Best shopping experience ever! Fast shipping and amazing customer service.",
      avatar: "👩‍💼",
    },
    {
      name: "Mike Chen",
      role: "Verified Buyer",
      text: "Quality products and great prices. I recommend NextCart to all my friends!",
      avatar: "👨‍💻",
    },
    {
      name: "Emma Davis",
      role: "Customer",
      text: "Love the variety of products. Found exactly what I was looking for!",
      avatar: "👩‍🎨",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
          What Our Customers Say
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-slate-400">
          Join thousands of happy customers who trust NextCart
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-slate-800 bg-opacity-50 backdrop-blur border border-slate-700 rounded-2xl p-4 sm:p-6 lg:p-8"
          >
            <div className="flex gap-1 mb-3 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 mb-4 sm:mb-6 italic">
              "{testimonial.text}"
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">{testimonial.avatar}</div>
              <div>
                <p className="font-bold text-white text-sm sm:text-base">
                  {testimonial.name}
                </p>
                <p className="text-xs sm:text-sm text-slate-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default testimonials;
