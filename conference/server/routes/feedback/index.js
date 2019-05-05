const express = require('express');

const router = express.Router();

module.exports = param => {
  const { feedbackService } = param;

  router.get('/', async (req, res, next) => {
    try {
      const feedbacklist = await feedbackService.getList();
      return res.render('feedback', {
        page: 'Feedback',
        feedbacklist,
      });
    } catch (err) {
      next(err);
    }
  });
  router.post('/', async (req, res, next) => {
    try {
      const fbName = req.body.fbName.trim();
      const fbTitle = req.body.fbTitle.trim();
      const fbMessage = req.body.fbMessage.trim();
      const feedbacklist = await feedbackService.getList();

      if (!fbName || !fbTitle || !fbMessage) {
        return res.render('feedback', {
          page: 'Feedback',
          error: true,
          fbName,
          fbTitle,
          fbMessage,
          feedbacklist,
        });
      }
      return res.send(`Form Sent`);
    } catch (err) {
      next(err);
    }
  });
  return router;
};
