const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.REACT_APP_CLIENT_ID, // Replace with your actual Client ID
  process.env.REACT_APP_CLIENT_SECRET, // Replace with your actual Client Secret
  process.env.REACT_APP_CLIENT_URL // Replace with your actual Redirect URL
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
