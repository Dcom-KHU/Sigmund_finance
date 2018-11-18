var User = require('../models/User');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.user_list = function(req, res, next){
    User.find({}, 'name grade student_id status position is_active email phone')
    .exec(function(err, list_user) {
        if(err) { return next(err); }
        // Success
        res.render('user_list', {title: 'User List', user_list: list_user});
    });
};

exports.user_detail = function(req, res, next){
    res.send('NOT IMPLEMENTED: user detail');
};

exports.user_create_get = function(req, res, next){
    res.render('user_form', {title: 'Create User'});
};

exports.user_create_post = [
    // Validate
    body()
];

exports.user_delete_get = function(req, res, next){
    res.send('NOT IMPLEMENTED: user delete get');
};

exports.user_delete_post = function(req, res, next){
    res.send('NOT IMPLEMENTED: user delete post');
};

exports.user_update_get = function(req, res, next){
    res.send('NOT IMPLEMENTED: user update get');
};

exports.user_update_post = function(req, res, next){
    res.send('NOT IMPLEMENTED: user update post');
};