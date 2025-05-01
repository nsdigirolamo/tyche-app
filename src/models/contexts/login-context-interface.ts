import { AxiosInstance } from "axios";
import LoginData from "../entities/LoginData";

interface ILoginContext {
  axios: AxiosInstance;
  loginData: LoginData | null;
  setLoginData: (loginData: LoginData | null) => void;
}

export default ILoginContext;
