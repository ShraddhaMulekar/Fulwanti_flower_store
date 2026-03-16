import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const openDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div
      onClick={openDetails}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-pink-50 overflow-hidden cursor-pointer transform transition-all hover:-translate-y-1"
    >
      <div className="overflow-hidden bg-pink-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="font-semibold text-gray-800 truncate">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-[11px] uppercase tracking-wide text-pink-500">
            {product.category}
          </p>
        )}
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-extrabold text-pink-600">
            ₹{product.price}
          </p>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1.5 rounded-full bg-pink-500 text-white text-xs font-semibold shadow hover:bg-pink-600 hover:shadow-md transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
