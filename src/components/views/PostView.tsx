import { Card } from "react-bootstrap";
import Post from "../../models/entities/Post";

interface PostViewProps {
  className?: string | undefined;
  style?: React.CSSProperties;
  post: Post;
}

const PostView = ({ className, style, post }: PostViewProps) => {
  return (
    <Card className={className} style={style}>
      <div className="mb-3 fw-light">
        <div>@{post.author.name}</div>
        <div style={{ fontSize: "0.70em" }}>
          {post.createdAt.toDateString()}
        </div>
      </div>
      <p>{post.body}</p>
    </Card>
  );
};

export default PostView;
