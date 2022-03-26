var express = require('express');
var router = express.Router();

const axios = require('axios');
const apiLink = 'http://localhost:8000/twitter/register';

router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register page' });
});

router.post('/', function(req, res, next) {

  console.log(req.body.username);
  axios.post(apiLink, {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    // console.log(res.data);
  })
  .catch(error => {
    // console.error(error)
  })

  res.send('ok');
});

module.exports = router;
