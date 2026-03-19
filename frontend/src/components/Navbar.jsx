import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import bg from "../assets/navbarFooterBg.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [searchTerm, setSearchTerm] = useState("");
  const isLoggedIn = Boolean(token && (user?._id || user?.email));

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-20 border-b border-orange-400/10 animate-fade-in"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lighter overlay so background image is visible */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/55 to-black/70 backdrop-blur-[1px]" />
      <div className="relative max-w-6xl mx-auto flex items-center justify-between px-4 py-4 gap-4 text-sm">
        {/* Brand */}
        <div
          className="flex items-center gap-1.5 w-[20%] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="logo.png" alt="logo" className="w-[20%]" />
          <div className="leading-tight">
            <p className="font-extrabold text-orange-300 tracking-tight text-lg drop-shadow">
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
          className="flex flex-1 max-w-md items-center bg-[#0f0f0f] rounded-full px-3 py-1 shadow-inner border border-orange-400/10 hover:border-orange-400/30 transition-colors"
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
            className="ml-2 px-3 py-1 rounded-full bg-orange-400 text-black text-xs font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5 active:translate-y-0"
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
            Cart
            {cartItems.length > 0 && (
              <span className="ml-1 inline-flex items-center justify-center text-[10px] w-5 h-5 rounded-full bg-orange-400 text-black animate-pulse">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            className="text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            Orders
          </Link>
          <Link
            to="/ai-chat"
            className="text-gray-200 hover:text-orange-300 transition-colors tracking-wide"
          >
            AI Chat
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="px-3 py-1 rounded-full border border-orange-400/20 text-gray-100 hover:border-orange-400/40 hover:text-orange-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded-full bg-orange-400 text-black hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="px-3 py-1 rounded-full bg-orange-400 text-black hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full border border-orange-400/20 text-gray-100 hover:border-orange-400/40 hover:text-orange-300 transition-colors"
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
