const jwt = require('jsonwebtoken')
const config = require('../config/secret')


function verif() {
    return function (req, rest, next) {
        //cek author
        var tokenWithBearer = req.headers['authorization'];
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            //verif
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return rest.status(401).send({ auth: false, message: ' Token tidak terdaftar' });;
                } else {
                        req.auth = decoded;
                        next();
                }
            });
        } else {
            return rest.status(401).send({ auth: false, message: 'No token provided!' });
        }

    }
}

module.exports = verif;