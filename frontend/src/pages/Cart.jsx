import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const total = cartItems?.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0,
  );

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value, 10);
    if (Number.isNaN(qty) || qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleBuy = () => {
    if (!cartItems.length) return;
    navigate("/order");
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            only fresh blooms
          </p>
          <h2 className="text-2xl font-extrabold text-gray-100">
            Add-to-Cart
          </h2>
          <p className="text-xs text-gray-400">
            Review your items, update quantity, and place an order.
          </p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-red-400/40 hover:text-red-300 transition"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0b0d10] p-6">
          <p className="text-sm text-gray-300">
            Your cart is empty. Add some fresh flowers to begin!
          </p>
          <a
            href="/products"
            className="inline-block mt-4 px-5 py-2 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
          >
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,420px] gap-6">
          {/* Left: items */}
          <section className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-extrabold text-gray-100">
                Cart Items
              </p>
              <p className="text-xs text-gray-400">
                {cartItems.length} item(s)
              </p>
            </div>

            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f1216] p-3 hover:border-orange-400/30 transition"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#111111] border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-100 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      ₹{item.price} each •{" "}
                      <span className="capitalize">{item.category}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity || 1}
                      onChange={(e) =>
                        handleQuantityChange(item._id, e.target.value)
                      }
                      className="w-16 h-9 rounded-xl bg-[#111111] border border-white/10 text-gray-100 text-center text-sm outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <p className="text-sm font-semibold text-orange-300 w-24 text-right">
                      ₹{item.price * (item.quantity || 1)}
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="ml-1 text-[11px] px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-red-400/40 hover:text-red-300 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Right: summary */}
          <aside className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6 h-fit sticky top-24">
            <p className="text-sm font-extrabold text-gray-100 mb-4">
              Order Summary
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Delivery</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>Payment</span>
                <span className="text-orange-300">Pending</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <span className="text-2xl font-extrabold text-orange-300">
                ₹{total}
              </span>
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#111111] p-3">
              <p className="text-[11px] text-gray-300 font-semibold">
                Delivery option
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                Same-day delivery (selected by default)
              </p>
            </div>

            <button
              onClick={handleBuy}
              className="mt-5 w-full h-11 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
            >
              Buy Now
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
