import { AxiosInstance } from "axios";
import HttpRepository from "./HttpRepository";
import { LikeOutput } from "../models/dtos/like-dto";

const POST_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/like`;
const GET_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/likes`;
const DELETE_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/like`;

class LikeRepository {
  httpRepository: HttpRepository;

  constructor(axios: AxiosInstance) {
    this.httpRepository = new HttpRepository(axios);
  }

  async createOne(post_id: string): Promise<void> {
    const url = `${POST_ENDPOINT}/${post_id}`;
    await this.httpRepository.post(url);
  }

  async findOne(post_id: string): Promise<LikeOutput> {
    const url = `${GET_ENDPOINT}/${post_id}`;
    const { data } = await this.httpRepository.get<LikeOutput>(url);

    return data;
  }

  async deleteOne(post_id: string): Promise<void> {
    const url = `${DELETE_ENDPOINT}/${post_id}`;
    await this.httpRepository.delete(url);
  }
}

export default LikeRepository;
