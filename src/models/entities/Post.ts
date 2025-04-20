import { PostOutput } from "../dtos/post.dto";
import { UserOutput } from "../dtos/user-dto";
import User from "./User";

class Post {
  id: string;
  parentId: string | null;
  author: User;
  body: string;
  likeCount: number;
  createdAt: Date;

  constructor(
    id: string,
    parentId: string | null,
    author: User,
    body: string,
    likeCount: number,
    createdAt: Date
  ) {
    this.id = id;
    this.parentId = parentId;
    this.author = author;
    this.body = body;
    this.likeCount = likeCount;
    this.createdAt = createdAt;
  }

  static fromOutputs(postOutput: PostOutput, userOutput: UserOutput): Post {
    const author = User.fromUserOutput(userOutput);
    const createdAt = new Date(postOutput.created_at);
    return new Post(
      postOutput.id,
      postOutput.parent_id,
      author,
      postOutput.body,
      postOutput.like_count,
      createdAt
    );
  }
}

export default Post;
