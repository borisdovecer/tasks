var Task = require('../models/taskModel');


function task_get(query, callback) {
    return Task.find(query).exec(callback);
}

function task_post (query, callback) {
    return Task.create(query).then(callback);
}

function task_update_post(query, set, callback) {
    console.log(set);
    return Task.updateMany(query,set, {multi:true}).then(callback);
}

function task_delete_post(query, callback) {
    return Task.remove(query).then(callback);
}

exports.task_get =  task_get;
exports.task_post = task_post;
exports.task_update_post = task_update_post;
exports.task_delete_post = task_delete_post;

