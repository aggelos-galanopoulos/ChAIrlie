import React, { useState } from "react";
import history from "../history";
import "./LoginPage.css";
import logo from "../images/loginLogo.svg"; 


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
     
      <div className="right-side">
      <div className="left-side">
        <img src={logo} alt="Logo" />
      </div>
        <div className="login-form">
          <h1>Welcome Back</h1>
          <h3>Please enter your details</h3>
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
          <a className="invalidPassword">Forgot Password?</a>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;