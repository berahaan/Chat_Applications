import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ChatPage } from "./pages/ChatPage";
import Signup from "./pages/register";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<AuthPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
