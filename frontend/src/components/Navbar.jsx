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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isLoggedIn = Boolean(token && (user?._id || user?.email));

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-orange-400/10 animate-fade-in"
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
          className="flex items-center gap-1.5 w-[15%] min-w-30 md:min-w-[11%] cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="logo.png" alt="logo" className="w-10 md:w-[15%]" />
          <div className="leading-tight hidden sm:block">
            <p className="font-extrabold text-orange-300 tracking-tight text-sm md:text-lg drop-shadow line-clamp-1">
              Fulwanti Flowers
            </p>
            <p className="text-[8px] md:text-[10px] text-gray-300 truncate">
              Only fresh blooms, every time
            </p>
          </div>
        </div>

        {/* Search - Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md items-center bg-[#0f0f0f] rounded-full px-3 py-1 shadow-inner border border-orange-400/10 hover:border-orange-400/30 transition-colors"
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

        {/* Hamburger Menu Toggle - Mobile */}
        <button
          className="md:hidden text-gray-200 hover:text-orange-300 p-2 z-50"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMobileMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Links - Desktop */}
        <div className="hidden md:flex items-center gap-4 text-xs font-medium">
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
                  Admin
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

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#070709] border-b border-orange-400/10 shadow-xl px-4 py-6 flex flex-col gap-4 z-40">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#0f0f0f] rounded-full px-3 py-1 mb-2 shadow-inner border border-orange-400/10"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search flowers..."
              className="flex-1 bg-transparent outline-none text-xs text-gray-200 py-1"
            />
            <button
              type="submit"
              className="ml-2 px-3 py-1 rounded-full bg-orange-400 text-black text-xs font-semibold"
            >
              Search
            </button>
          </form>

          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-orange-300 border-b border-orange-400/10 pb-2"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-orange-300 border-b border-orange-400/10 pb-2"
          >
            Products
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-between text-gray-200 hover:text-orange-300 border-b border-orange-400/10 pb-2"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="inline-flex items-center justify-center text-[10px] w-5 h-5 rounded-full bg-orange-400 text-black">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            to="/orders"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-orange-300 border-b border-orange-400/10 pb-2"
          >
            Orders
          </Link>
          <Link
            to="/ai-chat"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-orange-300 border-b border-orange-400/10 pb-2"
          >
            AI Chat
          </Link>

          <div className="flex gap-3 mt-2">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 rounded-lg border border-orange-400/20 text-gray-100"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-3 py-2 rounded-lg bg-orange-400 text-black font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center px-3 py-2 rounded-lg bg-blue-600 text-white font-semibold shrink-0"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex-1 text-center px-3 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
