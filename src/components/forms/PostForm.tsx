import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useLoginContext } from "../../contexts/login-context";
import Post from "../../models/entities/Post";
import PostService from "../../services/PostsService";

interface PostFormProps {
  onSubmit?: (post: Post) => void;
  onError?: (error: unknown) => void;
}

interface IPostFormInput {
  body: string;
}

const PostFormSchema = yup.object({
  body: yup
    .string()
    .min(1, "Please create a post.")
    .max(80, "A post cannot be longer than 80 characters.")
    .required("Please create a post."),
});

const PostForm = ({ onSubmit, onError }: PostFormProps) => {
  const { getAxios } = useLoginContext();
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IPostFormInput>({ resolver: yupResolver(PostFormSchema) });

  const postService = new PostService(getAxios());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = handleSubmit(async data => {
    setIsLoading(true);

    try {
      const post = await postService.createOne(data.body);
      if (onSubmit) onSubmit(post);
      if (onError) onError(undefined);
    } catch (error) {
      if (onError) onError(error);
    } finally {
      reset();
      setIsLoading(false);
    }
  });

  const handleResetClick = () => {
    reset();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Post</Form.Label>
        <Form.Control
          as="textarea"
          isInvalid={!!errors.body}
          {...register("body")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.body?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="me-3" variant="primary" type="submit">
        {!isLoading ? (
          "Submit"
        ) : (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ms-2">Loading...</span>
          </>
        )}
      </Button>
      <Button variant="outline-secondary" onClick={handleResetClick}>
        Reset
      </Button>
    </Form>
  );
};

export default PostForm;
