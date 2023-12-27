import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill mandatory field")
      console.error("Email and password are required");
      return;
    }
    try {
      const response = await axios.post("https://refferal-zvlf.onrender.com/login", {
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/profile");
        localStorage.setItem("email",email)
        localStorage.setItem("password",password)
      }
    } catch (error) {
      console.error("Login failed:", error);
     
    }
  };

  return (
    <div className="login-container my-5">
      <form className="login-form" onSubmit={handleSubmit}>
      
        <input
          type="text"
          id="email"
          placeholder="Email"
          value={email}
        
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-button my-4">
          <b>Login</b>
        </button>
        <p>If you don't have an account</p> <a href="/">Register Here</a>
      </form>
    </div>
  );
};

export default Login;
