"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Trash2, Edit2, Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "@/lib/auth-client";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: string;
  rating: number;
  reviews: number;
}

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z
    .string()
    .refine(
      (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
      "Price must be a valid number greater than 0",
    ),
  imageUrl: z.string().optional(),
  category: z.string().min(1, "Category is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  //   const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(true);

  console.log(session?.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "",
    },
  });

  useEffect(() => {
    if (session?.user.role === "admin") {
      fetchProducts();
      setSessionLoading(false);
    } else {
      setSessionLoading(false);
    }
  }, [session]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
      setSessionLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Access Denied</div>
      </div>
    );
  }

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      if (editingId) {
        // Update product
        await axios.put(`/api/products/${editingId}`, {
          ...data,
          price: parseFloat(data.price),
        });
        toast.success("Product updated successfully");
      } else {
        // Create product
        await axios.post("/api/products", {
          ...data,
          price: parseFloat(data.price),
        });
        toast.success("Product added successfully");
      }

      reset();
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setValue("name", product.name);
    setValue("description", product.description || "");
    setValue("price", product.price.toString());
    setValue("imageUrl", product.imageUrl || "");
    setValue("category", product.category);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Product Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={20} /> Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="col-span-1">
                <input
                  type="text"
                  placeholder="Product Name *"
                  {...register("name")}
                  className={`w-full bg-slate-700 text-white px-4 py-2 rounded border transition ${
                    errors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  } focus:outline-none`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Price *"
                  step="0.01"
                  {...register("price")}
                  className={`w-full bg-slate-700 text-white px-4 py-2 rounded border transition ${
                    errors.price
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  } focus:outline-none`}
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Category *"
                  {...register("category")}
                  className={`w-full bg-slate-700 text-white px-4 py-2 rounded border transition ${
                    errors.category
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  } focus:outline-none`}
                />
                {errors.category && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Image URL"
                  {...register("imageUrl")}
                  className={`w-full bg-slate-700 text-white px-4 py-2 rounded border transition ${
                    errors.imageUrl
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  } focus:outline-none`}
                />
                {errors.imageUrl && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 md:col-span-2">
                <textarea
                  placeholder="Description"
                  {...register("description")}
                  className={`w-full bg-slate-700 text-white px-4 py-2 rounded border transition h-24 resize-none ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-600 focus:border-blue-500"
                  } focus:outline-none`}
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="col-span-1 md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition flex-1"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editingId
                      ? "Update Product"
                      : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-6 py-2 rounded transition flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
          {products.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              No products found. Add your first product to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className={`border-b border-slate-700 hover:bg-slate-700 transition ${
                        index % 2 === 0 ? "bg-slate-800" : "bg-slate-750"
                      }`}
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm truncate max-w-xs">
                        {product.description || "N/A"}
                      </td>
                      <td className="px-6 py-4 flex gap-3">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-2 transition text-sm"
                        >
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-2 transition text-sm"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-white">{products.length}</p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm">Average Price</p>
            <p className="text-3xl font-bold text-white">
              $
              {(
                products.reduce((sum, p) => sum + p.price, 0) /
                  products.length || 0
              ).toFixed(2)}
            </p>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
            <p className="text-gray-400 text-sm">Total Value</p>
            <p className="text-3xl font-bold text-white">
              ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
