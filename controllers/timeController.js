var ObjectId = require('mongodb').ObjectId;
var moment = require('moment');
var timeService = require("../services/timeService");
var projectService = require("../services/projectService");

exports.dashboard_get = function(req, res) {
    var user = req.user;
    var find = { user: user.username };
    var act = false;

    timeService.time_get(find, function (err, result) {

        result.forEach(function (t) {
            if(t.status === 'active'){
                act = true;
            }
        });

        projectService.project_get({}, function (err, projects) {
            res.render('index', {
                title: 'MC',
                data: result,
                projects: projects,
                act: act,
                moment: moment,
                user: req.user
            });
        });
    });
};

// start
exports.time_start_post = function(req, res) {
    var user = req.user;
    var now = new Date();
    if (req.body.status === 'active') {
        var time = {
            user: user.username,
            started: now,
            project:req.body.project,
            comment:req.body.comment,
            status: "active"
        };
        console.log(time);
        timeService.time_post(time, function (err, result) {
            res.redirect('/')
        });
    }
    if (req.body.status === 'finished') {
        var query = {user: user.username, status: "active"};
        var set = {finished: now, project:req.body.project, comment:req.body.comment ,status: "finished"};

        timeService.time_update_post(query, set, function (err, result) {
            res.redirect('/');
        });

    }
};

// stop
exports.time_stop_post = function(req, res) {
    var user = req.user;
    var now = new Date();

    var query = { user : user.username, status: "active" };
    var set = { finished: now, status : "finished"};

    timeService.time_update_post(query, set, function (err, result) {
        res.redirect('/');
    });
};