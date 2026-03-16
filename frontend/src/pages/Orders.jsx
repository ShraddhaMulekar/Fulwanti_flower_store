import React, { useEffect, useState } from "react";
import { API_URL } from "../api/api";

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
      <div className="text-center text-sm text-pink-500 animate-pulse">
        Loading your orders...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto bg-white/80 rounded-2xl shadow-md p-6 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-md p-4 sm:p-6 animate-fade-up">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
        Your Orders
      </h1>
      <p className="text-xs text-gray-500 mb-4">
        View products you have bought, total price, payment status and delivery
        options.
      </p>

      {orders.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven&apos;t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-pink-50 rounded-xl p-3 bg-white hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-800">
                  Order ID:{" "}
                  <span className="font-mono text-xs text-gray-600">
                    {order._id}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-2">
                {order.products?.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center gap-2 text-xs border border-pink-100 rounded-full px-2 py-1"
                  >
                    <span className="font-semibold text-gray-800">
                      {p.productId?.name}
                    </span>
                    <span className="text-gray-500">
                      × {p.quantity} (₹{p.productId?.price})
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <p className="font-semibold text-pink-600">
                  Total: ₹{order.totalPrice}
                </p>
                <p>
                  Payment:{" "}
                  <span
                    className={
                      order.paymentStatus === "paid"
                        ? "text-emerald-600 font-semibold"
                        : "text-orange-500 font-semibold"
                    }
                  >
                    {order.paymentStatus}
                  </span>
                </p>
                <p>
                  Delivery:{" "}
                  <span className="capitalize font-semibold text-gray-700">
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

