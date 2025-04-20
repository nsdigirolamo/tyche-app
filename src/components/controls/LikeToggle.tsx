import { useMemo, useState, useEffect } from "react";
import { ToggleButton } from "react-bootstrap";
import { useLoginContext } from "../../contexts/login-context";
import LikeService from "../../services/LikeService";
import Post from "../../models/entities/Post";

interface LikeToggleProps {
  post: Post;
}

const LikeToggle = ({ post }: LikeToggleProps) => {
  const { loginData, getAxios } = useLoginContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);

  const likeService = useMemo(() => new LikeService(getAxios()), [getAxios]);

  const handleLikeToggle = async (toggled: boolean) => {
    setIsLiked(toggled);

    try {
      await (toggled
        ? likeService.createOne(post.id)
        : likeService.deleteOne(post.id));
    } catch (error) {
      console.log(error);
    } finally {
      setLikeCount(toggled ? likeCount + 1 : likeCount - 1);
    }
  };

  useEffect(() => {
    const fetchLike = async () => {
      try {
        const newIsLiked = await likeService.findOne(post.id);
        setIsLiked(newIsLiked);
      } catch (error) {
        console.log(error);
      }
    };

    if (loginData) void fetchLike();
  }, [likeService, loginData, post.id]);

  return (
    <ToggleButton
      id={`toggle-like-${post.id}`}
      type="checkbox"
      variant="outline-primary"
      size="sm"
      checked={isLiked}
      value="1"
      onChange={e => handleLikeToggle(e.currentTarget.checked)}
      disabled={!loginData}
    >
      <i className="bi bi-heart-fill me-2" />
      {likeCount}
    </ToggleButton>
  );
};

export default LikeToggle;
