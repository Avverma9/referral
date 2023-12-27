import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Registration.css";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [refralCode, setRefralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate= useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name,
        email,
        mobile,
        password,
        refralCode,
      });

      if (response.status === 201) {
        alert("Registered");
        navigate("/login")
      }
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
        setError("Registration failed. Please try again.");
      } else if (err.request) {
        console.error("Network Error:", err.request);
        setError(
          "Network error. Please check your connection and try again."
        );
      } else {
        console.error("Error:", err.message);
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container my-5">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="input-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <label htmlFor="email" className="input-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <label htmlFor="mobile" className="input-label">
          Mobile
        </label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="input-field"
        />

        <label htmlFor="password" className="input-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <label htmlFor="refferalLink" className="input-label">
          Enter referral link (If you have)
        </label>
        <input
          type="text"
          id="refferalLink"
          value={refralCode}
          onChange={(e) => setRefralCode(e.target.value)}
          className="input-field"
        />

        <button type="submit" disabled={loading} className="submit-button my-4">
          {loading ? "Registering..." : "Register"}
        </button>
 <p>Already have an account ?</p> <a href="/login">Login</a>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
