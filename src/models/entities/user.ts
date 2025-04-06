import { UserOutput } from "../dtos/user";

export class User {
  id: string;
  username: string;
  createdAt: Date;

  constructor(id: string, username: string, createdAt: Date) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
  }

  static fromUserOutput(output: UserOutput): User {
    return new User(output.id, output.username, new Date(output.created_at));
  }
}
