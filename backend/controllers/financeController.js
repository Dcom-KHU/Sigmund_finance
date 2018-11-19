var Finance = require('../models/Finance');
var User = require('../models/User');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.finance_list = function(req, res, next) {
    Finance.find({})
    .populate('user', 'name')
    .exec(function(err, list_finances) {
        if(err) { return next(err); }
        // SUCCESS
        res.render('finance_list', {title: 'Finances list', finances_list: list_finances})
    });
};

exports.finance_detail = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance detail');
};

exports.finance_create_get = function(req, res, next) {
    User.find({}, 'name student_id')
    .exec(function(err, users) {
        if(err) { return next(err); }
        // Success
        res.render('finance_form', {title: 'Create Finance', user_list: users});
    });
};

exports.finance_create_post = [
    // Validate
    body('use_date', 'Use Date requried.').trim(),
    body('usage', 'Usage required').isLength({min: 1, max:20}).trim(),
    body('detail', 'Detail required.').isString().trim(),
    body('user', 'User required.').trim(),
    body('income', 'Income required.').isLength({min: 1, max: 9}).isDecimal().trim(),
    body('outcome', 'Income required.').isLength({min: 1, max: 9}).isDecimal().trim(),

    // Sanitize
    sanitizeBody('use_date').toDate(),
    sanitizeBody('usage').trim().escape(),
    sanitizeBody('detail').trim().escape(),
    sanitizeBody('user').trim().escape(),
    sanitizeBody('income').trim().escape(),
    sanitizeBody('outcome').trim().escape(),

    (req, res, next) => {
        // Errors
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            // error
            res.render('user_form', {title: 'User Form', user: user, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if User with same student id already exists.
            var last_total = 0;
            var last_order = 0;
            Finance.findOne().sort({'order': -1}).exec( function(err, recent_finance){
                if(err) {return next(err); }
                if(recent_finance!=null) {
                    last_total = recent_finance.total;
                    last_order = recent_finance.order;
                }
                
                last_total += req.body.income - req.body.outcome;

                // Create Finance object
                var finance = new Finance({
                    order: last_order+1,
                    use_date: req.body.use_date,
                    usage: req.body.usage,
                    detail: req.body.detail,
                    user: req.body.user,
                    income: req.body.income,
                    outcome: req.body.outcome,
                    total: last_total,
                });

                finance.save(function(err) {
                    if(err) {return next(err);}
                    //Success
                    res.redirect('/api/finances')
                });
                
            });
        }
    }
];

exports.finance_delete_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance delete get');
};

exports.finance_delete_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance delete post');
};

exports.finance_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance update get');
};

exports.finance_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance update post');
};