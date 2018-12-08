var Finance = require('../models/Finance');
var User = require('../models/User');
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.finance_list = function(req, res, next) {
    Finance.find({})
    .populate('user', 'name')
    .exec(function(err, list_finances) {
        if(err) { return res.status(404).send(err); }
        // SUCCESS
        res.send({finances_list: list_finances})
    });
};

exports.finance_detail = function(req, res, next) {
    Finance.findById(req.params.id)
    .exec(function(err, result) {
        if(err) { return res.status(404).send(err); }
        // SUCCESS
        res.send({finance : result});
    })
};

// @deprecated
exports.finance_create_get = function(req, res, next) {
    User.find({}, 'name student_id')
    .exec(function(err, users) {
        if(err) { return next(err); }
        // Success
        res.send({user_list: users});
    });
};

exports.finance_create = [
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
            res.sataus(404).send({user: user, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.

            var last_total = 0;
            var last_order = 0;

            Finance.findOne().sort({'order': -1}).exec( function(err, recent_finance){
                if(err) { return res.status(400).send(err); }
                // if first 
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
                    check: true,
                });

                finance.save(function(err) {
                    if(err) {return res.status(400).send(err);}
                    //Success
                    res.send({"message": "Finance successfuly created."});
                });
                
            });
        }
    }
];

// @deprecated
exports.finance_delete_get = function(req, res, next) {
    Finance.findById(req.params.id)
    .exec(function(err, results){
        if(err) { return next(err); }
        if(results == null) {
            res.redirect('/api/finances');
        }
        //Success
        res.send({finance: results});
    });
};


exports.finance_delete_post = function(req, res, next) {
    Finance.findById(req.params.id)
    .exec(function(err, results){
        if(err) { return next(err);}
        if(results==null){
            res.redirect('/api/finances');
        }
        else{
            Finance.findByIdAndRemove(req.body.financeid, function deleteFinance(err) {
                if(err) {return next(err);}
                // Success
                res.redirect('/api/finances');
            })
        }
    });
};

exports.finance_delete = function(req, res, next) {
    Finance.findById(req.params.id)
    .exec(function(err, results){
        if(err) { return res.status(404).send(err);}
        if(results==null){
            return res.status(404).send({"message": "Finance Not Found."});
        }
        else{
            Finance.findByIdAndRemove(req.params.id, function deleteFinance(err) {
                if(err) {return res.status(404).send(err);}
                // Success
                res.send({"message": "Finance " + req.params.id + " successfuly deleted."});
            })
        }
    });
};

exports.finance_update_get = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance update get');
};

exports.finance_update_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance update post');
};

exports.finance_update = [
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
            res.sataus(404).send({user: user, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.

            var last_total = 0;
            var last_order = 0;

            Finance.findOne().sort({'order': -1}).exec( function(err, recent_finance){
                if(err) { return res.status(400).send(err); }
                // if first 
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
                    check: req.body.check,
                    _id: req.params.id
                });

                Finance.findByIdAndUpdate(req.params.id, finance, {}, function(err, thefinane) {
                    if (err) { return res.status(400).send(err); }
                    // SUCCESS
                    return res.send({"message": "Finance successfuly updated."});
                })
                
            });
        }
    }
];