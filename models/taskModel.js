var mongoose = require('mongoose');

var schema = mongoose.Schema;

var tasksSchema = new schema({
    name:{
        type:String
    },
    projectId: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('tasks', tasksSchema,'tasks');