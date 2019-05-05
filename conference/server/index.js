const express = require('express');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const configs = require('./config');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');

const app = express();

const config = configs[app.get('env')];

const speakerService = new SpeakerService(config.data.speakers);
const feedbackService = new FeedbackService(config.data.feedback);

const routes = require('./routes');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// setup pug and point to where the templates are located
// also show non-compressed html in dev for debugging
app.set('view engine', 'pug');
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
// set up variables to be used by templates
app.locals.title = config.sitename;

app.use((req, res, next) => {
  res.locals.rendertime = new Date();
  return next();
});

app.set('views', path.join(__dirname, './views'));

// tell browser/express to not worry about favicon
app.get('/favicon.ico', (req, res, next) => {
  return res.sendStatus(204);
});

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    console.log(err.message);
  }
});
app.use(
  '/',
  routes({
    speakerService,
    feedbackService,
  }),
);

app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(status);
  return res.render('error');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});

module.exports = app;
