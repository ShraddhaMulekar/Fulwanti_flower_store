import React from "react";
import useForm from "../../hook/useForm";
import loginLogic from "./loginLogic";

const LoginPage = () => {

  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const { loginUser } = loginLogic();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(values);
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
          Login
        </h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          Login
        </button>

      </form>

    </div>

  );
};

export default LoginPage;