var User = require('../models/User');
var Finance = require('../models/Finance');
var async = require('async');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.user_list = function(req, res, next){
    User.find({}, 'name grade student_id status position is_active email phone')
    .exec(function(err, list_user) {
        if(err) { return res.send(err); }
        // Success
        res.send({user_list: list_user});
    });
};

exports.user_detail = function(req, res, next){
    async.parallel({
        user: function(callback) {
            User.findById(req.params.id)
            .exec(callback);
        },
        users_finances: function(callback) {
            Finance.find({'user': req.params.id}, 'use_date usage income outcome')
            .exec(callback);
        }
    }, function(err, results) {
        if (err) { return res.status(404).send(err); }
        if (results.user == null ) {
            var err = {
                status: 404,
                message: "User not found. _id: " + req.params.id
            };
            return res.status(404).send(err);
        }
        // Success
        res.send({user: results.user, user_finances: results.users_finances});
    });
};

exports.user_create = [
    // Validate
    body('user_id', 'User ID requried.').isLength({min: 3}).trim(),
    body('password', 'Password length should have more then 10').isLength({min: 10}).trim(),
    body('name', 'Name required.').isLength({min: 1}).trim(),
    body('grade', 'Grade value is must 1 ~ 6').isLength({min: 1, max: 1}).isDecimal().trim(),
    body('student_id', 'Student ID required.').isLength({min: 10, max: 10}).trim(),
    body('phone', 'Phone Number should have length 10 to 12').isLength({min: 10, max: 12}).trim(),
    body('email', 'Email is not currect').isEmail().trim(),

    // Sanitize
    sanitizeBody('user_id').trim().escape(),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('grade').trim().escape(),
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('phone').trim().escape(),
    sanitizeBody('email').trim().escape(),

    (req, res, next) => {
        // Errors
        const errors = validationResult(req);

        // Create User object
        var user = new User({
            user_id: req.body.user_id,
            password: req.body.password,
            name: req.body.name,
            grade: req.body.grade,
            student_id: req.body.student_id,
            //status: req.body.status,
            //position: req.body.position,
            phone: req.body.phone,
            email: req.body.email,
            reg_date: Date.now()
        });
        
        if(!errors.isEmpty()) {
            // error
            res.status(400).send({user: user, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if User with same student id already exists.
            User.findOne({ 'student_id': req.body.student_id })
            .exec( function(err, found_user) {
                 if (err) { return res.status(400).send(err); }

                 if (found_user) {
                     // User exists, redirect to its detail page.
                     res.status(403).send({"message": "User is already exist."});
                 }
                 else {
                     user.save(function (err) {
                       if (err) { return res.status(400).send(err) }
                       // Genre saved. Redirect to genre detail page.
                       res.status(200).send({"message": "User successfuly created."});
                     });

                 }

             });
        }
    }
];

exports.user_create_post = [
    // Validate
    body('user_id', 'User ID requried.').isLength({min: 5}).trim(),
    body('password', 'Password required').isLength({min: 10}).trim(),
    body('name', 'Name required.').isLength({min: 1}).trim(),
    body('grade', 'Grade value is must 1 ~ 6').isLength({min: 1, max: 1}).isDecimal().trim(),
    body('student_id', 'Student ID required.').isLength({min: 10, max: 10}).trim(),
    body('phone', 'Phone Number should have length 10 to 12').isLength({min: 10, max: 12}).trim(),
    body('email', 'Email is not currect').isEmail().trim(),

    // Sanitize
    sanitizeBody('user_id').trim().escape(),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('grade').trim().escape(),
    sanitizeBody('student_id').trim().escape(),
    sanitizeBody('phone').trim().escape(),
    sanitizeBody('email').trim().escape(),

    (req, res, next) => {
        // Errors
        const errors = validationResult(req);

        // Create User object
        var user = new User({
            user_id: req.body.user_id,
            password: req.body.password,
            name: req.body.name,
            grade: req.body.grade,
            student_id: req.body.student_id,
            //status: req.body.status,
            //position: req.body.position,
            phone: req.body.phone,
            email: req.body.email,
            reg_date: Date.now()
        });
        
        if(!errors.isEmpty()) {
            // error
            res.status(400).send('user_form', {user: user, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if User with same student id already exists.
            User.findOne({ 'student_id': req.body.student_id })
            .exec( function(err, found_user) {
                 if (err) { return next(err); }

                 if (found_user) {
                     // Genre exists, redirect to its detail page.
                     res.redirect('/api/users');
                 }
                 else {
                     user.save(function (err) {
                       if (err) { return next(err); }
                       // Genre saved. Redirect to genre detail page.
                       res.redirect('/api/users');
                     });

                 }

             });
        }
    }
];

exports.user_delete_get = function(req, res, next){
    async.parallel({
        user: function(callback) {
            User.findById(req.params.id).exec(callback)
        },
        users_finances: function(callback) {
            Finance.find({'user': req.params.id}).exec(callback)
        },
    }, function(err, results) {
        if(err) { return next(err); }
        if(results.user == null) {  // No results.
            res.redirect('/api/users');
        }
        // Success.
        res.send({user: results.user, user_finances: results.users_finances});
    });
};

exports.user_delete_post = function(req, res, next){

    async.parallel({
        user: function(callback) {
            User.findById(req.params.userid).exec(callback);
        },
        users_finances: function(callback) {
            Finance.find({'user': req.params.userid}).exec(callback);
        },
    }, function(err, results) {
        if(err) { return next(err); }
        // Success.
        if(results.users_finances.length > 0){
            //User has books.
            res.send({user:  results.user, user_finances: results.users_finances});
            return;
        }
        else {
            User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
                if(err) { return next(err); }
                // Success
                res.redirect('/api/users')
            });
        }
    });

};

exports.user_delete = function(req, res, next){

    async.parallel({
        user: function(callback) {
            User.findById(req.params.userid).exec(callback);
        },
        users_finances: function(callback) {
            Finance.find({'user': req.params.userid}).exec(callback);
        },
    }, function(err, results) {
        if(err) { return res.status(404).send(err); }
        console.log(results)
        // Success.
        if(results.users_finances.length > 0){
            //User has finances.
            res.status(400).send({user: results.user, user_finances: results.users_finances});
            return;
        }
        else {
            var id = req.body.userid
            User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
                if(err) { return res.status(404).send(err); }
                // Success
                res.send({"message": "User " + id + "successfuly deleted."});
            });
        }
    });

};


exports.user_update_get = function(req, res, next){
    res.send('NOT IMPLEMENTED: user update get');
};

exports.user_update_post = function(req, res, next){
    res.send('NOT IMPLEMENTED: user update post');
};