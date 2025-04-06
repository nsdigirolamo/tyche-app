import { AxiosInstance } from "axios";
import { UserInput, UserOutput } from "../models/dtos/user";
import { User } from "../models/entities/user";
import { HttpRepository } from "./HttpRepository";
import { IEntityRepository } from "./IEntityRepository";

export class UserRepository implements IEntityRepository<User> {
  httpRepository: HttpRepository<UserInput, UserOutput>;
  endpoint = "http://localhost:8080/user";

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository<UserInput, UserOutput>(
      axiosInstance
    );
  }

  async create(input: UserInput): Promise<User> {
    const { data } = await this.httpRepository.post(this.endpoint, input);
    const user = User.fromUserOutput(data);

    return user;
  }

  async read(id: string): Promise<User> {
    const url = `${this.endpoint}/${id}`;
    const { data } = await this.httpRepository.get(url);
    const user = User.fromUserOutput(data);

    return user;
  }

  async update(id: string, input: UserInput): Promise<User> {
    const url = `${this.endpoint}/${id}`;
    const { data } = await this.httpRepository.put(url, input);
    const user = User.fromUserOutput(data);

    return user;
  }

  async delete(): Promise<void> {
    await this.httpRepository.delete(this.endpoint);
  }
}
