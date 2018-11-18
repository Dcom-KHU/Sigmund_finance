var express = require('express')
var router = express.Router();

var user_controller = require('../controllers/userController');
var finance_controller = require('../controllers/financeController');

// api
router.get('/', function(req, res){
    res.send({title: "api main"});
})


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
router.get('/finances/create', finance_controller.finance_create_get);
router.post('/finance/create', finance_controller.finance_create_post);

// delete
router.get('/finances/:id/delete', finance_controller.finance_delete_get);
router.post('/finances/:id/delete', finance_controller.finance_delete_post);

// update
router.get('/finances/:id/update', finance_controller.finance_update_get);
router.post('/finances/:id/update', finance_controller.finance_update_post);

// detail
router.get('/finances/:id', finance_controller.finance_detail);

// list
router.get('/finances', finance_controller.finance_list);

module.exports = router;