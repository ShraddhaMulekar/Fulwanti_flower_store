import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/product/check_product/${id}`);
        const data = await res.json();
        if (data?.status) {
          setProduct(data.product);
        } else {
          setError(data?.message || "Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const galleryImages = useMemo(() => {
    if (!product?.image) return [];
    // Backend currently provides a single image URL; for gallery UI we repeat it.
    return [product.image, product.image, product.image, product.image];
  }, [product?.image]);

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const count = Math.max(1, Number(qty) || 1);
    for (let i = 0; i < count; i += 1) dispatch(addToCart(product));
    alert("Added to cart!");
  };

  if (loading) {
    return (
      <div className="text-center text-sm text-orange-300 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto bg-[#0b0d10] rounded-2xl border border-white/10 p-6 text-center">
        <p className="text-sm text-red-400">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-xs text-gray-300 hover:text-orange-300 transition"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[90px,1.2fr,1fr] gap-6">
        {/* Left: thumbnails */}
        <aside className="hidden lg:flex flex-col gap-3">
          {galleryImages.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              onClick={() => setActiveImageIndex(idx)}
              className={`rounded-xl overflow-hidden border transition ${
                idx === activeImageIndex
                  ? "border-orange-400"
                  : "border-white/10 hover:border-orange-400/40"
              } bg-[#0b0d10]`}
            >
              <img
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-full h-16 object-cover object-center"
              />
            </button>
          ))}
        </aside>

        {/* Center: main image */}
        <section className="bg-[#0b0d10] border border-white/10 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/10 via-transparent to-pink-500/10" />
          <img
            src={galleryImages[activeImageIndex] || product.image}
            alt={product.name}
            className="relative w-full h-[360px] sm:h-[460px] object-contain bg-[#0f1216]"
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={() =>
                setActiveImageIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length)
              }
              className="w-9 h-9 rounded-full bg-black/60 border border-white/10 text-gray-200 hover:text-orange-300 hover:border-orange-400/40 transition"
            >
              ‹
            </button>
            <button
              onClick={() =>
                setActiveImageIndex((p) => (p + 1) % galleryImages.length)
              }
              className="w-9 h-9 rounded-full bg-black/60 border border-white/10 text-gray-200 hover:text-orange-300 hover:border-orange-400/40 transition"
            >
              ›
            </button>
          </div>
        </section>

        {/* Right: details */}
        <section className="bg-[#0b0d10] border border-white/10 rounded-2xl p-5 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-100">
            {product.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-gray-300 capitalize">
              {product.category || "flower"}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#111111] border border-white/10 text-gray-300">
              Stock:{" "}
              <span
                className={
                  product.stock > 0 ? "text-emerald-400" : "text-red-400"
                }
              >
                {product.stock > 0 ? `${product.stock} left` : "out of stock"}
              </span>
            </span>
          </div>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            {product.description || "Fresh blooms crafted for every moment."}
          </p>

          <div className="mt-5 flex items-end gap-3">
            <p className="text-3xl font-extrabold text-orange-300">
              ₹{product.price}
            </p>
            <p className="text-xs text-gray-500">
              (inclusive of packaging)
            </p>
          </div>

          <div className="mt-5">
            <p className="text-[11px] font-semibold text-gray-300 mb-2">
              Quantity
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-orange-400/40 hover:text-orange-300 transition"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-20 h-9 rounded-xl bg-[#111111] border border-white/10 text-gray-100 text-center text-sm outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-9 h-9 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-orange-400/40 hover:text-orange-300 transition"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="mt-6 w-full h-11 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>

          <div className="mt-4 rounded-xl border border-white/10 bg-[#111111] p-3">
            <p className="text-[11px] text-gray-300 font-semibold mb-1">
              About the product
            </p>
            <ul className="text-[11px] text-gray-400 space-y-1">
              <li>
                - Category:{" "}
                <span className="capitalize">{product.category || "flower"}</span>
              </li>
              <li>- Delivery: same-day available (selected at checkout)</li>
              <li>- Care: keep in cool water, avoid direct sunlight</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;

