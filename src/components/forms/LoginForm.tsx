import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { LoginService } from "../../services/LoginService";
import LoginData from "../../models/login";

interface LoginFormProps {
  onSubmit: (user: LoginData) => void;
  onError: (error: unknown) => void;
}

interface ILoginFormInput {
  username: string;
  password: string;
}

const LoginFormSchema = yup.object({
  username: yup
    .string()
    .max(16, "A username cannot be longer than 16 characters.")
    .matches(/^[a-zA-Z0-9_]+$/, "A username must be alphanumeric.")
    .required("A username is required."),
  password: yup.string().required("A password is required."),
});

const LoginForm = ({ onSubmit, onError }: LoginFormProps) => {
  const loginService = new LoginService(axios);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<ILoginFormInput>({ resolver: yupResolver(LoginFormSchema) });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = handleSubmit(async data => {
    const input = { name: data.username, password: data.password };
    setIsLoading(true);
    try {
      const loginData = await loginService.login(input);
      onSubmit(loginData);
      onError(undefined);
    } catch (error) {
      onError(error);
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
          {...register("password")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="me-3" variant="primary" type="submit">
        {!isLoading ? (
          "Login"
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

export default LoginForm;
