var express = require('express');
var router = express.Router();

// main
router.get('/', function(req, res){
  res.send({title: "home main"});
})

module.exports = router;
