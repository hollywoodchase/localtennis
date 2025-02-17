import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [locations, setLocations] = useState({});
  const [rivals, setRivals] = useState({});
  const [leagues, setLeagues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const playersResponse = await axios.get(
          "http://localhost:5000/api/players"
        );
        const rivalsData = playersResponse.data;
        // Fetch locations
        const locationsResponse = await axios.get(
          "http://localhost:5000/api/locations"
        );
        const locationsData = locationsResponse.data;

        // Fetch locations
        const leaguesResponse = await axios.get(
          "http://localhost:5000/api/leagues"
        );
        const leaguesData = leaguesResponse.data;

        // Map locationid to locationname
        const locationsMap = locationsData.reduce((acc, loc) => {
          acc[loc.locationid] = loc.locationname;
          return acc;
        }, {});
        // Map playerid to playername
        const rivalsMap = rivalsData.reduce((acc, riv) => {
          acc[riv.playerid] = riv.fname + " " + riv.lname;
          return acc;
        }, {});
        // Map playerid to playername
        const leaguesMap = leaguesData.reduce((acc, league) => {
          acc[league.leagueid] = league.leaguename;
          return acc;
        }, {});
        setLeagues(leaguesMap);
        setRivals(rivalsMap);
        setLocations(locationsMap);
        setPlayers(playersResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching players:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to fetch players.");
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registered Players</h2>
      {players.length > 0 ? (
        <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Favorite Player</th>
              <th>Rival</th>
              <th>Celebration</th>
              <th>League</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.playerid}>
                <td>{player.fname}</td>
                <td>{player.lname}</td>
                <td>{player.phone}</td>
                <td>{player.email}</td>
                <td>{locations[player.location] || "Unknown"}</td>{" "}
                {/* Match locationid to locationname */}
                <td>{player.fplayer}</td>
                <td>{rivals[player.rival] || "Unknown"}</td>{" "}
                {/* Match locationid to locationname */}
                <td>{player.celebration}</td>
                <td>{leagues[player.league] || "Unknown"}</td>{" "}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No players registered yet.</p>
      )}
    </div>
  );
};

export default PlayerList;
