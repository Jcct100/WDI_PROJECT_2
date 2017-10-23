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
  .get(foodbanks.show)
  .put(foodbanks.update)
  .delete(foodbanks.delete);

//edit
router.route('/foodbanks/:id/edit')
  .get(foodbanks.edit);

//delete
router.route('/logout')
  .get(sessions.delete);

router.route('/films/:id')
  .get(foodbanks.show)
  .put(secureRoute, foodbanks.update)
  .delete(secureRoute, foodbanks.delete);

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
