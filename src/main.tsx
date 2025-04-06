import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const root = document.getElementById("root");

if (root === null) {
  console.error("Can't find root. Something has gone seriously wrong.");
} else {
  ReactDOM.createRoot(root).render(<App />);
}
