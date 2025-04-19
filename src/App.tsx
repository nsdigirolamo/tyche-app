import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import LoginProvider from "./components/providers/LoginProvider";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <LoginProvider>
      <Container className="mt-5">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="posts" element={<PostsPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </LoginProvider>
  );
}

export default App;
