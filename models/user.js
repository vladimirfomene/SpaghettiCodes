var Model = require('./base');


var User = Model.extend({
    tableName : 'users',
    interest : function(){
      return this.hasMany(require('./interest'));
    }
});

module.exports = User;
