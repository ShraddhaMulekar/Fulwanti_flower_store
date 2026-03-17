import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!token) {
      navigate("/login", { state: { from: "/products" } });
      return;
    }
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const openDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={openDetails}
      className="group rounded-2xl border border-white/10 bg-[#0f1216] overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.45)] animate-fade-in"
    >
      <div className="relative overflow-hidden bg-[#111111]">
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-50 m-auto object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-90" />
      </div>

      <div className="p-4 space-y-1.5">
        <h3 className="font-semibold text-gray-100 truncate">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400">
            {product.category}
          </p>
        )}
        <p className="text-xs text-gray-400 leading-relaxed">
          {(product.description || "").slice(0, 90)}
          {(product.description || "").length > 90 ? "..." : ""}
        </p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-extrabold text-orange-300">
            ₹{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="px-3.5 py-1.5 rounded-full bg-orange-400 text-black text-xs font-semibold shadow hover:bg-orange-300 transition-transform transform group-hover:-translate-y-0.5"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
