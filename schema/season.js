import mongoose from 'mongoose';

const seasonSchema = mongoose.Schema({
    year: String,
    team: String,
    totalPoints: Number,
    teamMateTotalPoints: Number,
    races: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Race',
    }],
    championship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Championship',
    },
})

module.exports = mongoose.model('Season', seasonSchema);