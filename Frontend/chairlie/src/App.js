import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ChatPage from "./components/ChatPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";


function App() {
  return (
    <Router>
      <div className="App">
        {/* <nav> */}
          {/* <Link to="/login">Login Page</Link> */}
          {/* <Link to="/chat">Chat Page</Link> */}
        {/* </nav> */}
        <header className="App-header">
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
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