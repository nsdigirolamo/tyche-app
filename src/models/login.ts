import { LoginOutput } from "./dtos/login";
import User from "./user";

class LoginData {
  user: User;
  token: string;

  constructor(user: User, token: string) {
    this.user = user;
    this.token = token;
  }

  static fromLoginOutput(output: LoginOutput): LoginData {
    const user = User.fromUserOutput(output.user);
    return new LoginData(user, output.token);
  }
}

export default LoginData;
