import { use } from "react";
import LoginDataContext from "../contexts/login";
import LoginData from "../models/login";

const useLoginData = () => {
  const { loginData, setLoginData } = use(LoginDataContext);

  const addLoginData = (loginData: LoginData) => {
    setLoginData(loginData);
  };

  const removeLoginData = () => {
    setLoginData(null);
  };

  return { loginData, addLoginData, removeLoginData, setLoginData };
};

export default useLoginData;
