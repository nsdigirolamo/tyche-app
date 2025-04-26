import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Container } from "react-bootstrap";
import LoginProvider from "./components/providers/LoginProvider";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostsPage from "./pages/PostsPage";
import LandingPage from "./pages/LandingPage";
import CommentsPage from "./pages/CommentsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <LoginProvider>
      <Container className="mt-5">
        <BrowserRouter>
          <h1>Tyche</h1>
          <hr />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="posts/:postId?" element={<CommentsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </LoginProvider>
  );
}

export default App;
