const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res) {
  User
    .create({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }
      req.flash('success', `${user.username}, you've logged in!`);
      req.session.userId = user._id;

      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('success', 'You successfully logged out.');
    res.redirect('/');
  });
}


module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
