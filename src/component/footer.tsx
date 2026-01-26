import { ShoppingCart } from "lucide-react";

const footer = () => {
  return (
    <footer className="border-t border-slate-700 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4">
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              NextCart
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Your trusted online shopping destination
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Shop
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Support
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">
              Legal
            </h4>
            <ul className="space-y-1.5 sm:space-y-2 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white transition text-xs sm:text-sm"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 sm:pt-8">
          <p className="text-center text-slate-400 text-xs sm:text-sm">
            © 2026 NextCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
