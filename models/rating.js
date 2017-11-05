var Model = require('./base');

var Rating = Model.extend({
  tableName : 'ratings',

  user : function(){
    return this.belongsTo(require('./user'));
  },

  post : function() {
    return this.belongsTo(require('./post'));
  },

  rating_category: function() {
    return this.belongsTo(require('./rating_category'));
  }
});

module.exports = Rating;
