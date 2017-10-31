const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const users = require('./controllers/users');


var app = express();
var router = express.Router();

// log if in dev mode
if (app.get('env') !== 'production') app.use(logger('dev'));

app.use(bodyParser.json());

app.get('/user/:id', users.getUserById);


app.get('/users', users.getAllUsers);

app.delete('/user/:id', users.deleteUser);

app.post('/users', users.createUser);

app.put('/user/:id', users.updateUser);


var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
