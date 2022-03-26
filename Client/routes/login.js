const express = require('express');
const bcrypt = require("bcryptjs");
const axios = require("axios");
const router = express.Router();

const apiLink = 'http://localhost:8000/twitter/login';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('login', {title: 'Login page'});
});

router.post('/', function (req, res) {
    let password = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    axios.post(apiLink, {
        username: req.body.username,
        password: hash
    }).then(loginResponse => {
        res.status(loginResponse.status);
        res.send("Login request sent successfully");
    }).catch(error => {
        res.status(500);
        res.send("Login request failed");
    })
});

module.exports = router;
