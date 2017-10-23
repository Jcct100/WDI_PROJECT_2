const User = require('../models/user');

function registrationsNew(req, res) {
  res.render('registration/new');
}

function registrationsCreate(req, res) {

}

module.exports = {
  new: registrationsNew,
  create: registrationsCreate
};
