var Model = require('./base');

var RatingCategory = Model.extend({
  tableName: 'rating_category',

  rating: function(){
    return this.hasMany(require('./rating'));
  }
})

module.exports = RatingCategory;
