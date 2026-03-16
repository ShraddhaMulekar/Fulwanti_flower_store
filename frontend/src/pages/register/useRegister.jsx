import useFetch from "../../hook/useFetch";

const useRegister = () => {

  const { request } = useFetch();

  const registerUser = async (values) => {

    try {

      const data = await request("/auth/register", "POST", values);

      if (data?.status) {
        alert("Registration Successful");
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