var Model = require('./base');

var Vote = Model.extend({
  tableName: 'review_votes',

  review: function(){
    return this.belongsTo(require('./review'));
  },

  user: function(){
    return this.belongsTo(require('./user'));
  }
});

module.exports = Vote;
