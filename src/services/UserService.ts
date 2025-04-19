import { AxiosInstance } from "axios";
import { UserRepository } from "../repositories/UserRepository";
import User from "../models/entities/User";

class UserService {
  userRepository: UserRepository;

  constructor(axios: AxiosInstance) {
    this.userRepository = new UserRepository(axios);
  }

  async createOne(name: string, password: string): Promise<User> {
    const output = await this.userRepository.createOne({ name, password });
    const user = User.fromUserOutput(output);

    return user;
  }

  async findOneById(id: string): Promise<User> {
    const output = await this.userRepository.findOneById(id);
    const user = User.fromUserOutput(output);

    return user;
  }

  async findOneByName(name: string): Promise<User> {
    const output = await this.userRepository.findOneByName(name);
    const user = User.fromUserOutput(output);

    return user;
  }
}

export default UserService;
