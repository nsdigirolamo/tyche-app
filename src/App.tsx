import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
