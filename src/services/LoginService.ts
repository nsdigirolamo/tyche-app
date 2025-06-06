import { AxiosInstance } from "axios";
import { LoginOutput } from "../models/dtos/login-dto";
import HttpRepository from "../repositories/HttpRepository";
import LoginData from "../models/entities/LoginData";
import { UserInput } from "../models/dtos/user-dto";

const POST_ENDPOINT = import.meta.env.VITE_API_ORIGIN;

export class LoginService {
  httpRepository: HttpRepository;

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async login(username: string, password: string): Promise<LoginData> {
    const input: UserInput = { name: username, password };
    const url = `${POST_ENDPOINT}/login`;
    const { data } = await this.httpRepository.post<LoginOutput>(url, input);
    const loginData = LoginData.fromLoginOutput(data);

    return loginData;
  }

  async logout(): Promise<void> {
    const url = `${POST_ENDPOINT}/logout`;
    await this.httpRepository.post(url);
  }
}
