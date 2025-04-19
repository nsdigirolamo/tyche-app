import { Button } from "react-bootstrap";
import { PostRepository } from "../repositories/PostRepository";
import { useLoginContext } from "../contexts/login-context";

const PostsPage = () => {
  const { getAxios } = useLoginContext();
  const postRepository = new PostRepository(getAxios());

  const handleClick = async () => {
    const input = { parent_id: null, body: "Hello world." };
    const post = await postRepository.create_one(input);
    console.log(post);
  };

  return <Button onClick={handleClick}>Click Me</Button>;
};

export default PostsPage;
