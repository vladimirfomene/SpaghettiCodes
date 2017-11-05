var Model = require('./base');


var User = Model.extend({
    tableName : 'users',

    interest : function(){
      return this.hasMany(require('./interest'));
    },

    post : function(){
      return this.hasMany(require('./post'));
    },

    review : function(){
      return this.hasMany(require('./review'));
    }
});

module.exports = User;
