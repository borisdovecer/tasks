var ObjectId = require('mongodb').ObjectId;
var moment = require('moment');
var userService = require("../services/userService");
var User = require('../models/User');


exports.user_list_get = function(req, res) {
    var find = { };
    projectService.project_get(find, function (err, result) {
        res.render('projectlist', {
            title: 'MC',
            data: result,
            moment: moment,
            user: req.user
        });
    });
};

exports.user_details_get = function(req, res) {
    var user = req.user;
    var find = { "username" : user.username };

    userService.user_get(find, function (err, userdetails) {
        console.log(userdetails);
            res.render('profile', {
                title: 'MC',
                data: userdetails,
                moment: moment,
                user: req.user
            })
        });
};

// Kreiranje ponude POST
exports.user_create_post = function(req, res) {
    var password = new User();
    password = password.hashPassword(req.body.password);
    var user = {
        username: req.body.username,
        password: password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        jobtitle: req.body.jobtitle,
        description: req.body.description,
        education: { program: req.body.program, school: req.body.school },
        workplace: { title: req.body.title, company: req.body.company },
        from: req.body.from,
        livesIn: req.body.livesIn


    };
    var find = { "username": user.username };
    userService.user_get(find, function (err, result) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (result === []) {
                res.status(500).send('User already exists')
            } else {
                userService.user_post(user, function (err, ress) {
                    res.redirect('/')
                })
            }
        }
    });
};

// Update project POST
exports.user_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var find = { "_id": o_id  };
    var project = {};
    if(req.body.title){
        project = {
            title: req.body.title,
            description: req.body.description
        };
    } else {
        project = {
            price: req.body.price,
            phase: req.body.phase,
            status: req.body.status
        };
    }
    var set = { $set : project };

    projectService.project_update_post(find, set, function (err, result) {
        res.redirect('/projects/' + o_id);
    });
};

// Update project POST
exports.user_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var find = { "_id": o_id  };
    projectService.project_delete_post(find, function (err, result) {
        res.redirect('/projects');
    });
};
