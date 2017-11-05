var Model = require('./base');

var Post = Model.extend({
  tableName : 'posts',
  user: function(){
    return this.belongsTo(require('./user'));
  },

  review: function(){
    return this.hasMany(require('./review'));
  },

  interest: function(){
    return this.hasMany(require('./interest'));
  }
});

module.exports = Post;
