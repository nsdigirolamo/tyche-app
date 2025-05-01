import { Button } from "react-bootstrap";
import Post from "../../models/entities/Post";
import { useNavigate } from "react-router";
import { useLoginContext } from "../../contexts/login-context";
import { useEffect, useMemo, useState } from "react";
import PostService from "../../services/PostsService";

interface CommentButtonProps {
  className?: string | undefined;
  post: Post;
}

const CommentButton = ({ className, post }: CommentButtonProps) => {
  const { axios } = useLoginContext();
  const postService = useMemo(() => new PostService(axios), [axios]);
  const [commentCount, setCommentCount] = useState<number>(0);
  const navigate = useNavigate();

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

  const handleClick = async () => {
    await navigate(`/posts/${post.id}`);
  };

  return (
    <Button
      className={className}
      variant="outline-primary"
      size="sm"
      onClick={handleClick}
    >
      <i className="bi bi-chat-fill me-2" />
      {commentCount}
    </Button>
  );
};

export default CommentButton;
