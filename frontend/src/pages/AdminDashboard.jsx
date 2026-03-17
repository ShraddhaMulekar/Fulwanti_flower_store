import React, { useEffect, useState } from "react";
import { API_URL } from "../api/api";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
};

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/product/check_all`);
      const data = await res.json();
      if (data?.status) {
        setProducts(data.allProduct || []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editing ? "PATCH" : "POST";
      const url = editing
        ? `${API_URL}/product/update/${editing}`
        : `${API_URL}/product/create`;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      const data = await res.json();
      if (data?.status) {
        await fetchProducts();
        setForm(emptyProduct);
        setEditing(null);
      } else {
        alert(data?.message || "Failed to save product");
      }
    } catch (err) {
      console.log(err);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      image: p.image || "",
      category: p.category || "",
      stock: p.stock || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/product/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const data = await res.json();
      if (data?.status) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data?.message || "Failed to delete product");
      }
    } catch (err) {
      console.log(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-[360px,1fr] gap-6 animate-fade-up">
      {/* Product form */}
      <aside className="rounded-2xl border border-orange-400/10 bg-[#0b0d10] p-4 sm:p-6 h-fit sticky top-24">
        <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
          only fresh blooms
        </p>
        <h1 className="text-2xl font-extrabold text-gray-100 mb-1">
          Admin Dashboard
        </h1>
        <p className="text-xs text-gray-400 mb-4">
          Create, update, and delete products. Admin can access all user pages &
          data from backend as needed.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={2}
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div className="flex gap-2">
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-1/2 rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-1/2 rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-gray-100 outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select category</option>
            <option value="rose">Rose</option>
            <option value="lily">Lily</option>
            <option value="tulip">Tulip</option>
            <option value="bouquet">Bouquet</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 h-11 rounded-xl bg-orange-400 text-black font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? "Saving..."
              : editing
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </aside>

      {/* Product list */}
      <section className="rounded-2xl border border-orange-400/10 bg-[#0b0d10] p-4 sm:p-6">
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
              manage inventory
            </p>
            <h2 className="text-xl font-extrabold text-gray-100">
              All Products
            </h2>
          </div>
          <p className="text-xs text-gray-400">{products.length} items</p>
        </div>
        {products.length === 0 ? (
          <p className="text-xs text-gray-400">No products available.</p>
        ) : (
          <div className="space-y-3 text-sm max-h-130 overflow-y-auto pr-1">
            {products.map((p) => (
              <div
                key={p._id}
                className="group flex items-center gap-3 border border-white/10 rounded-2xl p-3 bg-[#0f1216] hover:border-orange-400/30 transition"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-100">{p.name}</p>
                  <p className="text-[11px] text-gray-400">
                    ₹{p.price} • stock {p.stock} •{" "}
                    <span className="capitalize">{p.category}</span>
                  </p>
                </div>
                <button
                  onClick={() => startEdit(p)}
                  className="text-xs px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-orange-400/30 hover:text-orange-300 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="text-xs px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-red-400/40 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;

