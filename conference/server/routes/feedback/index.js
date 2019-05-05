const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res, next) => {
    return res.render('feedback', {
      page: 'Feedback',
    });
  });
  router.post('/', (req, res, next) => {
    return res.send(`Form Sent`);
  });

  return router;
};
