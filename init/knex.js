var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'mysql',
    database : 'spaghetticodes',
    charset  : 'utf8'
  }
});

module.exports = knex;
