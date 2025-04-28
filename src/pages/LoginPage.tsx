import { Link } from "react-router";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";
import { useState } from "react";
import LoginForm, { LoginFormInput } from "../components/forms/LoginForm";
import { useLoginContext } from "../contexts/login-context";
import { LoginService } from "../services/LoginService";

const LoginPage = () => {
  const { getAxios, setLoginData } = useLoginContext();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const loginService = new LoginService(getAxios());

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
        "Something went wrong: " + newErrorMessage + ". Please try again."
      );
    } else {
      setErrorMessage(
        "Something went wrong. Could not determine a cause. Please try again."
      );
    }

    console.log(error);
  };

  const handleSubmit = async (formInput: LoginFormInput) => {
    try {
      const loginData = await loginService.login(
        formInput.username,
        formInput.password
      );
      setLoginData(loginData);
      setIsLoggedIn(true);
    } catch (error) {
      handleError(error);
    }
  };

  return isLoggedIn ? (
    <Alert variant="success">
      <span>You are now logged in. </span>
      <Link to="/posts">Click here and get posting!</Link>
    </Alert>
  ) : (
    <>
      <h2>Login</h2>
      <LoginForm
        onSubmit={handleSubmit}
        onError={handleError}
        submitButtonText="Login"
      />
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
