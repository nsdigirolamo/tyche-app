import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface LoginFormInput {
  username: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formInput: LoginFormInput) => void;
  onError: (error: unknown) => void;
  submitButtonText?: string;
}

const LoginFormSchema = yup.object({
  username: yup
    .string()
    .max(16, "A username cannot be longer than 16 characters.")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "A username must be alphanumeric and cannot contain spaces."
    )
    .required("A username is required."),
  password: yup.string().required("A password is required."),
});

const LoginForm = ({ onSubmit, onError, submitButtonText }: LoginFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<LoginFormInput>({ resolver: yupResolver(LoginFormSchema) });

  const submitHandler = handleSubmit(data => {
    try {
      onSubmit(data);
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
      <Form.Group className="mb-2">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Please enter a username."
          isInvalid={!!errors.username}
          {...register("username")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Please enter a secure password."
          isInvalid={!!errors.password}
          type="password"
          {...register("password")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="me-3" variant="primary" type="submit">
        {submitButtonText ?? "Submit"}
      </Button>
      <Button variant="outline-secondary" onClick={handleResetClick}>
        Reset
      </Button>
    </Form>
  );
};

export default LoginForm;
