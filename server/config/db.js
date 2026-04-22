const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/healthTwin');
        console.log('MongoDB Connected Ready...');
    } catch (err) { console.error(err); process.exit(1); }
};
module.exports = connectDB;