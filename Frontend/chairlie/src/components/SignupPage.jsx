import React, { useState } from "react";
import { Link} from "react-router-dom"; 
import history from "../history";
import "./SignupPage.css";
import logo from "../images/loginLogo.svg";

const SignupPage = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (name && email && password) {
      console.log("Signing up with:", name, email, password);
      // Assuming after signup, you redirect to login page
      history.push("/login");
    } else {
      console.log("Name, Email, and Password are required");
    }
  };

  return (
    <div className="page-container">
      <div className="right-side">
        <div className="left-side">
          <img className="chAirlieLogo" src={logo} alt="Logo" />
        </div>
        <div className="signup-form">
          <h1>Please create an Account</h1>
          <input className="input-name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button onClick={handleSignup}>Sign Up</button>
          <p>
            Do you have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
