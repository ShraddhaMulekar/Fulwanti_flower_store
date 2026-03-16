import React from "react";
import useForm from "../../hook/useForm";
import useRegister from "./useRegister";

const RegisterPage = () => {

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
  };

  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Register
        </h2>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="role"
          type="text"
          placeholder="Role (user/admin)"
          value={values.role}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="address"
          type="text"
          placeholder="Address"
          value={values.address}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>

      </form>

    </div>

  );
};

export default RegisterPage;