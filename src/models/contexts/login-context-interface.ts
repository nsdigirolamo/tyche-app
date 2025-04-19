import { AxiosInstance } from "axios";
import LoginData from "../entities/LoginData";

interface ILoginContext {
  loginData: LoginData | null;
  setLoginData: (loginData: LoginData) => void;
  getAxios: () => AxiosInstance;
}

export default ILoginContext;
