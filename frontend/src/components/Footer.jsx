import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t border-orange-400/10 bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm animate-fade-up">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🌸</span>
            <h3 className="font-extrabold text-lg text-orange-300">
              Fulwanti Flower Store
            </h3>
          </div>
          <p className="mt-3 text-gray-300">
            Hand-picked blooms, curated with love. Only fresh flowers — delivered
            with care.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-gray-300">
            <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-orange-400/10 hover:border-orange-400/30 transition-colors">
              Same-day delivery
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-orange-400/10 hover:border-orange-400/30 transition-colors">
              AI bouquet help
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0f0f0f] border border-orange-400/10 hover:border-orange-400/30 transition-colors">
              Secure orders
            </span>
          </div>
        </div>

        <div>
          <h4 className="font-extrabold mb-3 text-gray-100 tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link
                to="/"
                className="hover:text-orange-300 transition-colors inline-flex items-center gap-2"
              >
                <span className="opacity-60">→</span> Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-orange-300 transition-colors inline-flex items-center gap-2"
              >
                <span className="opacity-60">→</span> Products
              </Link>
            </li>
            <li>
              <Link
                to="/ai-chat"
                className="hover:text-orange-300 transition-colors inline-flex items-center gap-2"
              >
                <span className="opacity-60">→</span> AI Chat
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-orange-300 transition-colors inline-flex items-center gap-2"
              >
                <span className="opacity-60">→</span> Cart
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="hover:text-orange-300 transition-colors inline-flex items-center gap-2"
              >
                <span className="opacity-60">→</span> Orders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold mb-3 text-gray-100 tracking-wide">
            Need Help?
          </h4>
          <div className="rounded-2xl border border-orange-400/10 bg-[#070709] p-4 hover:border-orange-400/30 transition-colors">
            <p className="text-gray-300">
              Ask doubts anytime via{" "}
              <Link to="/ai-chat" className="text-orange-300 hover:underline">
                AI chat
              </Link>
              .
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Support:{" "}
              <span className="font-mono text-gray-300">
                support@fulwantiflowers.com
              </span>
            </p>
            <div className="mt-3 flex gap-2 items-center">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[11px] text-gray-400">
                Online support (9 AM – 9 PM)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-400/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {year} Fulwanti Flower Store. All rights reserved.</p>
          <p className="text-gray-500">Made with care • Only fresh blooms</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

