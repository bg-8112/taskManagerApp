const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  "721976797583-ji5cd1snb9v8j17dsmg6p893ue5f0t2h.apps.googleusercontent.com", // Replace with your actual Client ID
  "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", // Replace with your actual Client Secret
  "http://localhost:3001/auth/google/callback" // Replace with your actual Redirect URL
);

const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  return authUrl;
};

const setCredentials = (code) => {
  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, tokens) => {
      if (err) return reject(err);
      oAuth2Client.setCredentials(tokens);
      resolve(tokens);
    });
  });
};

const addEvent = (event) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  return calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};

module.exports = { getAuthUrl, setCredentials, addEvent };
