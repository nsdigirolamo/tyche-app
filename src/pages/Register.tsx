import { Link } from "react-router";
import RegisterForm from "../components/register/RegisterForm";
import { User } from "../models/entities/user";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  // @TODO: Redirect to login page when user is not null.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<User | null>(null);

  const handleSubmit = (user: User) => {
    setUser(user);
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
    }

    if (isAxiosError(error)) {
      const response = error.response;
      const newErrorMessage = response
        ? (response.data as string)
        : "Could not determine a cause :(";
      setErrorMessage(
        "Something went wrong registering your account: " +
          newErrorMessage +
          ". Please try again."
      );
    }
    console.log(error);
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleSubmit} onError={handleError} />
      <div className="my-3">
        <span>Already have an account? </span>
        <Link to="/login">Login here.</Link>
      </div>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </>
  );
};

export default Register;
