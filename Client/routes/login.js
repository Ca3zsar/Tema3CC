var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

const axios = require('axios');
const bcrypt = require("bcryptjs");
const apiLink = 'http://localhost:8000/twitter/login';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login page'});
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
      console.log(errors)
      res.render('login', { message: 'Username and password must have at least 4 characters!' });
      return;
    }
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

  axios.post(apiLink, {
    username: req.body.username,
    password: hash,
  })
  .then(res => {
//    user is succesfully created - do something on front-end
    console.log(`statusCode: ${res.status}`);

    // daca totul e bn, face cv ~ 'Successfully log in with user Marta'

    console.log(res.data)
//    res.render('index', { title: 'Succes' });
  })
  .catch(error => {
//  there is an error, probably conflict
    
// maybe do something with the status code?

    res.render('login', { message: 'Username or password incorrect!' });

    console.error(error.response.status)
    console.error(error.response.data["reason"])
  })
});

module.exports = router;
