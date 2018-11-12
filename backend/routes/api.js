var express = require('express')
var router = express.Router();

var user_controller = require('../controllers/userController');
var finance_controller = require('../controllers/financeController');

// USER 
// create
router.get('/users/create', user_controller.user_create_get);
router.post('/users/create', user_controller.user_create_post);

// delete
router.get('/users/:id/delete', user_controller.user_delete_get);
router.post('/users/:id/delete', user_controller.user_delete_post);

// update
router.get('/users/:id/update', user_controller.user_update_get);
router.post('/users/:id/update', user_controller.user_update_post);

// detail
router.get('/users/:id', user_controller.user_detail);

// list
router.get('/users', user_controller.user_list);

// FINANCE
// create
router.get('/finance/create', finance_controller.finance_create_get);
router.post('/finance/create', finance_controller.finance_create_post);

// delete
router.get('/finance/:id/delete', finance_controller.finance_delete_get);
router.post('/finance/:id/delete', finance_controller.finance_delete_post);

// update
router.get('/finance/:id/update', finance_controller.finance_update_get);
router.post('/finance/:id/update', finance_controller.finance_update_post);

// detail
router.get('/finance/:id', finance_controller.finance_detail);

// list
router.get('/finance', finance_controller.finance_list);

module.exports = router;