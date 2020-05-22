var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema;

var userSchema = new schema({
    username:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    jobtitle:{
        type: String
    },
    description: {
        type: String
    },
    education: {
        type: Object
    },
    workplace: {
        type: Object
    },
    from: {
        type: String
    },
    email: {
        type: String
    },
    livesIn: {
        type: String
    },
    phone: {
        type: String
    }



});

userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
};

userSchema.methods.comparePassword = function (password,hash) {
    return bcrypt.compareSync(password,hash)
};

module.exports = mongoose.model('users',userSchema,'users');