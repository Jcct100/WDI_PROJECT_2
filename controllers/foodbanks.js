const Foodbank = require('../models/foodbank');

function foodbanksIndex(req, res) {
  Foodbank
    .find()
    .exec()
    .then(foodbanks => {
      res.render( 'foodbanks/index',{ foodbanks });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function foodbanksNew(req, res) {
  return res.render('foodbanks/new');
}


function foodbanksShow(req, res) {
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.status(404).render('error', {
        error: 'No foodbanks found'});
      res.render('foodbanks/show',{ foodbank });
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function foodbanksCreate(req, res) {
  Foodbank
    .create(req.body)
    .then(() => {
      res.redirect('/foodbanks');
    });
}

function foodbanksEdit(req, res) {
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.status(404).render('error', {
        error: 'No foodbanks found.' });
      res.render('foodbanks/edit', { foodbank});
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function foodbanksUpdate(req, res) {
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.status(404).render('error', {
        error: 'No foodbank found.'});

      for(const field in req.body) {
        foodbank[field] = req.body[field];
      }
      return foodbank.save();
    })
    .then(foodbank => {
      res.redirect(`/foodbanks/${foodbank.id}`);
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

function foodbanksDelete(req, res) {
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.status(404).render('error', {
        error: 'No foodbank found.'});
      return foodbank.remove();
    })
    .then(() => {
      res.redirect('/foodbanks');
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
    });
}

module.exports = {
  index: foodbanksIndex,
  show: foodbanksShow,
  new: foodbanksNew,
  create: foodbanksCreate,
  edit: foodbanksEdit,
  update: foodbanksUpdate,
  delete: foodbanksDelete
};
