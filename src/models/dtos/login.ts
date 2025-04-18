import { UserOutput } from "./user";

export interface LoginOutput {
  user: UserOutput;
  token: string;
}
