var Model = require('./base');


var Review = Model.extend({
    tableName: 'reviews',

    user: function(){
      this.belongsTo(require('./user'));
    },

    post: function(){
      this.belongsTo(require('./post'));
    }

});

module.exports = Review;
