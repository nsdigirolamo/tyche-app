import { createContext, use } from "react";
import ILoginContext from "../models/contexts/login-context-interface";
import axios from "axios";

export const LoginContext = createContext<ILoginContext>({
  loginData: null,
  setLoginData: () => {
    return;
  },
  getAxios: () => axios.create(),
});

export const useLoginContext = () => use(LoginContext);
