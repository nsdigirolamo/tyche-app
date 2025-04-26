import { Link } from "react-router";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { isAxiosError } from "axios";
import RegisterForm from "../components/forms/RegisterForm";

const RegisterPage = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = () => {
    setIsRegistered(true);
  };

  const handleError = (error: unknown) => {
    if (!error) {
      setErrorMessage("");
      return;
    }

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

  return isRegistered ? (
    <Alert variant="success">
      <span>Your account was successfully registered. Please </span>
      <Link to="/login">click here and log in.</Link>
    </Alert>
  ) : (
    <>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleSubmit} onError={handleError} />
      <div className="my-3">
        <span>Already have an account? </span>
        <Link to="/login">Login here.</Link>
      </div>
      <Alert hidden={!errorMessage} variant="danger">
        {errorMessage}
      </Alert>
    </>
  );
};

export default RegisterPage;
