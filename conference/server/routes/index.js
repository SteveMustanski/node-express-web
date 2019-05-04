const express = require('express');

const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = param => {
  const { speakerService } = param;

  router.get('/', async (req, res, next) => {
    const speakerslist = await speakerService.getListShort();
    return res.render('index', {
      page: 'Home',
      speakerslist,
    });
  });

  router.use('/speakers', speakersRoute());
  router.use('/feedback', feedbackRoute());

  return router;
};
