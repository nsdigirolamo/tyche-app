import { createContext, use } from "react";
import ILoginContext from "../models/contexts/login-context-interface";
import axios from "axios";

export const LoginContext = createContext<ILoginContext>({
  axios: axios.create(),
  loginData: null,
  setLoginData: () => {
    return;
  },
});

export const useLoginContext = () => use(LoginContext);
