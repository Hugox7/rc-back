const User = require('../schema/user');

const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.signUp = (req, res) => {

    const hash = brcrypt.hashSync(req.body.password, 0);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
    })

    user.save((err, user) => {
        if (err) {
            return res.status(500).send({ message: err });
        }
        res.status(201).send({ message: 'User successfully created' })

    })

}

exports.signIn = (req, res) => {

    User.findOne({
        name: req.body.name
    })
    .populate('championships')
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!user) {
            return res.status(404).send({ 
                accessToken: null,
                message: 'User not found' 
            });
        }

        const passwordIsValid = brcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(400).send({
                accessToken: null,
                message: 'Invalid password',
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, 
            req.body.remember
                ? null
                : { expiresIn: 86400 }
        );

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token,
            championships: user.championships
        });

    })

}