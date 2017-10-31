var Model = require('./base');


var Interest = Model.extend({
    tableName : 'interests',
    user : function(){
      return this.belongsToMany(require('./user'));
    },

    post: function(){
      return this.belongsToMany(require('./post'));
    }
});


module.exports = Interest;
