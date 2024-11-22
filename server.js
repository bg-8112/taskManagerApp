const express = require("express");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const cors = require("cors");

const app = express();
app.use(cors());

const oAuth2Client = new OAuth2(
  "721976797583-ji5cd1snb9v8j17dsmg6p893ue5f0t2h.apps.googleusercontent.com", // Replace with your actual Client ID
  "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", // Replace with your actual Client Secret
  "http://localhost:3001/auth/google/callback" // Replace with your actual Redirect URL
);

app.get("/auth/google", (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  res.redirect(authUrl);
});

app.get("/auth/google/callback", (req, res) => {
  const code = req.query.code;
  oAuth2Client.getToken(code, (err, tokens) => {
    if (err) return res.status(400).send("Error retrieving access token");
    oAuth2Client.setCredentials(tokens);
    res.send("Authentication successful! You can close this tab.");
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
