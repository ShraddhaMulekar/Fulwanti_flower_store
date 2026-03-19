import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router-dom";

const useRegister = () => {

  const { request } = useFetch();
  const navigate = useNavigate();

  const registerUser = async (values) => {

    try {

      const data = await request("/auth/register", "POST", values);

      if (data?.status) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert(data?.message);
      }

    } catch (error) {
      console.log(error);
    }

  };

  return { registerUser };
};

export default useRegister;