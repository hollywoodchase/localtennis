import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmitScore = () => {
  const [formData, setFormData] = useState({
    player1: "",
    player2: "",
    league: "",
    matchResult: "",
    setScores: ["", "", ""], // Initialize with three empty strings for the sets
  });

  const [players, setPlayers] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [filteredLeagues, setFilteredLeagues] = useState([]);
  const [isLeagueDisabled, setIsLeagueDisabled] = useState(true);
  const [setScores, setSetScores] = useState([]); // For three sets

  // Fetch players from the server
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersResponse = await axios.get(
          "http://localhost:5000/api/players"
        );
        setPlayers(playersResponse.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();
  }, []);

  // Fetch leagues from the server
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesResponse = await axios.get(
          "http://localhost:5000/api/leagues"
        );
        setLeagues(leaguesResponse.data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    fetchLeagues();
  }, []);

  // Fetch shared leagues for both players
  async function fetchSharedLeagues(player1Id, player2Id) {
    const response = await fetch(
      `/api/players/shared-leagues?player1Id=${player1Id}&player2Id=${player2Id}`
    );

    if (!response.ok) {
      console.error("Error fetching shared leagues");
      return [];
    }

    return await response.json();
  }

  // Update filtered leagues based on selected players
  const updateFilteredLeagues = async (player1Id, player2Id) => {
    if (player1Id && player2Id) {
      try {
        const sharedLeagues = await fetchSharedLeagues(player1Id, player2Id);
        setFilteredLeagues(sharedLeagues);
        setIsLeagueDisabled(sharedLeagues.length === 0);
      } catch (error) {
        console.error("Error fetching shared leagues:", error);
        setFilteredLeagues([]);
        setIsLeagueDisabled(true);
      }
    } else {
      setFilteredLeagues([]);
      setIsLeagueDisabled(true);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("setScore")) {
      const index = parseInt(name.replace("setScore", "")) - 1;
      setFormData((prevData) => {
        const newSetScores = [...prevData.setScores];
        newSetScores[index] = value;
        return { ...prevData, setScores: newSetScores };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (name === "player1" || name === "player2") {
      updateFilteredLeagues(
        name === "player1" ? value : formData.player1,
        name === "player2" ? value : formData.player2
      );
    }
  };

  // Validate the set scores (e.g., 6-3)
  const validateScores = (scores) => {
    const scoreRegex = /^\d{1,2}-\d{1,2}$/;
    return scores.every((score) => scoreRegex.test(score));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateScores(formData.setScores)) {
      alert("Please enter valid tennis scores for each set (e.g., 6-3).");
      return;
    }

    const matchResult = formData.setScores.join(" ");
    formData.matchResult = matchResult;
    // Check if at least one set score has been entered
    if (!matchResult) {
      alert("Please enter valid tennis scores");
      return;
    }
    console.log("FORM1");
    console.log(formData);
    axios
      .post("http://localhost:5000/api/scores", formData)
      .then((response) => {
        console.log("Success:", response.data);
        setFormData({
          player1: "",
          player2: "",
          league: "",
          matchDate: "",
          matchResult: "",
          setScores: [],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "300px",
          textAlign: "center",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Submit Score</h2>

        {/* Player 1 Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Winning Player:
          <select
            name="player1"
            value={formData.player1}
            onChange={handleChange}
            required
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select Player 1</option>
            {players.map((player) => (
              <option key={player.playerid} value={player.playerid}>
                {player.fname} {player.lname}
              </option>
            ))}
          </select>
        </label>

        {/* Player 2 Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Player 2:
          <select
            name="player2"
            value={formData.player2}
            onChange={handleChange}
            required
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select Player 2</option>
            {players.map((player) => (
              <option key={player.playerid} value={player.playerid}>
                {player.fname} {player.lname}
              </option>
            ))}
          </select>
        </label>

        {/* League Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          League:
          <select
            name="league"
            value={formData.league}
            onChange={handleChange}
            required
            disabled={isLeagueDisabled}
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select League</option>
            {filteredLeagues.map((league) => (
              <option key={league.leagueid} value={league.leagueid}>
                {league.leaguename}
              </option>
            ))}
          </select>
        </label>

{/* Set Scores Inputs */}
{[1, 2, 3].map((setNum) => (
  <label
    key={setNum}
    style={{ display: "block", textAlign: "left", marginTop: "10px" }}
  >
    Set {setNum} Score:
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        margin: "5px 0",
      }}
    >
      {/* First Score Dropdown */}
      <select
        value={
          formData.setScores[setNum - 1]?.split("-")[0] || ""
        }
        onChange={(e) => {
          const firstScore = e.target.value;
          const updatedScores = [...formData.setScores];
          const currentSecondScore =
            updatedScores[setNum - 1]?.split("-")[1] || "";
          updatedScores[setNum - 1] = `${firstScore}-${currentSecondScore}`;
          setFormData({ ...formData, setScores: updatedScores });
        }}
        required
        style={{ width: "45%" }}
      >
        <option value=""></option>
        {Array.from({ length: 11 }, (_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <span>-</span>

      {/* Second Score Dropdown */}
      <select
        value={
          formData.setScores[setNum - 1]?.split("-")[1] || ""
        }
        onChange={(e) => {
          const secondScore = e.target.value;
          const updatedScores = [...formData.setScores];
          const currentFirstScore =
            updatedScores[setNum - 1]?.split("-")[0] || "";
          updatedScores[setNum - 1] = `${currentFirstScore}-${secondScore}`;
          setFormData({ ...formData, setScores: updatedScores });
        }}
        required
        style={{ width: "45%" }}
      >
        <option value=""></option>
        {Array.from({ length: 11 }, (_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  </label>
))}


        {/* Submit Button */}
        <button type="submit" style={{ marginTop: "20px" }}>
          Submit Score
        </button>
      </form>
    </div>
  );
};

export default SubmitScore;
