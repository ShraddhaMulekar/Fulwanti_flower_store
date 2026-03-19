import React from "react";
import useForm from "../../hook/useForm";
import useRegister from "./useRegister";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate()
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
  });

  const { registerUser } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(values);
    navigate(to="/login")
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
            <span className="block text-4xl font-light text-gray-200">JOIN</span>
            <span className="block text-4xl font-light text-gray-200">
              THE
            </span>
            <span className="block text-5xl sm:text-6xl font-extrabold text-orange-400 mt-2">
              BLOOMS
            </span>
          </h1>
          <p className="relative mt-4 text-sm text-gray-300 max-w-md">
            Create an account to save your address, manage cart, and track your
            orders.
          </p>
        </div>

        {/* Right form */}
        <div className="rounded-3xl border border-white/10 bg-[#0b0d10] p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-gray-100">Register</h2>
          <p className="text-xs text-gray-400 mt-1">
            Fill the details to create your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-gray-300">
                Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={values.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-300">
                  Role
                </label>
                <input
                  name="role"
                  type="text"
                  placeholder="user / admin"
                  value={values.role}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-gray-300">
                  Address
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="Delivery address"
                  value={values.address}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#111111] px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-orange-400 transition"
                />
              </div>
            </div>

            <button className="w-full h-11 rounded-xl bg-orange-400 text-black text-sm font-semibold hover:bg-orange-300 transition-transform transform hover:-translate-y-0.5">
              Register
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-300 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;