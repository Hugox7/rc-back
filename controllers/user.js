const User = require('../schema/user');

exports.getUser = (req, res) => {
    User.findById(req.userId)
        .populate('championships')
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            return res.status(200).send(user);
        })
}