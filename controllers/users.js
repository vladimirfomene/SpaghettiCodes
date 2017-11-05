const User = require('../models/user')
const Interest = require('../models/interest')

/*This function gets a particular user from the database using his/her id.
It returns a 404 status in case it does not find the user. */
exports.getUserById = function(req, res){
  User.where('user_id', req.params.id).fetch().then(function(user) {
    return res.json(user);
  }).catch(function(e){
    console.log(e.stack);
    res.status(404).json({error: e.message});
  });
}

/* This function gets all users from our database users table. */
exports.getAllUsers = function(req, res){
  User.fetchAll().then(function(users){
    return res.json(users);
  }).catch(function(e){
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}

/* This function creates a new user*/
exports.createUser = function(req, res, next) {
  var userData = {}
  var errors = {}
  if (req.body.username !== ' ' && typeof req.body.username === 'string')
    userData.username = req.body.username;
    else {
      errors.username_error = 'Invalid username.';
    }
  if (req.body.password !== ' ' && typeof req.body.password === 'string')
    userData.password = req.body.password;
    else {
      errors.password_error = 'Invalid password.';
    }
  if (req.body.facebook_ref !== ' ' && typeof req.body.facebook_ref === 'string')
    userData.facebook_ref = req.body.facebook_ref;
    else {
      errors.facebook_ref_error = 'Invalid facebook reference.';
    }
  if (req.body.admin === 0 || req.body.admin === 1 && typeof req.body.admin === 'number')
    userData.admin = req.body.admin;
    else {
      errors.admin_error = 'Error in setting admin status.';
    }
  if (req.body.email) {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
      errors.password_error = 'Invalid password.';
    else {
      userData.email = req.body.email;
    }
  }

  new User(userData).save()
  .then(function(user) {
    return res.json(user);
  }).catch(function(e){
    console.log(e.stack);
    if (errors !== {})
    return res.json(errors);
  })
}

/* This function deletes a user from the database given his user id */
//TODO: reset user_id on-delete
exports.deleteUser = function(req, res){
  User.where('user_id', req.params.id).destroy().then(function(user) {
    return res.status(200).json("User deleted.");
  }).catch(function(e){
    console.log(e.stack)
    res.status(404).json({error: e.message});
  });
}

exports.updateUser = function(req, res) {
  var userData = {};
  var errors = {};
  var current_timestamp = new Date();

  if (req.body.username !== ' ' && typeof req.body.username === 'string')
    userData.username = req.body.username;
    else {
      errors.username_error = 'Invalid username.';
    }
  if (req.body.password !== ' ' && typeof req.body.password === 'string')
    userData.password = req.body.password;
    else {
      errors.password_error = 'Invalid password.';
    }
  if (req.body.facebook_ref !== ' ' && typeof req.body.facebook_ref === 'string')
    userData.facebook_ref = req.body.facebook_ref;
    else {
      errors.facebook_ref_error = 'Invalid facebook reference.';
    }
  if (req.body.admin === 0 || req.body.admin === 1 && typeof req.body.admin === 'number')
    userData.admin = req.body.admin;
    else {
      errors.admin_error = 'Error in setting admin status.';
    }
  if (req.body.email) {
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)))
      errors.password_error = 'Invalid password.';
    else {
      userData.email = req.body.email;
    }
  }

  userData.updated_at = current_timestamp;

  User.where('user_id', req.params.id).save( userData, {patch: true }).then(function(user) {
    return res.json(user)
  });
}
