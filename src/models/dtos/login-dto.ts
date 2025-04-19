import { UserOutput } from "./user-dto";

export interface LoginOutput {
  user: UserOutput;
  token: string;
}
