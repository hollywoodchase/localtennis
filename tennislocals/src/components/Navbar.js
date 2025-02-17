import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Fetch the login status from the backend
    fetch("http://localhost:5000/api/login/profile", {
      credentials: "include", // to include cookies for session
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.player) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {!isLoggedIn ? (
          <>
            <li style={liStyle}>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
            </li>
            
          </>
        ) : (
          <>
          <li style={liStyle}>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/scores" style={linkStyle}>
                Scores
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/submit-score" style={linkStyle}>
                Submit Score
              </Link>
            </li>
            <li style={liStyle}>
              <Link to="/player-list" style={linkStyle}>
                Player List
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// Styling
const navStyle = {
  backgroundColor: "#333",
  padding: "10px 20px",
  textAlign: "center",
};

const ulStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0,
};

const liStyle = {
  display: "inline",
  marginRight: "20px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "18px",
};

export default NavBar;
