import React from "react";
import useForm from "../../hook/useForm";
import useRegister from "./useRegister";

const registerPage = () => {
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
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name.." onChange={handleChange} />
      <input type="email" placeholder="Email.." onChange={handleChange} />
      <input type="password" placeholder="Password.." onChange={handleChange} />
      <input type="role" placeholder="user/admin" onChange={handleChange} />
      <input type="text" placeholder="Address.." onChange={handleChange} />
    </form>
  );
};

export default registerPage;