import { useDispatch } from "react-redux";
import useFetch from "../../hook/useFetch";
import { loginSuccess } from "../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const loginLogic = () => {

  const { request } = useFetch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loginUser = async (values) => {
    try {

      const data = await request("/auth/login", "POST", values);
      console.log(data)

      if (data?.token) {

        localStorage.setItem("token", data.token);

        dispatch(loginSuccess(data));

        alert("Login Successful");

        const from = location.state?.from;
        if (from) {
          navigate(from, { replace: true });
        } else if (data?.user?.role === "admin") {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
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