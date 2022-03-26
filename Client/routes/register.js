const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const axios = require('axios');
const apiLink = 'http://localhost:8000/twitter/register';

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register page' });
});

router.post('/', function(req, res, next) {
  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  axios.post(apiLink, {
    username: req.body.username,
    password: hash,
    email: req.body.email
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
  })
  .catch(error => {
  })

  res.send('ok');
});

module.exports = router;
