import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button, Form } from "react-bootstrap";
import { useLoginContext } from "../../contexts/login-context";
import Post from "../../models/entities/Post";
import PostService from "../../services/PostsService";
import { useMemo } from "react";

interface PostFormProps {
  onSubmit: (post: Post) => void;
  onError: (error: unknown) => void;
  parentId?: string;
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

const PostForm = ({ onSubmit, onError, parentId }: PostFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IPostFormInput>({ resolver: yupResolver(PostFormSchema) });
  const { axios } = useLoginContext();

  const postService = useMemo(() => new PostService(axios), [axios]);

  const submitHandler = handleSubmit(async data => {
    try {
      const post = await postService.createOne(data.body, parentId);
      onSubmit(post);
      onError(undefined);
    } catch (error) {
      onError(error);
    } finally {
      reset();
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
        Submit
      </Button>
      <Button variant="outline-secondary" onClick={handleResetClick}>
        Reset
      </Button>
    </Form>
  );
};

export default PostForm;
