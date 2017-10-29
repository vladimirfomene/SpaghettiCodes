const User = require('../models/user')
const Interest = require('../models/interest')


exports.getUserById = function(req, res){
  User.where('user_id', req.params.id).fetch().then(function(user) {
    return res.json(user);
  });
}
