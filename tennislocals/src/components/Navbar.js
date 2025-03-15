import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { isLoggedIn, loggedInUser, setIsLoggedIn, setLoggedInUser } =
    useContext(AuthContext);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser("");
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        console.log("User logged out");
        navigate("/login"); // Redirect to the login page
      })
      .catch((err) => console.error("Logout error:", err));
  };

  useEffect(() => {
    console.log("Stored login status:", isLoggedIn);
    console.log("Logged in user:", loggedInUser);

    if (isLoggedIn === "true") {
      console.log("OUT1");
      fetch("http://localhost:5000/api/login/profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Profile data:", data);
          if (data && data.player) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
        });
    }
  }, []);

  const navbarClicked = () => {
    console.log("NAV1");
    console.log(isLoggedIn);
  };

  return (
    <nav className="bg-gray-800 py-4 shadow-md" onClick={navbarClicked}>
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          {!isLoggedIn ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="login text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/scores"
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Scores
                </Link>
              </li>
              <li>
                <Link
                  to="/submit-score"
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Submit Score
                </Link>
              </li>
              <li>
                <Link
                  to="/player-list"
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Player List
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white text-lg hover:text-yellow-400 transition duration-300"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
