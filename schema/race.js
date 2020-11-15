const mongoose = require('mongoose');

const raceSchema = mongoose.Schema({
    name: String,
    country: String,
    date: String,
    about: String,
    qualif: Number,
    teamMateQualif: Number,
    q1: { type: Boolean, default: true },
    q2: Boolean,
    q3: Boolean,
    result: Number,
    teamMateResult: Number,
    bestLap: Number,
    points: Number,
    teamMatePoints: Number,
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season',
    }
})

module.exports = mongoose.model('Race', raceSchema);