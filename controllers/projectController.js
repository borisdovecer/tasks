var ObjectId = require('mongodb').ObjectId;
var moment = require('moment');
var taskService = require("../services/taskService");
var projectService = require("../services/projectService");

exports.project_list_get = function(req, res) {
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

exports.project_details_get = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var find = { _id: o_id};
    var findTask = {'projectId': o_id};
    var phases = ["1. Zahtevi", "2. Prototip", "3. Razvoj", "4. Sadržaj", " 5. Deploy", "6. Testiranje", "7. Održavanje"];

    projectService.project_get(find, function (err, project) {
        taskService.task_get(findTask, function (err, task) {
            res.render('projectdetails', {
                title: 'MC',
                data: project,
                moment: moment,
                phases: phases,
                tasks: task,
                user: req.user
            })
        });
    });
};

// Kreiranje ponude POST
exports.project_create_post = function(req, res) {
    var today = new Date();
    var find = { title: req.body.title };
    var project = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        phase: "1. Zahtevi",
        status: "active",
        startedOn: today
    };
    projectService.project_get(find, function (err, result) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (result === []) {
                res.status(500).send('Project already exists')
            } else {
                projectService.project_post(project, function (err, ress) {
                    res.redirect('/projects')
                })
            }
        }
    });
};

// Update project POST
exports.project_update_post = function(req, res) {
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
exports.project_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var find = { "_id": o_id  };
    projectService.project_delete_post(find, function (err, result) {
        res.redirect('/projects');
    });
};

// Kreiranje task POST
exports.task_create_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var task = {
        name: req.body.name,
        projectId: o_id,
        status: "active"
    };
    var find = { name: task.name };

    taskService.task_get(find, function (err, result) {
        if (err) {
            res.status(500).send('error occured')
        } else {
            if (result === []) {
                res.status(500).send('Task already exists')
            } else {
                taskService.task_post(task, function (err, ress) {
                    res.redirect('/projects/' + o_id)
                })
            }
        }
    });
};

exports.task_update_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var query = { name : req.body.tasks };
    var set = { status : req.body.status};

    taskService.task_update_post(query, set, function (err, result) {
        res.redirect('/projects/' + o_id);
    });

};

// Update project POST
exports.task_delete_post = function(req, res) {
    var o_id = new ObjectId(req.params.id);
    var find = { "_id": o_id  };
    projectService.project_delete_post(find, function (err, result) {
        res.redirect('/projects');
    });
};