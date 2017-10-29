var Model = require('./base');


var Interest = Model.extend({
    tableName : 'interests',
    user : function(){
      return this.belongsToMany(require('./user'));
    }
});


module.exports = Interest;
