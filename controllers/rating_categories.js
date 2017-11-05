const RatingCategory = require('../models/rating_category');
const Rating = require('../models/rating');

exports.createRatingCategory = function(req, res) {
  var categoryData = {}
  if (req.body.category_name !== ' ' && typeof(req.body.category_name) === 'string')
    categoryData.category_name = req.body.category_name

  new RatingCategory(categoryData).save().then(function(rating_category){
    return res.json(rating_category);
  }).catch(function(e){
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}

exports.getRatingCategoryById = function(req, res){
  RatingCategory.where('rating_category_id', req.params.id)
  .fetch().then(function(rating_category){
    return res.json(rating_category);
  })
}

exports.updateRatingCategory = function(req, res){
  var categoryData = {}
  if (req.body.category_name !== ' ' && typeof(req.body.category_name) === 'string')
    categoryData.category_name = req.body.category_name

  RatingCategory.where('rating_category_id', req.params.id)
  .save(categoryData, {patch: true}).then(function(rating_category){
    return res.json(rating_category);
  }).catch(function(e){
    console.log(e.stack)
    res.status(404).json({error: e.message});
  })
}

exports.deleteRatingCategory = function(req, res) {
  RatingCategory.where('rating_category_id', req.params.id).destroy().then(function(rating_category){
    return res.status(200).json('Rating category deleted.');
  })
}
