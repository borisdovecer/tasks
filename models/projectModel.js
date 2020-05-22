var mongoose = require('mongoose');

var schema = mongoose.Schema;

var projectSchema = new schema({
    title:{
        type:String
    },
    description: {
        type: String
    },
    startedOn: {
        type: Date
    },
    completedOn: {
        type: Date
    },
    price: {
        type: String
    },
    phase: {
        type: String
    },
    status: {
        type: String
    },
    link: {
        type: String
    }
});

module.exports = mongoose.model('projects',projectSchema,'projects');