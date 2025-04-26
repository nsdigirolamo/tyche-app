import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginContext } from "../../contexts/login-context";
import User from "../../models/entities/User";
import UserService from "../../services/UserService";

interface RegisterFormProps {
  onSubmit: (user: User) => void;
  onError: (error: unknown) => void;
}

interface IRegisterFormInput {
  username: string;
  password: string;
}

const RegisterFormSchema = yup.object({
  username: yup.string().required("A username is required."),
  password: yup.string().required("A password is required."),
});

const RegisterForm = ({ onSubmit, onError }: RegisterFormProps) => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<IRegisterFormInput>({
    resolver: yupResolver(RegisterFormSchema),
  });
  const { getAxios } = useLoginContext();

  const userService = new UserService(getAxios());

  const submitHandler = handleSubmit(async data => {
    try {
      const user = await userService.createOne(data.username, data.password);
      onSubmit(user);
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
        Register
      </Button>
      <Button variant="outline-secondary" onClick={handleResetClick}>
        Reset
      </Button>
    </Form>
  );
};

export default RegisterForm;
