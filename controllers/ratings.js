const Rating = require('../models/rating');
const User = require('../models/user');
const Post = require('../models/post');

exports.createRating = function(req, res) {
  var ratingData = {};
  var errors = {};

  if (req.body.rating === 'good' || req.body.rating === 'fair' || req.body.rating === 'bad' )
    ratingData.rating = req.body.rating;
  else {
    errors.rating_error = 'Invalid rating.'
  }

  if (req.body.rating_category_id)
    ratingData.rating_category_id = req.body.rating_category_id;
  else {
    ratingData.category_error = 'No such category exists.'
  }

  if (req.body.post_id)
    ratingData.post_id = req.body.post_id;
  else {
    ratingData.post_error = 'No such post exists.'
  }

  if (req.body.user_id)
    ratingData.user_id = req.body.user_id;
  else {
    ratingData.user_error = 'No such user exists.'
  }

  new Rating(ratingData).save().then(function(rating){
    return res.json(rating);
  }).catch(function(e){
    if (errors !== {})
    return res.json(errors);
  });
}

exports.updateRating = function(req, res) {
  var ratingData = {};
  var errors = {};

  if (req.body.rating === 'good' || req.body.rating === 'fair' || req.body.rating === 'bad' )
    ratingData.rating = req.body.rating;
  else {
    errors.rating_error = 'Invalid rating.'
  }

  if (req.body.rating_category_id)
    ratingData.rating_category_id = req.body.rating_category_id;
  else {
    errors.category_error = 'No such category exists.'
  }

  if (req.body.post_id)
    ratingData.post_id = req.body.post_id;
  else {
    errors.post_error = 'No such post exists.'
  }

  if (req.body.user_id)
    ratingData.user_id = req.body.user_id;
  else {
    errors.user_error = 'No such user exists.'
  }

  Rating.where('rating_id', req.params.id).save(ratingData, {patch: true}).then(function(rating){
    return res.json(rating);
  }).catch(function(e){
    if (errors !== {})
    return res.json(errors);
  });
}

//TODO: update rating

exports.getRatingById = function(req, res){
  Rating.where('rating_id', req.params.id).fetch().then(function(rating) {
    return res.json(rating);
  }).catch(function(e){
    console.log(e.stack);
    res.status(404).json({error: e.message});
  });
}

exports.getAllRatingsByUserId = function(req, res){
  Rating.where('user_id', req.params.id).fetchAll().then(function(ratings) {
    return res.json(ratings);
  }).catch(function(e){
    console.log(e.stack);
    res.status(404).json({error: e.message});
  });
}

exports.getAllRatingsByPostId = function(req, res){
  Rating.where('post_id', req.params.id).fetchAll().then(function(ratings) {
    return res.json(ratings);
  }).catch(function(e){
    console.log(e.stack);
    res.status(404).json({error: e.message});
  });
}

exports.getAllRatingsByRatingCategoryId = function(req, res){
  Rating.where('rating_category_id', req.params.id).fetchAll().then(function(ratings) {
    return res.json(ratings);
  }).catch(function(e){
    console.log(e.stack);
    res.status(404).json({error: e.message});
  });
}
