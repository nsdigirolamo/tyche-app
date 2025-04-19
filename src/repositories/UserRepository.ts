import { AxiosInstance } from "axios";
import { UserInput, UserOutput } from "../models/dtos/user-dto";
import { HttpRepository } from "./HttpRepository";

export class UserRepository {
  httpRepository: HttpRepository;
  postEndpoint = "http://localhost:8000/api/user";
  getEndpoint = "http://localhost:8000/api/users";

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async createOne(input: UserInput): Promise<UserOutput> {
    const url = `${this.postEndpoint}/register`;
    const { data } = await this.httpRepository.post<UserOutput>(url, input);

    return data;
  }

  async findOneById(id: string): Promise<UserOutput> {
    const url = `${this.getEndpoint}/${id}`;
    const { data } = await this.httpRepository.get<UserOutput>(url);

    return data;
  }

  async findOneByName(name: string): Promise<UserOutput> {
    const url = `${this.getEndpoint}/${name}`;
    const { data } = await this.httpRepository.get<UserOutput>(url);

    return data;
  }
}
