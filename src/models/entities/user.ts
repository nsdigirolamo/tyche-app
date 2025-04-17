import { UserOutput } from "../dtos/user";

export class User {
  id: string;
  name: string;
  createdAt: Date;

  constructor(id: string, name: string, createdAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
  }

  static fromUserOutput(output: UserOutput): User {
    return new User(output.id, output.name, new Date(output.created_at));
  }
}
