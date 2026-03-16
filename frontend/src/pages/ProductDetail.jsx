import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (loading) {
    return (
      <div className="text-center text-sm text-pink-500 animate-pulse">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto bg-white/80 rounded-2xl shadow-md p-6 text-center">
        <p className="text-sm text-red-500">{error || "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-3xl shadow-md p-4 sm:p-6 lg:p-8 grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-6 animate-fade-up">
      <div className="overflow-hidden rounded-2xl bg-pink-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        <p className="text-sm text-gray-500">
          Category:{" "}
          <span className="font-semibold capitalize text-pink-600">
            {product.category}
          </span>
        </p>
        <p className="text-sm text-gray-600">{product.description}</p>

        <p className="text-sm">
          Stock:{" "}
          <span
            className={`font-semibold ${
              product.stock > 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </span>
        </p>

        <p className="text-3xl font-extrabold text-pink-600">
          ₹{product.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="mt-3 inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-pink-500 text-white text-sm font-semibold shadow hover:bg-pink-600 hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

