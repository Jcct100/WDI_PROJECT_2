const express  = require('express');
const router   = express.Router();
const statics  = require('../controllers/statics');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const foodbanks  = require('../controllers/foodbanks');

//a home route
router.route('/')
  .get(statics.homepage);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

//INDEX
router.route('/foodbanks')
  .get(foodbanks.index)
  .post(foodbanks.create);

//New
router.route('/foodbanks/new')
  .get(foodbanks.new);

//show
router.route('/foodbanks/:id')
  .get(secureRoute, foodbanks.show)
  .put(secureRoute, foodbanks.update)
  .delete(secureRoute, foodbanks.delete);

//edit
router.route('/foodbanks/:id/edit')
  .get(secureRoute, foodbanks.edit);

//post comment and delete comment
router.route('/foodbanks/:id/comments')
  .post(secureRoute, foodbanks.createComment)
  .delete(secureRoute, foodbanks.deleteComment);

//delete
router.route('/logout')
  .get(sessions.delete);

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in.');
      res.redirect('/login');
    });
  }

  return next();
}

module.exports = router;
