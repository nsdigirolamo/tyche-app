import { UserOutput } from "../dtos/user-dto";

class User {
  id: string;
  name: string;
  createdAt: Date;

  constructor(id: string, name: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  static fromUserOutput(output: UserOutput): User {
    const createdAt = new Date(output.created_at);
    return new User(output.id, output.name, createdAt);
  }
}

export default User;
