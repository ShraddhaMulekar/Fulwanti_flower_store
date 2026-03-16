import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/cartSlice";
import useFetch from "../hook/useFetch";

const Cart = () => {
  const dispatch = useDispatch();
  const { request, loading } = useFetch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [creatingOrder, setCreatingOrder] = useState(false);

  const total = cartItems?.reduce(
    (acc, cur) => acc + cur.price * (cur.quantity || 1),
    0,
  );

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value, 10);
    if (Number.isNaN(qty) || qty < 1) return;
    dispatch(updateQuantity({ id, quantity: qty }));
  };

  const handleBuy = async () => {
    if (!cartItems.length || creatingOrder) return;
    setCreatingOrder(true);
    try {
      const body = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
        totalPrice: total,
        paymentStatus: "pending",
        deliveryOption: "same-day",
      };

      const data = await request("/order/create", "POST", body);
      if (data?.status) {
        alert("Order created successfully!");
        dispatch(clearCart());
      } else {
        alert(data?.message || "Failed to create order");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while creating the order");
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-md p-4 sm:p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-extrabold text-gray-800">Your Cart</h2>
        {cartItems.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-500">
          Your cart is empty. Add some fresh flowers to begin!
        </p>
      ) : (
        <>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 border border-pink-50 rounded-xl p-2 sm:p-3 bg-white hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    ₹{item.price} each • {item.category}
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
                    className="w-14 text-sm border border-pink-100 rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-pink-400"
                  />
                  <p className="text-sm font-semibold text-gray-800 w-20 text-right">
                    ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="ml-2 text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-pink-100 pt-3">
            <div>
              <p className="text-xs text-gray-500">
                Delivery option: <span className="font-semibold">Same-day</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-lg font-extrabold text-pink-600">
                Total: ₹{total}
              </p>
              <button
                onClick={handleBuy}
                disabled={creatingOrder || loading}
                className="px-5 py-2 rounded-full bg-pink-500 text-white text-sm font-semibold shadow hover:bg-pink-600 hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {creatingOrder || loading ? "Processing..." : "Buy Now"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
