"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Order {
  id: number;
  userId: string;
  productId: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!session?.user) {
      router.push("/login");
      return;
    }

    // Fetch user orders
    if (session?.user) {
      fetchOrders();
    }
  }, [session, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios("/api/orders");

      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
      case "PROCESSING":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "SHIPPED":
        return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
      case "DELIVERED":
        return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-300 border border-red-500/30";
      default:
        return "bg-slate-500/20 text-slate-300 border border-slate-500/30";
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (session === undefined || loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-500">
            My Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-3">
            View and manage your shopping history
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 backdrop-blur-sm">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 sm:p-12 text-center">
            <div className="text-slate-500 mb-4 sm:mb-6 flex justify-center">
              <svg
                className="h-12 sm:h-16 w-12 sm:w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-slate-300 text-lg sm:text-xl mb-4 sm:mb-6">
              No orders yet
            </p>
            <button
              onClick={() => router.push("/products")}
              className="bg-linear-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 text-sm sm:text-base rounded-lg transition transform hover:scale-105"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-xl sm:rounded-2xl transition-all hover:shadow-lg hover:shadow-blue-500/10 p-4 sm:p-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 items-start sm:items-center">
                  {/* Product Image */}
                  <div className="flex justify-center sm:justify-start">
                    {order.imageUrl ? (
                      <div className="h-20 w-20 sm:h-24 sm:w-24 text-2xl sm:text-3xl bg-slate-700/50 rounded-lg sm:rounded-xl flex items-center justify-center border border-slate-600 hover:border-slate-500 transition">
                        {order.imageUrl}
                      </div>
                    ) : (
                      <div className="h-20 w-20 sm:h-24 sm:w-24 bg-slate-700/50 rounded-lg sm:rounded-xl flex items-center justify-center border border-slate-600">
                        <svg
                          className="h-10 w-10 sm:h-12 sm:w-12 text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Product Name & Order ID */}
                  <div className="col-span-1 sm:col-span-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Product
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-slate-100 mt-1">
                      {order.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Order #{order.id}
                    </p>
                  </div>

                  {/* Date */}
                  <div className="col-span-1 sm:col-span-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Date
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-slate-100 mt-1">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 sm:col-span-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Quantity
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-slate-100 mt-1">
                      {order.quantity} item(s)
                    </p>
                  </div>

                  {/* Total */}
                  <div className="col-span-1 sm:col-span-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Total
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 mt-1">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="col-span-1 sm:col-span-1">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                      Status
                    </p>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-700">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Unit Price
                    </p>
                    <p className="text-slate-100 text-sm sm:text-base mt-1">
                      ${order.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Last Updated
                    </p>
                    <p className="text-slate-100 text-xs sm:text-sm mt-1">
                      {formatDate(order.updatedAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Link
                      href={`/products/${order.productId}`}
                      className="text-blue-400 hover:text-blue-300 font-semibold transition inline-flex items-center gap-1"
                    >
                      View Details <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {/* {orders.length > 0 && (
          <div className="mt-8 sm:mt-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="border-b sm:border-b-0 sm:border-r border-slate-700 pb-4 sm:pb-0 sm:pr-8">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 sm:mb-3">
                  Total Orders
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                  {orders.length}
                </p>
              </div>
              <div className="border-b sm:border-b-0 sm:border-r border-slate-700 pb-4 sm:pb-0 sm:pr-8">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 sm:mb-3">
                  Total Items
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                  {orders.reduce((sum, order) => sum + order.quantity, 0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 sm:mb-3">
                  Amount Spent
                </p>
                <p className="text-2xl sm:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-500">
                  $
                  {orders
                    .reduce((sum, order) => sum + order.total, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}
