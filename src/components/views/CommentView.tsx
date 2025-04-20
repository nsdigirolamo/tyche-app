import { Card, Row } from "react-bootstrap";
import Post from "../../models/entities/Post";
import LikeToggle from "../controls/LikeToggle";

interface CommentViewProps {
  className?: string | undefined;
  style?: React.CSSProperties;
  post: Post;
}

const CommentView = ({ className, style, post }: CommentViewProps) => {
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
          <LikeToggle post={post} />
        </div>
      </Row>
    </Card>
  );
};

export default CommentView;
