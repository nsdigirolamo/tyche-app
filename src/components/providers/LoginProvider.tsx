import { useMemo, useRef, useState } from "react";
import LoginData from "../../models/entities/LoginData";
import { LoginContext } from "../../contexts/login-context";
import staticAxios, { AxiosInstance } from "axios";
import ILoginContext from "../../models/contexts/login-context-interface";

const LOGIN_DATA_LOCALSTORAGE_KEY = "login-data";

interface LoginProviderProps {
  children: React.ReactNode;
}

function fromLocalStorage(): LoginData | null {
  const loginDataJson = localStorage.getItem(LOGIN_DATA_LOCALSTORAGE_KEY);
  const loginData = JSON.parse(loginDataJson ?? "null") as LoginData | null;
  return loginData;
}

function toLocalStorage(loginData: LoginData | null) {
  const loginDataJson = JSON.stringify(loginData);
  localStorage.setItem(LOGIN_DATA_LOCALSTORAGE_KEY, loginDataJson);
}

function createAxios(loginData: LoginData | null): AxiosInstance {
  const axios = staticAxios.create();
  axios.interceptors.request.use(config => {
    if (loginData) {
      config.headers.Authorization = `Bearer ${loginData.token}`;
    }

    return config;
  });

  return axios;
}

const LoginProvider = ({ children }: LoginProviderProps) => {
  const [loginData, setLoginData] = useState<LoginData | null>(
    fromLocalStorage()
  );
  const axios = useRef<AxiosInstance>(createAxios(loginData));

  const handleLoginDataChange = (newLoginData: LoginData | null) => {
    toLocalStorage(newLoginData);
    setLoginData(newLoginData);
    axios.current = createAxios(newLoginData);
  };

  const loginContext: ILoginContext = useMemo(() => {
    return {
      axios: axios.current,
      loginData: loginData,
      setLoginData: handleLoginDataChange,
    };
  }, [axios, loginData]);

  return <LoginContext value={loginContext} children={children} />;
};

export default LoginProvider;
