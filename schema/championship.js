const mongoose = require('mongoose');

const championshipSchema = mongoose.Schema({
    name: String,
    about: String,
    type: String,
    game: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    seasons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
    }],
});

module.exports = mongoose.model('Championship', championshipSchema);