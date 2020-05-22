var Time = require('../models/timeModel');


function time_get(query, callback) {
    return Time.find(query).exec(callback);
}

function time_post (query, callback) {
    return Time.create(query).then(callback);
}

function time_update_post(query, set, callback) {
    return Time.updateMany(query,set, {multi:true}).then(callback);
}

function time_delete_post(query, callback) {
    return Time.remove(query).then(callback);
}

exports.time_get =  time_get;
exports.time_post = time_post;
exports.time_update_post = time_update_post;
exports.time_delete_post = time_delete_post;

