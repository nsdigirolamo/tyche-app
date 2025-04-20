import { Link } from "react-router";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";
import { useState } from "react";
import LoginData from "../models/entities/LoginData";
import LoginForm from "../components/forms/LoginForm";
import { useLoginContext } from "../contexts/login-context";

const LoginPage = () => {
  const { setLoginData } = useLoginContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = (loginData: LoginData) => {
    setLoginData(loginData);
    setIsLoggedIn(true);
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
      return;
    }

    setIsLoggedIn(false);

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
    } else {
      console.log(error);
    }
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
