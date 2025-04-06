import { UserOutput } from "../dtos/user";

export class User {
  name: string;
  createdAt: Date;

  constructor(name: string, createdAt: Date) {
    this.name = name;
    this.createdAt = createdAt;
  }

  static fromUserOutput(output: UserOutput): User {
    return new User(output.name, new Date(output.created_at));
  }
}
