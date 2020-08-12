const express = require('express');
const bodyParser = require('body-parser');

const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID =
  '132163685745-fgvpj4a7ps9a68e20qmmdptsh34m2sdj.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

const app = express();

const {PORT = 3001} = process.env;

app.use(bodyParser.json());

function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then(ticket => ticket.getPayload())
    .then(payload => (console.log(payload), payload));
}

app.post('/google-signin', (req, res) => {
  const {token} = req.body;
  verify(token).then(result => {
    res.send(result);
  });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
