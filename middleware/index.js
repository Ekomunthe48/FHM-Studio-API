var express = require('express')
var auth = require('./auth')
const verif = require('./verification')
var router = express.Router()

// daftar
router.post('/api/v1/register', auth.registration);
router.post('/api/v1/login', auth.login);
module.exports = router;

router.get('/api/v1/rahasia', verif(), auth.secretPage);

module.router = router;