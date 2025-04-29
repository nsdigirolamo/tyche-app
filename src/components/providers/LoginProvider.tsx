import { useMemo, useState } from "react";
import LoginData from "../../models/entities/LoginData";
import { LoginContext } from "../../contexts/login-context";
import axios from "axios";

const LOGIN_DATA_LOCALSTORAGE_KEY = "login-data";

interface LoginProviderProps {
  children: React.ReactNode;
}

const fromLocalStorage: () => LoginData | null = () => {
  const loginDataJson = localStorage.getItem(LOGIN_DATA_LOCALSTORAGE_KEY);
  const loginData = JSON.parse(loginDataJson ?? "null") as LoginData | null;
  return loginData;
};

const toLocalStorage = (loginData: LoginData | null) => {
  const loginDataJson = JSON.stringify(loginData);
  localStorage.setItem(LOGIN_DATA_LOCALSTORAGE_KEY, loginDataJson);
};

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [loginData, setLoginData] = useState<LoginData | null>(
    fromLocalStorage()
  );

  const handleChange = (loginData: LoginData | null) => {
    toLocalStorage(loginData);
    setLoginData(loginData);
  };

  const value = useMemo(() => {
    const getAxios = () => {
      const instance = axios.create();
      instance.interceptors.request.use(config => {
        config.headers.set(
          "Authorization",
          `Bearer ${loginData ? loginData.token : ""}`
        );
        return config;
      });

      return instance;
    };

    return { loginData, setLoginData: handleChange, getAxios };
  }, [loginData]);

  return <LoginContext value={value} children={children} />;
};

export default LoginProvider;
