var mongoose = require('mongoose');

var schema = mongoose.Schema;

var timeSchema = new schema({
    user:{
        type:String
    },
    started: {
        type: Date
    },
    finished: {
        type: Date
    },
    difference: {
        type: String
    },
    project: {
        type: String
    },
    comment: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = mongoose.model('time', timeSchema,'time');