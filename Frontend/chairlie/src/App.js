import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/login">Login Page</Link>
          <Link to="/chat">Chat Page</Link>
        </nav>
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;