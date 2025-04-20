import { Card, Row } from "react-bootstrap";
import Post from "../../models/entities/Post";
import LikeToggle from "../controls/LikeToggle";
import CommentButton from "../controls/CommentButton";

interface PostViewProps {
  className?: string | undefined;
  style?: React.CSSProperties;
  post: Post;
  isParent: boolean;
}

const PostView = ({ className, style, post, isParent }: PostViewProps) => {
  return (
    <Card className={className} style={style}>
      <Row className="mb-3">
        <div>@{post.author.name}</div>
        <div style={{ fontSize: "0.70em" }}>
          {post.createdAt.toDateString()} at{" "}
          {post.createdAt.toLocaleTimeString()}
        </div>
      </Row>
      <Row>
        <p>{post.body}</p>
      </Row>
      <Row>
        <div>
          {isParent && <CommentButton className="me-2" post={post} />}
          <LikeToggle post={post} />
        </div>
      </Row>
    </Card>
  );
};

export default PostView;
