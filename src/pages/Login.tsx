import { Link } from "react-router";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import LoginData from "../models/login";
import LoginForm from "../components/forms/LoginForm";

const LoginPage = () => {
  const { login } = useLogin();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (loginData: LoginData) => {
    login(loginData);
    // @TODO: Send the JWT token back in each request.
    console.log(loginData);
    setIsLoggedIn(true);
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
    } else {
      setIsLoggedIn(false);
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

  return isLoggedIn ? (
    <Alert variant="success">
      <span>You are now logged in. </span>
      <Link to="/posts">Click here and get posting!</Link>
    </Alert>
  ) : (
    <>
      <h1>Login</h1>
      <LoginForm onSubmit={handleSubmit} onError={handleError} />
      <div className="my-3">
        <span>Don't have an account? </span>
        <Link to="/register">Register here.</Link>
      </div>
      <Alert hidden={!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
    </>
  );
};

export default LoginPage;
