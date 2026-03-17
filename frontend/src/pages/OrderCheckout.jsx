import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import useFetch from "../hook/useFetch";
import { clearCart } from "../redux/cartSlice";

const OrderCheckout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request, loading } = useFetch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [deliveryOption, setDeliveryOption] = useState("same-day");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [placing, setPlacing] = useState(false);

  const total = useMemo(
    () =>
      cartItems.reduce(
        (acc, cur) => acc + (Number(cur.price) || 0) * (cur.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const placeOrder = async () => {
    if (!cartItems.length || placing) return;
    setPlacing(true);
    try {
      const body = {
        products: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity || 1,
        })),
        totalPrice: total,
        paymentStatus,
        deliveryOption,
      };

      const data = await request("/order/create", "POST", body);
      if (data?.status) {
        dispatch(clearCart());
        navigate("/orders", { replace: true });
      } else {
        alert(data?.message || "Failed to place order");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong while placing the order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            only fresh blooms
          </p>
          <h1 className="text-2xl font-extrabold text-gray-100">Order</h1>
          <p className="text-xs text-gray-400">
            Products you buy, total price, payment status & delivery option.
          </p>
        </div>
        <button
          onClick={() => navigate("/cart")}
          className="text-xs px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-orange-400/30 hover:text-orange-300 transition"
        >
          Back to Cart
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0b0d10] p-6">
          <p className="text-sm text-gray-300">
            No items to checkout. Please add products first.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 px-5 py-2 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,420px] gap-6">
          {/* Left: items */}
          <section className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6">
            <p className="text-sm font-extrabold text-gray-100 mb-4">
              Items
            </p>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0f1216] p-3"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#111111] border border-white/10">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-100 truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      ₹{item.price} • qty {item.quantity || 1}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-orange-300">
                    ₹{(Number(item.price) || 0) * (item.quantity || 1)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Right: options + place order */}
          <aside className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-6 h-fit sticky top-24">
            <p className="text-sm font-extrabold text-gray-100 mb-4">
              Checkout
            </p>

            <div className="rounded-xl border border-white/10 bg-[#111111] p-3">
              <p className="text-[11px] font-semibold text-gray-300 mb-2">
                Delivery option
              </p>
              <div className="space-y-2 text-xs text-gray-300">
                {[
                  { id: "same-day", label: "Same-day delivery" },
                  { id: "next-day", label: "Next-day delivery" },
                  { id: "pickup", label: "Pickup" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === opt.id}
                      onChange={() => setDeliveryOption(opt.id)}
                      className="accent-orange-400"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-[#111111] p-3">
              <p className="text-[11px] font-semibold text-gray-300 mb-2">
                Payment status
              </p>
              <div className="space-y-2 text-xs text-gray-300">
                {[
                  { id: "pending", label: "Pending" },
                  { id: "paid", label: "Paid" },
                ].map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentStatus === opt.id}
                      onChange={() => setPaymentStatus(opt.id)}
                      className="accent-orange-400"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <span className="text-2xl font-extrabold text-orange-300">
                ₹{total}
              </span>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing || loading}
              className="mt-5 w-full h-11 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {placing || loading ? "Placing order..." : "Place Order"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
};

export default OrderCheckout;

