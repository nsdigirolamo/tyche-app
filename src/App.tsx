import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import { Container } from "react-bootstrap";
import LoginDataContext from "./contexts/login";
import useLogin from "./hooks/useLogin";
import { useMemo } from "react";
import Login from "./pages/Login";

function App() {
  const { loginData, setLoginData } = useLogin();

  const loginContextValue = useMemo(
    () => ({ loginData, setLoginData }),
    [loginData, setLoginData]
  );

  return (
    <LoginDataContext value={loginContextValue}>
      <Container className="mt-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </LoginDataContext>
  );
}

export default App;
