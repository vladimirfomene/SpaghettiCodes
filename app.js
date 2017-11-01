const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const users = require('./controllers/users');
const reviews = require('./controllers/reviews');

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

var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
