import { AxiosInstance } from "axios";
import { UserInput, UserOutput } from "../models/dtos/user-dto";
import HttpRepository from "./HttpRepository";

const POST_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/user`;
const GET_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/users`;

class UserRepository {
  httpRepository: HttpRepository;

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async createOne(input: UserInput): Promise<UserOutput> {
    const url = `${POST_ENDPOINT}/register`;
    const { data } = await this.httpRepository.post<UserOutput>(url, input);

    return data;
  }

  async findOneById(id: string): Promise<UserOutput> {
    const url = `${GET_ENDPOINT}/${id}`;
    const { data } = await this.httpRepository.get<UserOutput>(url);

    return data;
  }

  async findOneByName(name: string): Promise<UserOutput> {
    const url = `${GET_ENDPOINT}/${name}`;
    const { data } = await this.httpRepository.get<UserOutput>(url);

    return data;
  }
}

export default UserRepository;
