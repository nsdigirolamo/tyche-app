import { Link } from "react-router";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import LoginData from "../models/login";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  const { login } = useLogin();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (loginData: LoginData) => {
    login(loginData);
    setSuccessMessage("You're now logged in.");
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
    } else {
      setSuccessMessage("");
    }

    if (isAxiosError(error)) {
      const response = error.response;
      const newErrorMessage = response
        ? (response.data as string)
        : "Could not determine a cause";
      setErrorMessage(
        "Something went wrong logging into your account: " +
          newErrorMessage +
          ". Please try again."
      );
    }
    console.log(error);
  };

  return (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} onError={handleError} />
      <div className="my-3">
        <span>Don't have an account? </span>
        <Link to="/register">Register here.</Link>
      </div>
      {successMessage && <Alert variant="success">{errorMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
    </>
  );
};

export default LoginPage;
