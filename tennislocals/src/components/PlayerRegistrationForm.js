import React, { useState, useEffect } from "react";
import axios from "axios";

const PlayerRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    location: "",
    fplayer: "",
    rival: "",
    celebration: "",
    league: "",
  });

  const [leagues, setLeagues] = useState([]); // State to hold available leagues
  const [players, setPlayers] = useState([]); // State to hold available rivals
  const [areas, setAreas] = useState([]); // State to hold available areas
  const [locations, setLocations] = useState([]); // State to hold available locations

  // Fetch leagues and players from the server
  useEffect(() => {
    const fetchData = async () => {
        try {
            const [leaguesResponse, playersResponse, areasResponse, locationsResponse] = await Promise.all([
                axios.get('http://localhost:5000/api/leagues'),
                axios.get('http://localhost:5000/api/players'),
                axios.get('http://localhost:5000/api/areas'),
                axios.get('http://localhost:5000/api/locations')
            ]);

            setLeagues(leaguesResponse.data);
            setPlayers(playersResponse.data);
            setAreas(areasResponse.data);  // Set areas data
            setLocations(locationsResponse.data);  // Set locations data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/players", formData); // Adjust URL as needed
      alert("Player registered successfully!");
      setFormData({
        fname: "",
        lname: "",
        phone: "",
        email: "",
        location: "",
        fplayer: "",
        rival: "",
        celebration: "",
        league: "",
      });
    } catch (error) {
      console.error("Error registering player:", error);
      alert("Failed to register player.");
    }
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
        <h2>Player Registration</h2>

        {/* First Name */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          First Name:
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            required
            style={{ width: "100%", margin: "5px 0" }}
          />
        </label>

        {/* Last Name */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Last Name:
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            required
            style={{ width: "100%", margin: "5px 0" }}
          />
        </label>

        {/* Phone */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          />
        </label>

        {/* Email */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", margin: "5px 0" }}
          />
        </label>
        {/* Area Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Area:
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select Area</option>
            {areas.map((area) => (
              <option key={area.areaid} value={area.areaid}>
                {area.areaname}
              </option>
            ))}
          </select>
        </label>
        {/* Location Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Location:
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.locationid} value={location.locationid}>
                {location.locationname}
              </option>
            ))}
          </select>
        </label>

        {/* Favorite Player */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Favorite Player:
          <input
            type="text"
            name="fplayer"
            value={formData.fplayer}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          />
        </label>

        {/* Rivals Dropdown */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Rival:
          <select
            name="rival"
            value={formData.rival}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select Rival</option>
            {players.map((player) => (
              <option key={player.playerid} value={player.playerid}>
                {player.fname} {player.lname}
              </option>
            ))}
          </select>
        </label>

        {/* Celebration Style */}
        <label
          style={{ display: "block", textAlign: "left", marginTop: "10px" }}
        >
          Celebration Style:
          <input
            type="text"
            name="celebration"
            value={formData.celebration}
            onChange={handleChange}
            style={{ width: "100%", margin: "5px 0" }}
          />
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
            style={{ width: "100%", margin: "5px 0" }}
          >
            <option value="">Select League</option>
            {leagues.map((league) => (
              <option key={league.leagueid} value={league.leagueid}>
                {league.leaguename}
              </option>
            ))}
          </select>
        </label>

        {/* Submit Button */}
        <button type="submit" style={{ marginTop: "20px" }}>
          Register Player
        </button>
      </form>
    </div>
  );
};

export default PlayerRegistrationForm;
