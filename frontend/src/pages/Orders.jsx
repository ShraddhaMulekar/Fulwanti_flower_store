import React, { useEffect, useState } from "react";
import { API_URL } from "../api/api";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/order/check`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        const data = await res.json();
        if (data?.status) {
          setOrders(data.order || []);
        } else {
          setError(data?.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-sm text-orange-300 animate-pulse">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-[#0b0d10] rounded-2xl border border-white/10 p-6 text-center">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            only fresh blooms
          </p>
          <h1 className="text-2xl font-extrabold text-gray-100">My Orders</h1>
          <p className="text-xs text-gray-400">
            View your bought products, total price, payment status and delivery
            option.
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs px-3 py-2 rounded-xl bg-[#111111] border border-white/10 text-gray-200 hover:border-orange-400/30 hover:text-orange-300 transition"
        >
          Shop more
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0b0d10] p-6">
          <p className="text-sm text-gray-300">
            You haven&apos;t placed any orders yet.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 px-5 py-2 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="rounded-2xl border border-white/10 bg-[#0b0d10] p-4 sm:p-5 hover:border-orange-400/30 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-100">
                  Order ID:{" "}
                  <span className="font-mono text-xs text-gray-400">
                    {order._id}
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                {order.products?.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-2 text-xs border border-white/10 bg-[#111111] rounded-full px-3 py-1"
                  >
                    <span className="font-semibold text-gray-100">
                      {p.productId?.name}
                    </span>
                    <span className="text-gray-400">
                      × {p.quantity} (₹{p.productId?.price})
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <p className="font-semibold text-orange-300">
                  Total: ₹{order.totalPrice}
                </p>
                <p>
                  <span className="text-gray-400">Payment:</span>{" "}
                  <span
                    className={
                      order.paymentStatus === "paid"
                        ? "text-emerald-400 font-semibold"
                        : "text-orange-300 font-semibold"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Delivery:</span>{" "}
                  <span className="capitalize font-semibold text-gray-200">
                    {order.deliveryOption}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

