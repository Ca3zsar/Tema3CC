var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const axios = require('axios');
const apiLink = 'http://localhost:8000/twitter/login';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login page' });
});

router.post('/',
    ///validation
    body('username').isLength({ min: 4 }),
    // username must be at least 4 chars long
    body('password').isLength({ min: 4 }),
    // password must be at least 4 chars long
    function(req, res, next) {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  axios.post(apiLink, {
    username: req.body.username,
    password: req.body.password,
  })
  .then(res => {
//    user is succesfully created - do something on front-end
    console.log(`statusCode: ${res.status}`);
    console.log(res.data)
//    res.render('index', { title: 'Succes' });
  })
  .catch(error => {
//  there is an error, probably conflict
//   res.render('register', { message: 'username already exists' });
// maybe do something with the status code?
     console.error(error.response.status)
     console.error(error.response.data["reason"])
  })

});

module.exports = router;
