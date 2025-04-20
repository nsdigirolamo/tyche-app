import { AxiosInstance } from "axios";
import HttpRepository from "./HttpRepository";
import { PostInput, PostOutput } from "../models/dtos/post.dto";

const POST_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/post`;
const GET_ENDPOINT = `${import.meta.env.VITE_API_ORIGIN}/posts`;

class PostRepository {
  httpRepository: HttpRepository;

  constructor(axiosInstance: AxiosInstance) {
    this.httpRepository = new HttpRepository(axiosInstance);
  }

  async createOne(input: PostInput): Promise<PostOutput> {
    const url = POST_ENDPOINT;
    const { data } = await this.httpRepository.post<PostOutput>(url, input);

    return data;
  }

  async findOneById(id: string): Promise<PostOutput> {
    const url = `${GET_ENDPOINT}/${id}`;
    const { data } = await this.httpRepository.get<PostOutput>(url);

    return data;
  }

  async findManyWithoutParents(): Promise<PostOutput[]> {
    const url = GET_ENDPOINT;
    const { data } = await this.httpRepository.get<PostOutput[]>(url);

    return data;
  }

  async findManyByParentId(parentId: string): Promise<PostOutput[]> {
    const url = `${GET_ENDPOINT}/${parentId}/children`;
    const { data } = await this.httpRepository.get<PostOutput[]>(url);

    return data;
  }
}

export default PostRepository;
