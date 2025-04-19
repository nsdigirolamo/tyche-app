import axios from "axios";
import { useLoginContext } from "../contexts/login-context";

axios.interceptors.request.use(function (config) {
  const { loginData } = useLoginContext();

  if (loginData?.token) {
    config.headers.set("Authorization", `Bearer ${loginData.token}`);
  }

  return config;
});
