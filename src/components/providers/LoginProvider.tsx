import { useMemo, useState } from "react";
import LoginData from "../../models/entities/LoginData";
import { LoginContext } from "../../contexts/login-context";
import axios from "axios";

interface LoginProviderProps {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

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

    return { loginData, setLoginData, getAxios };
  }, [loginData]);

  return <LoginContext value={value} children={children} />;
};

export default LoginProvider;
