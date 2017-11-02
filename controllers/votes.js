const Vote = require('../models/vote');
const Review = require('../models/review');
const User = require('../models/user');

exports.createVote = function(req, res, next) {
  new Vote({
    review_vote: req.body.review_vote,
    review_id: req.body.review_id,
    user_id: req.body.user_id
  }).save().then(function(vote) {
    return res.json(vote);
  });
}

exports.updateVote = function(req, res) {
  Vote.where('review_vote_id', req.params.id).save({
    review_vote: req.body.review_vote
  }, {patch: true }).then(function(vote) {
    return res.json(vote)
  })
}

exports.deleteVote = function(req, res) {
  Vote.where('review_vote_id', req.params.id).destroy().then( function(vote){
    res.status(200).json('Vote deleted.');
  })
}

exports.getVotesByUserId = function(req, res) {
  Vote.where('user_id', req.params.id).fetchAll()
  .then(function(vote) {
    return res.json(vote);
  })
}

exports.getVotesByReviewId = function(req, res) {
  Vote.where('review_id', req.params.id).fetchAll()
  .then(function(vote) {
    return res.json(vote);
  })
}
