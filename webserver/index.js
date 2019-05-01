const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  return res.send('Hello, I am an expressified websever');
});

app.get('/time', (req, res, next) => {
  return res.send(new Date().toString());
});

app.get('/throw', (req, res, next) => {
  throw new Error('Something is wrong');
});

app.get('/next', (req, res, next) => {
  return next(new Error('Something is wrong'));
});

app.get('/hello:name', (req, res, next) => {
  if (!req.query.name) {
    return res.status(400).end();
  }
  return res.send(`Hello ${req.query.name}!`);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
