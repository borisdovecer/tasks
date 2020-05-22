var Project = require('../models/projectModel');


function project_get (query, callback) {
      return Project.find(query).exec(callback);
}

function project_post (query, callback) {
    return Project.create(query).then(callback);
}

function project_update_post(query, set, callback) {
    return Project.update(query,set).then(callback);
}

function project_delete_post(query, callback) {
    return Project.remove(query).then(callback);
}

exports.project_get = project_get;
exports.project_post = project_post;
exports.project_update_post = project_update_post;
exports.project_delete_post = project_delete_post;