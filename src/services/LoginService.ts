import { AxiosInstance } from "axios";
import { LoginOutput } from "../models/dtos/login-dto";
import { UserInput } from "../models/dtos/user-dto";
import { HttpRepository } from "../repositories/HttpRepository";
import LoginData from "../models/entities/LoginData";

export class LoginService {
  httpRepository: HttpRepository;
  postEndpoint = "http://localhost:8000/api/user";

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async login(input: UserInput): Promise<LoginData> {
    const url = `${this.postEndpoint}/login`;
    const { data } = await this.httpRepository.post<LoginOutput>(url, input);
    const loginData = LoginData.fromLoginOutput(data);

    return loginData;
  }
}
