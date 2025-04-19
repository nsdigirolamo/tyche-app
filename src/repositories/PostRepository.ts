import { AxiosInstance } from "axios";
import { HttpRepository } from "./HttpRepository";
import { PostInput, PostOutput } from "../models/dtos/post.dto";

export class PostRepository {
  httpRepository: HttpRepository;
  postEndpoint = "http://localhost:8000/api/post";
  getEndpoint = "http://localhost:8000/api/posts";

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository(axiosInstance);
  }

  async createOne(input: PostInput): Promise<PostOutput> {
    const url = this.postEndpoint;
    const { data } = await this.httpRepository.post<PostOutput>(url, input);

    return data;
  }

  async findOneById(id: string): Promise<PostOutput> {
    const url = `${this.getEndpoint}/${id}`;
    const { data } = await this.httpRepository.get<PostOutput>(url);

    return data;
  }

  async findManyWithoutParents(): Promise<PostOutput[]> {
    const url = this.getEndpoint;
    const { data } = await this.httpRepository.get<PostOutput[]>(url);

    return data;
  }

  async findManyByParentId(parentId: string): Promise<PostOutput[]> {
    const url = `${this.getEndpoint}/${parentId}/children`;
    const { data } = await this.httpRepository.get<PostOutput[]>(url);

    return data;
  }
}
