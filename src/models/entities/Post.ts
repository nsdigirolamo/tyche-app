import { PostOutput } from "../dtos/post.dto";

class Post {
  id: string;
  parentId: string | null;
  authorId: string;
  body: string;
  createdAt: Date;

  constructor(
    id: string,
    parentId: string | null,
    authorId: string,
    body: string,
    createdAt: Date
  ) {
    this.id = id;
    this.parentId = parentId;
    this.authorId = authorId;
    this.body = body;
    this.createdAt = createdAt;
  }

  static fromPostOutput(output: PostOutput): Post {
    const createdAt = new Date(output.created_at);
    return new Post(
      output.id,
      output.parent_id,
      output.author_id,
      output.body,
      createdAt
    );
  }
}

export default Post;
