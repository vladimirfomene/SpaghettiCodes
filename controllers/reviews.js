const Review = require('../models/review')
const Post = require('../models/post')
const User = require('../models/user')

/*This function creates a new review*/
/*TODO: check error handling*/
exports.createReview = function(req, res) {
  var reviewData = {};
  var errors = {};

  if (req.body.review_content !== ' ' && typeof req.body.review_content === 'string')
    reviewData.review_content = req.body.review_content;
    else {
      errors.review_error = 'Review content cannot be empty.'
    }
  if (req.body.user_id)
    reviewData.user_id = req.body.user_id;
    else {
      errors.user_error = 'There is no user with that id.'
    }
  if (req.body.post_id)
    reviewData.post_id = req.body.post_id;
    else {
      errors.post_error = 'There is no post with that id.'
    }
  new Review(reviewData).save()
  .then(function(review) {
    return res.json(review);
  }).catch(function(e){
    console.log(e.stack);
    if (errors !== {})
    return res.json(errors);
  })
}

//fix this...
exports.getReviewById = function(req, res) {
  Review.where('review_id', req.params.id).fetch({withRelated: ['User']}).then(function(review) {
    res.json(review.related('User'));
    return res.json(review);
  }).catch(function(e){
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}

exports.getAllReviewsByPost = function(req, res) {
  Review.where('post_id', req.params.id).fetchAll()
  .then(function(reviews){
    return res.json(reviews);
  }).catch(function(e) {
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}

exports.getAllReviewsByUser = function(req, res) {
  Review.where('user_id', req.params.id).fetchAll()
  .then(function(reviews){
    return res.json(reviews);
  }).catch(function(e) {
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}
