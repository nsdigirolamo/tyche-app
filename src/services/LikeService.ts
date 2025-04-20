import { AxiosInstance } from "axios";
import LikeRepository from "../repositories/LikeRepository";

class LikeService {
  likeRepository: LikeRepository;

  constructor(axios: AxiosInstance) {
    this.likeRepository = new LikeRepository(axios);
  }

  async createOne(post_id: string): Promise<void> {
    await this.likeRepository.createOne(post_id);
  }

  async findOne(post_id: string): Promise<boolean> {
    const output = await this.likeRepository.findOne(post_id);

    return output.exists;
  }

  async deleteOne(post_id: string): Promise<void> {
    await this.likeRepository.deleteOne(post_id);
  }
}

export default LikeService;
