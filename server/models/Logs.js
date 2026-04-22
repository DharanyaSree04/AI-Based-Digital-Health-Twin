const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    userId: String,
    date: { type: Date, default: Date.now },
    sleep: Number, exercise: Number, dietQuality: Number, 
    stress: Number, screenTime: Number, weight: Number, 
    height: Number, wellnessScore: Number
});
module.exports = mongoose.model('Log', LogSchema);