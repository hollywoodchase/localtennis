import React, { useEffect, useState } from 'react';

function Scores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/scores')
      .then(response => response.json())
      .then(data => {
        console.log("Received data:");
        console.log(data);  // Log the entire data to inspect the structure.
        setScores(data);    // Assuming data is directly the array of scores.
      })
      .catch(error => console.error('Error fetching scores:', error));
  }, []);

  return (
    <div>
      <h1>Match Scores</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Player 1</th>
            <th>Player 2</th>
            <th>League</th>
            <th>Match Date</th>
            <th>Match Result</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.matchid}>
              <td>{score.player1}</td>
              <td>{score.player2}</td>
              <td>{score.league}</td>
              <td>{new Date(score.match_date).toLocaleDateString()}</td>
              <td>{score.match_result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scores;
