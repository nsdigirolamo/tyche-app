import { useLoginContext } from "../contexts/login-context";
import { useEffect, useMemo, useState } from "react";
import PostView from "../components/views/PostView";
import Post from "../models/entities/Post";
import PostForm from "../components/forms/PostForm";
import { isAxiosError } from "axios";
import { Link } from "react-router";
import { Alert } from "react-bootstrap";
import PostService from "../services/PostsService";

const PostsPage = () => {
  const { loginData, getAxios } = useLoginContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const postService = useMemo(() => new PostService(getAxios()), [getAxios]);

  const handleSubmit = (post: Post) => {
    setPosts([post, ...posts]);
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
      return;
    }

    if (isAxiosError(error)) {
      const response = error.response;
      const newErrorMessage = response
        ? (response.data as string)
        : "Could not determine a cause";
      setErrorMessage(
        "Something went wrong: " + newErrorMessage + ". Please try again."
      );
    } else {
      setErrorMessage(
        "Something went wrong: Could not determine a cause. Please try again"
      );
    }

    console.log(error);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const newPosts = await postService.findManyWithoutParents();
        setPosts(newPosts);
      } catch (error) {
        handleError(error);
      }
    };

    void fetchPosts();
  }, [postService]);

  return (
    <>
      <h1>Posts</h1>
      <Alert hidden={!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
      {loginData ? (
        <PostForm onSubmit={handleSubmit} onError={handleError} />
      ) : (
        <div className="my-3">
          <span>Don't have an account? </span>
          <Link to="/register">Click here to register</Link>
          <span> or </span>
          <Link to="/login">click here to login.</Link>
        </div>
      )}
      {posts
        .sort(
          (post1, post2) =>
            post2.createdAt.getTime() - post1.createdAt.getTime()
        )
        .map(post => (
          <PostView
            className="my-3 p-4"
            key={post.id}
            post={post}
            isParent={true}
          />
        ))}
    </>
  );
};

export default PostsPage;
