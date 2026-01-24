import { ShoppingCart } from "lucide-react";

const footer = () => {
  return (
    <footer className="border-t border-slate-700 bg-slate-950 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2   md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xl font-bold text-white mb-4">
              <ShoppingCart className="w-6 h-6 text-blue-500" />
              NextCart
            </div>
            <p className="text-slate-400">
              Your trusted online shopping destination
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Shop</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Best Sellers
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Track Order
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8">
          <p className="text-center text-slate-400">
            © 2026 NextCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
