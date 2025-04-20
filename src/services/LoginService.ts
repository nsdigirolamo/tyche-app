import { AxiosInstance } from "axios";
import { LoginOutput } from "../models/dtos/login-dto";
import { UserInput } from "../models/dtos/user-dto";
import HttpRepository from "../repositories/HttpRepository";
import LoginData from "../models/entities/LoginData";

const POST_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/user/login`;

export class LoginService {
  httpRepository: HttpRepository;

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async login(input: UserInput): Promise<LoginData> {
    const url = POST_ENDPOINT;
    const { data } = await this.httpRepository.post<LoginOutput>(url, input);
    const loginData = LoginData.fromLoginOutput(data);

    return loginData;
  }
}
