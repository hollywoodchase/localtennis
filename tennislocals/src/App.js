import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import PlayerRegistrationForm from "./components/PlayerRegistrationForm";
import PlayerList from "./components/PlayerList";
import Scores from "./components/Scores";
import SubmitScore from "./components/SubmitScore";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<PlayerRegistrationForm />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/submit-score" element={<SubmitScore />} />
          <Route path="/player-list" element={<PlayerList />} />
          <Route path="/" element={<div>Welcome to the Homepage</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
