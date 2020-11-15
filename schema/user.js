const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    about: String,
    email: String,
    password: String,
    championships: [{
        type: mongoose.Types.ObjectId,
        ref: "Championship",
    }]
});

module.exports = mongoose.model('User', userSchema);