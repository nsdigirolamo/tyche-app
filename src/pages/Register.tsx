import { Link } from "react-router";
import RegisterForm from "../components/register/RegisterForm";
import { User } from "../models/entities/user";

const Register = () => {
  const handleSubmit = (user: User) => {
    console.log(user);
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterForm onSubmit={handleSubmit} />
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </>
  );
};

export default Register;
