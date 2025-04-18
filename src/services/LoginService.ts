import { AxiosInstance } from "axios";
import { LoginOutput } from "../models/dtos/login";
import { UserInput } from "../models/dtos/user";
import { HttpRepository } from "../repositories/HttpRepository";
import LoginData from "../models/login";

export class LoginService {
  httpRepository: HttpRepository<UserInput, LoginOutput>;
  post_endpoint = "http://localhost:8000/api/user";

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository<UserInput, LoginOutput>(
      axiosInstance
    );
  }

  async login(input: UserInput): Promise<LoginData> {
    const url = `${this.post_endpoint}/login`;
    const { data } = await this.httpRepository.post(url, input);
    const loginData = LoginData.fromLoginOutput(data);

    return loginData;
  }
}
