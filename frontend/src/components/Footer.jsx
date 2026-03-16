import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-bold text-lg mb-2">Fulwanti Flower Store</h3>
          <p className="text-pink-100">
            Hand-picked blooms, curated with love. Delivering smiles across the
            city.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-pink-100">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/ai-chat" className="hover:text-white transition">
                AI Flower Assistant
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-white transition">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Need Help?</h4>
          <p className="text-pink-100">
            Ask doubts anytime through our{" "}
            <Link to="/ai-chat" className="underline">
              AI chat
            </Link>{" "}
            or reach us at{" "}
            <span className="font-mono">support@fulwantiflowers.com</span>.
          </p>
        </div>
      </div>

      <div className="border-t border-white/20">
        <p className="text-center py-3 text-xs text-pink-100">
          © {year} Fulwanti Flower Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

