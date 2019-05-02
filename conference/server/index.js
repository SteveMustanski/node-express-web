const express = require('express');

const app = express();
const routes = require('./routes');

app.use(express.static('public'));
// tell browser/express to not worry about favicon
app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});
app.use('/', routes());

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

module.exports = app;
