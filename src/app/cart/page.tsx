"use client";

import { useSession } from "@/lib/auth-client";
import useStore from "@/store/usestore";
import axios from "axios";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Loader,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { set } from "zod";
import { fi } from "zod/v4/locales";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface CartItem {
  id: number;
  userId: string;
  productId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product?: Product;
}

const CartPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { setCart } = useStore();

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch cart items
        const cartRes = await axios.get("/api/cart");
        setCartItems(cartRes.data);
        setCart(cartRes.data.length);

        // Fetch all products
        const productsRes = await axios.get<Product[]>("/api/products");

        setProducts(productsRes.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, router]);

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      await axios.patch(`/api/cart/${cartItemId}`, { quantity: newQuantity });
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const removeFromCart = async (cartItemId: number) => {
    setDeletingId(cartItemId);
    setDeleting(true);

    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item.id !== cartItemId));
      setCart(cartItems.length - 1);
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setDeleting(false);
      toast.success("Item removed from cart");
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = products[item.productId];
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-bounce text-4xl mb-4">🛒</div>
          <p className="text-slate-400 flex items-center justify-center gap-2">
            <Loader className="animate-spin" /> Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Your Shopping
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
              {" "}
              Cart
            </span>
          </h1>
          <p className="text-xl text-slate-400">
            {totalItems === 0
              ? "Your cart is empty"
              : `You have ${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center space-y-8 py-16">
            <div className="text-9xl">🛍️</div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Cart is Empty</h2>
              <p className="text-xl text-slate-400">
                Add some amazing products to get started!
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold gap-2 transition transform hover:scale-105"
            >
              Continue Shopping <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = products[item.productId - 1];
                if (!product) return null;

                return (
                  <div
                    key={item.id}
                    className="bg-slate-800 rounded-2xl border border-slate-700 p-6 hover:border-slate-600 transition"
                  >
                    <div className="flex gap-6">
                      <div
                        className="flex-1 flex flex-col sm:flex-row gap-6"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        {/* Product Image */}
                        <div className="shrink-0 w-24 h-24 bg-slate-700 rounded-lg overflow-hidden">
                          <div className="bg-linear-to-br from-slate-700 to-slate-800 h-full flex items-center justify-center text-6xl group-hover:scale-110 transition">
                            {product.imageUrl}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">
                              {product.name}
                            </h3>
                            <p className="text-slate-400 text-sm line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                          <div className="text-blue-400 font-bold">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-600/20 text-red-400 rounded-lg transition"
                          title="Remove from cart"
                        >
                          {deleting && deletingId === item.id ? (
                            <Loader className="w-5 h-5 animate-spin" />
                          ) : (
                            <Trash2 className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex items-center gap-3 bg-slate-700 rounded-lg p-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || isUpdating}
                            className="p-1 hover:bg-slate-600 rounded disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4 text-slate-300" />
                          </button>
                          <span className="text-white font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={item.quantity > 10 || isUpdating}
                            className="p-1 hover:bg-slate-600 rounded disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4 text-slate-300" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-slate-400 text-sm">Subtotal</p>
                          <p className="text-white font-bold">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-linear-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-700 p-8 shadow-lg shadow-black/20">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-blue-400" />
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-600">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
                      ${(totalPrice * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition transform hover:scale-105 mb-3">
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block w-full px-6 py-4 border-2 border-slate-600 hover:border-slate-400 text-white text-center rounded-lg font-semibold transition"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Info Card */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                <h3 className="font-bold text-white mb-4">✓ Free Returns</h3>
                <p className="text-slate-400 text-sm mb-4">
                  30-day money-back guarantee on all orders
                </p>
                <div className="space-y-2 text-sm text-slate-400">
                  <p>✓ Secure checkout</p>
                  <p>✓ Fast delivery</p>
                  <p>✓ 24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CartPage;
