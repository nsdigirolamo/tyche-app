import { createContext } from "react";
import LoginData from "../models/login";

interface ILoginDataContext {
  loginData: LoginData | null;
  setLoginData: (loginData: LoginData | null) => void;
}

const LoginDataContext = createContext<ILoginDataContext>({
  loginData: null,
  setLoginData: () => {
    return;
  },
});

export default LoginDataContext;
