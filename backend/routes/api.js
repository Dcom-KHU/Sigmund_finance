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
router.put('/users', user_controller.user_create);
// delete
router.delete('/users/:id', user_controller.user_delete);
// update
router.put('/users/:id', user_controller.user_update);
// detail
router.get('/users/:id', user_controller.user_detail);
// list
router.get('/users', user_controller.user_list);

// FINANCE
// create
router.put('/finances', finance_controller.finance_create);
// delete
router.delete('/finances/:id/', finance_controller.finance_delete);
// update
router.put('/finances/:id/', finance_controller.finance_update);
// detail
router.get('/finances/:id', finance_controller.finance_detail);
// list
router.get('/finances', finance_controller.finance_list);

module.exports = router;