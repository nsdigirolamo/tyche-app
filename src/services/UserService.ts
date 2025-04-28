import { AxiosInstance } from "axios";
import UserRepository from "../repositories/UserRepository";
import User from "../models/entities/User";
import LoginData from "../models/entities/LoginData";

class UserService {
  userRepository: UserRepository;

  constructor(axios: AxiosInstance) {
    this.userRepository = new UserRepository(axios);
  }

  async createOne(name: string, password: string): Promise<LoginData> {
    const output = await this.userRepository.createOne({ name, password });
    const loginData = LoginData.fromLoginOutput(output);

    return loginData;
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
