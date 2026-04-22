const Log = require('../models/Logs');
const User = require('../models/User');

exports.createLog = async (req, res) => {
    const { sleep, exercise, dietQuality, stress, screenTime, weight, height, userId } = req.body;
    
    // AI Rules
    let score = (sleep * 8) + (exercise * 0.5) + (dietQuality * 5);
    score -= (stress * 4) + (screenTime * 2);
    const bmi = weight / ((height / 100) ** 2);
    if (bmi > 25 || bmi < 18.5) score -= 15; // Penalty for unhealthy BMI

    const wellnessScore = Math.min(Math.max(Math.round(score), 0), 100);
    const log = await Log.create({ ...req.body, wellnessScore });
    await User.findByIdAndUpdate(userId, { $inc: { xp: 10 } });
    res.json(log);
};

exports.getLogs = async (req, res) => {
    const logs = await Log.find({ userId: req.params.userId }).sort({ date: -1 }).limit(10);
    res.json(logs);
};