const express = require('express');
const path = require('path');

const app = express();
const routes = require('./routes');

// setup pug and point to where the templates are located
// also show non-compressed html in dev for debugging
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
app.set('views', path.join(__dirname, './views'));

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
