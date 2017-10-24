const Foodbank = require('../models/foodbank');

function foodbanksIndex(req, res) {
  Foodbank
    .find()
    .populate('createdBy')
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
    .populate('createdBy comments.createdBy')
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
  req.body.createdBy = req.user;
  
  Foodbank
    .create(req.body)
    .then(() => {
      res.redirect('/foodbanks');
    })
    .catch(err => {
      res.status(500).render('error', { error: err });
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

function createCommentRoute(req, res, next) {
  console.log('inside createCommentRoute');
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.notFound();
      console.log('foodbank found', foodbank);

      req.body.createdBy = req.user;
      foodbank.comments.push(req.body);
      console.log(req.body);
      console.log('foodbank comments', foodbank.comments);
      return foodbank.save((err) => {
        console.log('ERROR', err);
      });
    })
    .then(() => {
      console.log('INSIDE THEN');
      res.redirect(`/foodbanks/${req.params.id}`);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/foodbanks/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Foodbank
    .findById(req.params.id)
    .exec()
    .then(foodbank => {
      if (!foodbank) return res.notFound();
      if (!foodbank.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      foodbank.comments.id(req.params.commentId).remove();

      return foodbank.save();
    })
    .then(foodbank => res.redirect(`/foodbanks/${foodbank.id}`))
    .catch(next);
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Foodbank
    .create(req.body)
    .then(() => res.redirect('/foodbanks'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/foodbanks/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

module.exports = {
  index: foodbanksIndex,
  show: foodbanksShow,
  new: foodbanksNew,
  create: foodbanksCreate,
  edit: foodbanksEdit,
  update: foodbanksUpdate,
  delete: foodbanksDelete,
  createRoute: createRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
