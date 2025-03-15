import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("FORM1");
    console.log(username);
    console.log(password);
    await axios
  .post("http://localhost:5000/api/login", {
    username,
    password,
  }, { withCredentials: true })
  .then(async (response) => {
    console.log("CLIENT1");
    console.log(response);
    
    if (response.data.success) {
      setMessage("Login successful!");
      navigate("/");
      // After successful login, fetch the player record
      try {
        const playerResponse = await axios.get(
          `http://localhost:5000/api/players/by-email?email=${username}`
        );
        const loggedInPlayer = playerResponse.data; // Store the player data
        // localStorage.setItem("loggedInPlayer", JSON.stringify(loggedInPlayer));
        // localStorage.setItem("loggedIn", "true");
        setIsLoggedIn(true);
        setLoggedInUser(loggedInPlayer);
        console.log("LIP1")
        // console.log(localStorage.loggedInPlayer)
        console.log("Logged in player:", loggedInPlayer);
      } catch (error) {
        console.error("Error fetching player record:", error);
      }
    } else {
      setMessage("Invalid username or password.");
    }
  })
  .catch((error) => {
    console.error("Error logging in:", error);
    setMessage("An error occurred. Please try again later.");
  });

  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          textAlign: "center",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#333" }}>Login</h1>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "5px",
              color: "#555",
            }}
          >
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "5px",
              color: "#555",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "95%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007BFF",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
        {message && (
          <p
            style={{
              marginTop: "20px",
              color: message === "Login successful!" ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
