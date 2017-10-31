const User = require('../models/user')
const Interest = require('../models/interest')

/*This function gets a particular user from the database using his/her id.
It returns a 404 status in case it does not find the user. */
exports.getUserById = function(req, res){
  User.where('user_id', req.params.id).fetch().then(function(user) {
    return res.json(user);
  }).catch(function(e){
    console.log(e.stack);
    res.json(404, {error: e.message});
  });
}

/* This function gets all users from our database users table. */
exports.getAllUsers = function(req, res){
  User.fetchAll().then(function(users){
    return res.json(users);
  }).catch(function(e){
    console.log(e.stack)
    res.json(404, {error: e.message});
  })
}

/* This function deletes a user from the database given his user id */
exports.deleteUser = function(req, res){
  User.where('user_id', req.params.id).destroy().then(function(user) {
    return res.json(user);
  }).catch(function(e){
    console.log(e.stack)
    res.json(404, {error: e.message});
  });
}
