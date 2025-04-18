import useLoginData from "./useLoginData";
import LoginData from "../models/login";

const useLogin = () => {
  const { loginData, addLoginData, removeLoginData, setLoginData } =
    useLoginData();

  const login = (loginData: LoginData) => {
    addLoginData(loginData);
  };

  const logout = () => {
    removeLoginData();
  };

  return { loginData, login, logout, setLoginData };
};

export default useLogin;
