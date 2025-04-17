import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { User } from "../../models/entities/user";
import { UserRepository } from "../../repositories/UserRepository";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegisterFormProps {
  onSubmit: (user: User) => void;
}

interface IRegisterFormInput {
  username: string;
  password: string;
}

const RegisterFormSchema = yup.object({
  username: yup
    .string()
    .max(16, "A username cannot be longer than 16 characters.")
    .matches(/^[a-zA-Z0-9_]+$/, "A username must be alphanumeric.")
    .required("A username is required."),
  password: yup.string().required("A password is required."),
});

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(RegisterFormSchema),
  });

  const userRepository = new UserRepository(axios);

  const submitHandler = handleSubmit(async data => {
    const input = { name: data.username, password: data.password };
    try {
      const user = await userRepository.create_one(input);
      onSubmit(user);
    } catch (error) {
      console.log(error);
    }
  });

  const handleResetClick = () => {
    reset();
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-2">
        <Form.Label for="username">Username</Form.Label>
        <Form.Control
          id="username"
          placeholder="Please enter a username."
          isInvalid={!!errors.username}
          {...register("username")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.username?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label for="password">Password</Form.Label>
        <Form.Control
          id="password"
          placeholder="Please enter a secure password."
          isInvalid={!!errors.password}
          {...register("password")}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="me-3" variant="primary" type="submit">
        Register
      </Button>
      <Button variant="outline-secondary" onClick={handleResetClick}>
        Reset
      </Button>
    </Form>
  );
};

export default RegisterForm;
