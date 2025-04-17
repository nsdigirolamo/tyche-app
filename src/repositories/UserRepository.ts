import { AxiosInstance } from "axios";
import { UserInput, UserOutput } from "../models/dtos/user";
import { User } from "../models/entities/user";
import { HttpRepository } from "./HttpRepository";

export class UserRepository {
  httpRepository: HttpRepository<UserInput, UserOutput>;
  post_endpoint = "http://localhost:8000/api/user";
  get_endpoint = "http://localhost:8000/api/users";

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository<UserInput, UserOutput>(
      axiosInstance
    );
  }

  async create_one(input: UserInput): Promise<User> {
    const url = `${this.post_endpoint}/register`;
    const { data } = await this.httpRepository.post(url, input);
    const user = User.fromUserOutput(data);

    return user;
  }

  async find_one_by_id(user_id: string): Promise<User> {
    const url = `${this.get_endpoint}/${user_id}`;
    const { data } = await this.httpRepository.get(url);
    const user = User.fromUserOutput(data);

    return user;
  }

  async find_one_by_name(user_name: string): Promise<User> {
    const url = `${this.get_endpoint}/${user_name}`;
    const { data } = await this.httpRepository.get(url);
    const user = User.fromUserOutput(data);

    return user;
  }
}
