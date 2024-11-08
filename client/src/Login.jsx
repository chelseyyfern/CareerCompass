import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error messages
    setError("");

    // Validate empty fields
    if (!username || !password) {
      setError("Please provide both username and password.");
      return;
    }

    try {
      // Make the axios request for login
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      console.log(response.data); // Assuming the server returns a user object

      // Redirect to home page upon successful login
      if (response.data.success) {
        if (username.toLowerCase() === "admin") {
          window.location.href = "/admin";
        } else {
          navigate(`/home?username=${response.data.user.username}`);
        }
      } else {
        setError("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.log("Login failed:", error.message);
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "url(/career-compass-bg.jpg) center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div
        className="p-4 rounded w-25"
        style={{
          position: "absolute",
          zIndex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        <h2 className="text-center mb-4">CareerCompass Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <strong>Username</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              autoComplete="off"
              name="username"
              className="form-control rounded-0"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none text-light"
            style={{ fontWeight: "bold" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
