import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="register" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
