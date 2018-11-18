var Finance = require('../models/Finance');
var User = require('../models/User')

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
    res.send('NOT IMPLEMENTED: finance create get');
};

exports.finance_create_post = function(req, res, next) {
    res.send('NOT IMPLEMENTED: finance create post');
};

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