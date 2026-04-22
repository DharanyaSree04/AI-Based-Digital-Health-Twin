const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ msg: "User exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ msg: "Registered Successfully" });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ msg: "Invalid Credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, 'SECRET_KEY');
        res.json({ token, user: { id: user._id, name: user.name, role: user.role, xp: user.xp } });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

// Admin Logic: Get all users
exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};