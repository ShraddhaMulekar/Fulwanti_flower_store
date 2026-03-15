import React from "react";
import useFetch from "../../hook/useFetch";

const useRegister = () => {
  const { request } = useFetch();
  const registerUser = async (values) => {
    await request("/auth/register", "POST", values);
  };
  return { registerUser };
};

export default useRegister;
