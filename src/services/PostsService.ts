import { AxiosInstance } from "axios";
import PostRepository from "../repositories/PostRepository";
import Post from "../models/entities/Post";
import UserRepository from "../repositories/UserRepository";

class PostService {
  userRepository: UserRepository;
  postRepository: PostRepository;

  constructor(axios: AxiosInstance) {
    this.userRepository = new UserRepository(axios);
    this.postRepository = new PostRepository(axios);
  }

  async createOne(body: string, parentId?: string): Promise<Post> {
    const postInput = { parent_id: parentId ?? null, body };
    const postOutput = await this.postRepository.createOne(postInput);
    const authorOutput = await this.userRepository.findOneById(
      postOutput.author_id
    );

    return Post.fromOutputs(postOutput, authorOutput);
  }

  async findOneById(id: string): Promise<Post> {
    const postOutput = await this.postRepository.findOneById(id);
    const authorOutput = await this.userRepository.findOneById(
      postOutput.author_id
    );

    return Post.fromOutputs(postOutput, authorOutput);
  }

  async findManyWithoutParents(): Promise<Post[]> {
    const postsOutput = await this.postRepository.findManyWithoutParents();
    const posts = postsOutput.map(async postOutput => {
      const authorOutput = await this.userRepository.findOneById(
        postOutput.author_id
      );
      return Post.fromOutputs(postOutput, authorOutput);
    });

    return Promise.all(posts);
  }

  async findManyByParentId(parentId: string): Promise<Post[]> {
    const postsOutput = await this.postRepository.findManyByParentId(parentId);
    const posts = postsOutput.map(async postOutput => {
      const authorOutput = await this.userRepository.findOneById(
        postOutput.author_id
      );
      return Post.fromOutputs(postOutput, authorOutput);
    });

    return Promise.all(posts);
  }
}

export default PostService;
