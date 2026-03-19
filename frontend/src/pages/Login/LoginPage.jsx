import React from "react";
import useForm from "../../hook/useForm";
import loginLogic from "./loginLogic";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate()
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { loginUser } = loginLogic();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(values);
    navigate(to="/products")
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch animate-fade-up">
        {/* Left hero (Home-style) */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d10] p-6 sm:p-8">
          <div className="absolute -top-20 -right-24 w-72 h-72 rounded-full bg-orange-400/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-pink-500/10 blur-3xl" />

          <p className="relative text-[10px] tracking-[0.3em] uppercase text-gray-400">
            Fulwanti flower store
          </p>
          <h1 className="relative mt-4 leading-none">
            <span className="block text-4xl font-light text-gray-200">
              ONLY
            </span>
            <span className="block text-4xl font-light text-gray-200">
              FRESH
            </span>
            <span className="block text-5xl sm:text-6xl font-extrabold text-orange-400 mt-2">
              BLOOMS
            </span>
          </h1>
          <p className="relative mt-4 text-sm text-gray-300 max-w-md">
            Login to add products to cart, place orders, and track delivery.
          </p>

          <div className="relative mt-6 flex flex-wrap gap-3 text-[10px] text-gray-300">
            <span className="px-3 py-1 rounded-full bg-[#111111] border border-white/10">
              Secure checkout
            </span>
            <span className="px-3 py-1 rounded-full bg-[#111111] border border-white/10">
              Order tracking
            </span>
            <span className="px-3 py-1 rounded-full bg-[#111111] border border-white/10">
              Same-day delivery
            </span>
          </div>
        </div>

        {/* Right form */}
        <div className="rounded-3xl border border-white/10 bg-[#0b0d10] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-gray-100">Login</h2>
          <p className="text-xs text-gray-400 mt-1">
            Welcome back. Please enter your details.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-gray-300">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={values.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-gray-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

            <button className="w-full h-11 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5">
              Login
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-orange-300 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
