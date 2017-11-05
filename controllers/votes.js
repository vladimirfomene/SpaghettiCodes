const Vote = require('../models/vote');
const Review = require('../models/review');
const User = require('../models/user');

//where  review_id === req.body.id the user_id has to be unique

exports.createVote = function(req, res, next) {
  var voteData = {};
  var errors = {};

  if (req.body.review_vote === 1 || req.body.review_vote === -1)
    voteData.review_vote = req.body.review_vote;
    else {
      errors.vote_error = 'Invalid vote value.'
    }

  if (req.body.user_id)
    voteData.user_id = req.body.user_id;
    else {
      errors.user_error = 'There is no user with that id.'
    }
  if (req.body.review_id)
    voteData.review_id = req.body.review_id;
    else {
      errors.review_error = 'There is no review with that id.'
    }

  new Vote(voteData).save().then(function(vote) {
    return res.json(vote);
  }).catch(function(e){
    console.log(e.stack);
    if (errors !== {})
    return res.json(errors);
  });
}

exports.updateVote = function(req, res) {
  var voteData = {};
  var errors = {};

  if (req.body.review_vote === 1 || req.body.review_vote === -1)
    voteData.review_vote = req.body.review_vote;
    else {
      errors.vote_error = 'Invalid vote value.'
    }

  Vote.where('review_vote_id', req.params.id).save(voteData, {patch: true })
  .then(function(vote) {
    return res.json(vote)
  }).catch(function(e){
    console.log(e.stack);
    if (errors !== {})
    return res.json(errors);
  });
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
