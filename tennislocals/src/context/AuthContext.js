import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser") || ""
  );

  useEffect(() => {
    console.log("OUT2");
    console.log(isLoggedIn);
    if (isLoggedIn === "true") {
      fetch("http://localhost:5000/api/login/profile", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.player) {
            setIsLoggedIn(true);
            setLoggedInUser(data.player.username);
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("loggedInUser", data.player.username);
          } else {
            setIsLoggedIn(false);
            setLoggedInUser("");
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("loggedInUser");
          }
        })
        .catch((error) => {
          console.error("Error checking login status:", error);
          setIsLoggedIn(false);
          setLoggedInUser("");
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("loggedInUser");
        });
    } else {
      localStorage.setItem("loggedInUser", null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, loggedInUser, setIsLoggedIn, setLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
