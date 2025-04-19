import { AxiosInstance } from "axios";
import { HttpRepository } from "./HttpRepository";
import { PostInput, PostOutput } from "../models/dtos/post.dto";
import Post from "../models/entities/Post";

export class PostRepository {
  httpRepository: HttpRepository<PostInput, PostOutput>;
  post_endpoint = "http://localhost:8000/api/post";
  get_endpoint = "http://localhost:8000/api/posts";

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository<PostInput, PostOutput>(
      axiosInstance
    );
  }

  async create_one(input: PostInput): Promise<Post> {
    const url = this.post_endpoint;
    const { data } = await this.httpRepository.post(url, input);
    const post = Post.fromPostOutput(data);

    return post;
  }
}
