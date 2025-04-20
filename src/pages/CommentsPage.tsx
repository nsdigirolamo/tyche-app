import { useMemo, useEffect, useState } from "react";
import { useLoginContext } from "../contexts/login-context";
import PostService from "../services/PostsService";
import Post from "../models/entities/Post";
import { Link, useParams } from "react-router";
import { isAxiosError } from "axios";
import { Alert } from "react-bootstrap";
import PostForm from "../components/forms/PostForm";
import CommentView from "../components/views/CommentView";
import NotFoundPage from "./NotFoundPage";

type Comment = Post;

const CommentsPage = () => {
  const { loginData, getAxios } = useLoginContext();
  const postService = useMemo(() => new PostService(getAxios()), [getAxios]);

  const { postId } = useParams<{ postId: string }>();
  const [parentPost, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (comment: Comment) => {
    setComments([comment, ...comments]);
  };

  const handleError = (error: unknown) => {
    console.log(error);
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
        "Something went wrong retrieving this post: " +
          newErrorMessage +
          ". Please try again."
      );
    } else {
      setErrorMessage(
        "Something went wrong retrieving this post: Could not determine a cause. Please try again"
      );
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (!postId) {
        return;
      }

      try {
        const newPost = await postService.findOneById(postId);
        setPost(newPost);
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
      <h1>Comments</h1>
      <Alert hidden={!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
      <CommentView className="my-3 p-4" post={parentPost} />
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
          <CommentView className="my-3 p-4" key={comment.id} post={comment} />
        ))}
    </>
  ) : (
    <NotFoundPage />
  );
};

export default CommentsPage;
