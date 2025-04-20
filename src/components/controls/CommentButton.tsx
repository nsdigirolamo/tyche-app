import { Button } from "react-bootstrap";
import Post from "../../models/entities/Post";
import { Link } from "react-router";
import { useLoginContext } from "../../contexts/login-context";
import { useEffect, useMemo, useState } from "react";
import PostService from "../../services/PostsService";

interface CommentButtonProps {
  className?: string | undefined;
  post: Post;
}

const CommentButton = ({ className, post }: CommentButtonProps) => {
  const { getAxios } = useLoginContext();
  const postService = useMemo(() => new PostService(getAxios()), [getAxios]);
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const comments = await postService.findManyByParentId(post.id);
        setCommentCount(comments.length);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchCommentCount();
  }, [post.id, postService]);

  return (
    <Button className={className} variant="outline-primary" size="sm">
      <Link to={`/posts/${post.id}`} style={{ textDecoration: "none" }}>
        <i className="bi bi-chat-fill me-2" />
        {commentCount}
      </Link>
    </Button>
  );
};

export default CommentButton;
