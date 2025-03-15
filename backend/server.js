// server.js
const express = require('express');
const cors = require('cors');
const playersRoutes = require('./routes/players');
const leaguesRoute = require('./routes/leagues');
const areasRoute = require('./routes/areas');
const locationsRoute = require('./routes/locations');
const rivalsRoute = require('./routes/rivals');
const scoresRoutes = require('./routes/scores');
const loginRoute = require('./routes/login');
const logoutRoute = require("./routes/logout");
const app = express();
const PORT = 5000;
const session = require("express-session");

app.use(express.json());

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(
    session({
      secret: "danny",
      resave: false,
      saveUninitialized: false, // Set to false to avoid creating sessions for guests
      cookie: {
        secure: false, // Use true if using HTTPS
        httpOnly: true,
        sameSite: "lax",
      },
    })
  );

// Routes
app.use('/api/players', playersRoutes);
app.use('/api/leagues', leaguesRoute);
app.use('/api/rivals', rivalsRoute);
app.use('/api/areas', areasRoute);
app.use('/api/locations', locationsRoute);
app.use('/api/scores', scoresRoutes);
app.use('/api/login', loginRoute);
app.use("/api/logout", logoutRoute);

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Body:', req.body);
    next();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
