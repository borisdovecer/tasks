var User = require('../models/User');


function user_get(query, callback) {
    return User.find(query).exec(callback);
}

function user_post (query, callback) {
    return User.create(query).then(callback);
}

function user_update_post(query, set, callback) {
    console.log(set);
    return User.updateMany(query,set, {multi:true}).then(callback);
}

function user_delete_post(query, callback) {
    return User.remove(query).then(callback);
}

exports.user_get =  user_get;
exports.user_post = user_post;
exports.user_update_post = user_update_post;
exports.user_delete_post = user_delete_post;

