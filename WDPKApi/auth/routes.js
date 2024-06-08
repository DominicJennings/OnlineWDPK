/* Read app.js comment for more info.
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://gowdpk.ga',
  clientID: 'zVot2QEjBhHfz4ZpBTXJP5pM4MwJAnP5',
  issuerBaseURL: 'https://dev-74m55lcyld35gker.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
*/