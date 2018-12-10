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
            res.status(404).send({user: user, errors: errors.array()});
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
                recalculate_finances(req, res, next);
                res.send({"message": "Finance " + req.params.id + " successfuly deleted."});
            })
        }
    });
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
            res.status(404).send({errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.

            var last_total = 0;
            var last_order = 0;

            Finance.findOne().sort({'use_date': 1}).exec( function(err, recent_finance){
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
                    // Recalcuate
                    recalculate_finances(req, res, next);
                    return res.send({"message": "Finance successfuly updated."});
                })
                
            });
        }
    }
];

// reclaculate total
// TODO ENHANCEMETN : set start point
function recalculate_finances(req, res, next) {
    Finance.find()
    .sort({'use_date': 1})
    .exec( function(err, finances) {
        if (err) { return res.status(500).send(err); }
        // SUCCESS

        prev_finance = null;
        total = 0;
        // loop all finances
        finances.forEach(function(current) {
            // first finance to store
            if (prev_finance == null){
                prev_finance = current;
                // calc only current total
                total = prev_finance.income - prev_finance.outcome;
            }
            // other's total
            else {
                total = prev_finance.total + current.income - current.outcome;
            }

            // if total is diffrent update
            if (current.total != total) {

                // Create Finance object
                var finance = new Finance({
                    order: prev_finance.order+1,
                    use_date: current.use_date,
                    usage: current.usage,
                    detail: current.detail,
                    user: current.user,
                    income: current.income,
                    outcome: current.outcome,
                    total: total,
                    check: current.check,
                    _id: current.id
                });

                // update changed total
                Finance.findByIdAndUpdate(current.id, finance, {}, function(err, thefinane) {
                    if (err) { return res.status(400).send(err); }
                    // Success
                });
            }
            // prev update
            prev_finance = current;
        });

    });
}