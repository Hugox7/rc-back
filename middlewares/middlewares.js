const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../schema/user');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.userId = decoded.id;
        next();
    })
}

const checkDuplicateNameOrEmail = (req, res, next) => {
   
    User.findOne({
        name: req.body.name
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: 'Username already in use!', status: 400 });
            return;
        }

        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (user) {
                res.status(400).send({ message: 'Email already in use!', status: 400 });
                return;
            }
            next();
        });
    });
};

const middlewares = {
    verifyToken,
    checkDuplicateNameOrEmail,
}

module.exports = middlewares;