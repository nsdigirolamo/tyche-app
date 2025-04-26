import { useMemo, useEffect, useState } from "react";
import { useLoginContext } from "../contexts/login-context";
import PostService from "../services/PostsService";
import Post from "../models/entities/Post";
import { Link, useParams } from "react-router";
import { isAxiosError } from "axios";
import { Alert } from "react-bootstrap";
import PostForm from "../components/forms/PostForm";
import NotFoundPage from "./NotFoundPage";
import PostView from "../components/views/PostView";

type Comment = Post;

const CommentsPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { loginData, getAxios } = useLoginContext();
  const [parentPost, setParentPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const postService = useMemo(() => new PostService(getAxios()), [getAxios]);

  const handleSubmit = (comment: Comment) => {
    setComments([comment, ...comments]);
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
      if (!postId) {
        return;
      }

      try {
        const parentPost = await postService.findOneById(postId);
        setParentPost(parentPost);
      } catch (error) {
        handleError(error);
        return;
      }

      try {
        const newComments = await postService.findManyByParentId(postId);
        setComments(newComments);
      } catch (error) {
        handleError(error);
        return;
      }
    };

    void fetchPosts();
  }, [postId, postService]);

  return parentPost ? (
    <>
      <h2>Comments</h2>
      <Alert hidden={!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
      <PostView className="my-3 p-4" post={parentPost} isParent={true} />
      {loginData ? (
        <PostForm
          onSubmit={handleSubmit}
          onError={handleError}
          parentId={parentPost.id}
        />
      ) : (
        <div className="my-3">
          <span>Don't have an account? </span>
          <Link to="/register">Click here to register</Link>
          <span> or </span>
          <Link to="/login">click here to login.</Link>
        </div>
      )}
      {comments
        .sort(
          (comment1, comment2) =>
            comment2.createdAt.getTime() - comment1.createdAt.getTime()
        )
        .map(comment => (
          <PostView
            className="my-3 p-4"
            key={comment.id}
            post={comment}
            isParent={false}
          />
        ))}
    </>
  ) : (
    <NotFoundPage />
  );
};

export default CommentsPage;
