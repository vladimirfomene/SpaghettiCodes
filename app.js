const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const users = require('./controllers/users');
const reviews = require('./controllers/reviews');
const review_votes = require('./controllers/votes');
const ratings = require('./controllers/ratings');
const rating_categories = require('./controllers/rating_categories');

var app = express();
var router = express.Router();

// log if in dev mode
if (app.get('env') !== 'production') app.use(logger('dev'));

app.use(bodyParser.json());

//user functions

app.get('/user/:id', users.getUserById);

app.get('/users', users.getAllUsers);

app.delete('/user/:id', users.deleteUser);

app.post('/users', users.createUser);

app.put('/user/:id', users.updateUser);

//review functions

app.post('/reviews', reviews.createReview);

app.get('/review/:id', reviews.getReviewById);

app.get('/reviews/post/:id', reviews.getAllReviewsByPost);

app.get('/reviews/user/:id', reviews.getAllReviewsByUser);

//review_vote functions

app.post('/votes', review_votes.createVote);

app.put('/vote/:id', review_votes.updateVote);

app.delete('/vote/:id', review_votes.deleteVote);

app.get('/votes/review/:id', review_votes.getVotesByReviewId);

app.get('/votes/user/:id', review_votes.getVotesByUserId);

//rating functions

app.post('/ratings', ratings.createRating);

app.put('/rating/:id', ratings.updateRating);

app.get('/rating/:id', ratings.getRatingById);

app.get('/ratings/user/:id', ratings.getAllRatingsByUserId);

app.get('/ratings/post/:id', ratings.getAllRatingsByPostId);

app.get('/ratings/rating_category/:id', ratings.getAllRatingsByRatingCategoryId);

//rating category functions

app.post('/rating_categories', rating_categories.createRatingCategory);

app.get('/rating_category/:id', rating_categories.getRatingCategoryById);

app.put('/rating_category/:id', rating_categories.updateRatingCategory);

app.delete('/rating_category/:id', rating_categories.deleteRatingCategory);

var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
