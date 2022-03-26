var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page' });
});

router.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

module.exports = router;
