var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const axios = require('axios');
const apiLink = 'https://api-dot-tema-3-cc-345018.lm.r.appspot.com/twitter/register';
// const apiLink = 'http://localhost:8000/twitter/register';
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register page' });
});

router.post('/',
   //validation

  // username must be at least 4 chars long
  body('username').isLength({ min: 4 }),

  // email must be an email
  body('email').normalizeEmail().isEmail(),

  // password must be at least 5 chars long
  body('password').isLength({ min: 5 }),

  // password must be at least 5 chars long
  body('password_confirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),

function(req, res, next) {
  const errors = validationResult(req);
     if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });

      var jsonObj = []
      errors.errors.forEach(element => {
        jsonObj[element.param] = element.msg
      });

      res.render('register',  jsonObj);
      return;
    }

  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  
  axios.post(apiLink, {
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  .then(res => {
//    user is succesfully created - do something on front-end
    console.log(`statusCode: ${res.status}`);
    // merge totul bn


//    res.render('index', { title: 'Succes' });
  })
  .catch(error => {
//  there is an error, probably conflict
   res.render('register', { message: 'Username already exists' });
// maybe do something with the status code?
     console.error(error.response.status)
     console.error(error.response.data["reason"])


  })

});

module.exports = router;
