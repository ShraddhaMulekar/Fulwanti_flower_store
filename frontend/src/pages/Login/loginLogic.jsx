import { useDispatch } from "react-redux";
import useFetch from "../../hook/useFetch";
import { loginSuccess } from "../../redux/authSlice";

const loginLogic = () => {

  const { request } = useFetch();
  const dispatch = useDispatch();

  const loginUser = async (values) => {
    try {

      const data = await request("/auth/login", "POST", values);

      if (data?.token) {

        localStorage.setItem("token", data.token);

        dispatch(loginSuccess(data));

        alert("Login Successful");
      } else {
        alert(data?.message || "Login failed");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return { loginUser };
};

export default loginLogic;