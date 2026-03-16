import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 bg-[#050608]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4 gap-4 text-sm">
        {/* Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="text-2xl">🌸</span>
          <div className="leading-tight">
            <p className="font-extrabold text-orange-300 tracking-tight text-lg">
              Fulwanti Flowers
            </p>
            <p className="text-[10px] text-gray-300">
              Only fresh blooms, every time
            </p>
          </div>
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md items-center bg-[#111111] rounded-full px-3 py-1 shadow-inner border border-white/10"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search flowers, bouquets..."
            className="flex-1 bg-transparent outline-none text-xs text-gray-200 placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="ml-2 px-3 py-1 rounded-full bg-orange-400 text-black text-xs font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
          >
            Search
          </button>
        </form>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs font-medium">
          <Link
            to="/"
            className="text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            Cart / Order
            {cartItems.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-[10px] w-5 h-5 rounded-full bg-orange-400 text-black animate-bounce">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/ai-chat"
            className="text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            AI Chat
          </Link>

          {!token && (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-full border border-gray-600 text-gray-100 hover:bg-gray-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-full bg-orange-400 text-black hover:bg-orange-300 transition"
              >
                Register
              </Link>
            </>
          )}

          {token && (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-400 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full border border-gray-600 text-gray-100 hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;