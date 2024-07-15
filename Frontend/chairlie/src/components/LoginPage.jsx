import React, { useState } from "react";
import history from "../history";
import "./LoginPage.css";
import logo from "../images/loginLogo.svg"; // Αντικατέστησε με το σωστό μονοπάτι της εικόνας σου

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      console.log("Logging in with:", email, password);
      history.push("/chat");
    } else {
      console.log("Email and Password are required");
    }
  };

  return (
    <div className="page-container">
      <div className="left-side">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>Login Page</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;