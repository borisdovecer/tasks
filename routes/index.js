var express = require('express');
var router = express.Router();

var projectController = require('../controllers/projectController');
var userController = require('../controllers/userController');
var timeController = require('../controllers/timeController');

var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
};

/* GET home page. */
router.get('/', loggedin,timeController.dashboard_get);
router.post('/start', timeController.time_start_post);
router.post('/stop', timeController.time_stop_post);


router.get('/login', function (req, res, next) {
  res.render('login');
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.get('/inbox', function (req, res, next) {
    res.render('inbox', {
        user: req.user
    })
});

router.get('/files', function (req, res, next) {
    res.render('files', {
        user: req.user
    })
});

router.get('/profile', userController.user_details_get);

router.get('/projects', projectController.project_list_get);
router.get('/projects/:id', projectController.project_details_get);
router.post('/projects/create', projectController.project_create_post);
router.post('/projects/update/:id', projectController.project_update_post);
router.post('/projects/delete/:id', projectController.project_delete_post);


router.post('/task/create/:id', projectController.task_create_post);
router.post('/task/update/:id', projectController.task_update_post);
//router.post('/task/delete/:id', projectController.task_delete_post);

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/')
});
module.exports = router;
