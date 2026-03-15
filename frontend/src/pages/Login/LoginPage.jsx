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
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" onChange={handleChange} />
      <input type="password" placeholder="Password" onChange={handleChange} />
      <button>Login</button>
    </form>
  );
};

export default LoginPage;
